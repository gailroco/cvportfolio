---
name: dependabot-alerts-fix
description: Resolve all open Dependabot security alerts for gailroco/cvportfolio end-to-end. Fetches open alerts, cross-references any associated PRs, and fixes each one via the right path: merge an existing PR, fix the dependency on master directly, apply a patch-package patch, or dismiss with justification. Use when asked to fix/clear Dependabot alerts, resolve security vulnerabilities, or work through the Security > Dependabot alerts list.
---

# Fix Dependabot Alerts (end to end)

A Dependabot alert flags a vulnerable dependency. It may or may not have
an associated PR. This skill resolves every open alert, choosing the
right fix path for each one, then verifies the fixes are actually in the
lockfile (not just in package.json).

## 0. Cost rules

- Never fetch a PR or alert `body` field unnecessarily. The severity,
  package name, and title carry all the signal needed for triage.
- Classify every alert before fixing any of them. One batch, one plan,
  one approval.
- Do not poll CI with a stream of separate tool calls. Use a single
  blocking `bash` call with `run_in_background: true`.

## 1. Fetch all open alerts, minimal fields

```bash
gh api repos/gailroco/cvportfolio/dependabot/alerts \
  --paginate \
  --jq '[.[] | select(.state=="open") | {
    number,
    severity: .security_advisory.severity,
    package: .dependency.package.name,
    vulnerable_version: .security_vulnerability.vulnerable_version_range,
    fixed_in: .security_vulnerability.first_patched_version.identifier,
    pr: .auto_dismissed_at,
    manifest: .dependency.manifest_path
  }] | sort_by(.severity)'
```

If empty, report nothing to do and stop.

## 2. Cross-reference open Dependabot PRs

```bash
gh pr list --state open --author app/dependabot \
  --json number,title,headRefName,additions,deletions,changedFiles
```

Match each PR title (`Bump <pkg> from X to Y`) against the alert package
names from step 1. Note which alerts already have a PR candidate.

## 3. Classify each alert into a fix path

For each open alert assign one of:

- **PR-merge**: a Dependabot PR exists, touches only manifest/lockfile,
  non-major bump, and CI is green. Cheapest path.
- **PR-failing-CI**: a Dependabot PR exists but CI is failing (lockfile
  sync error). Fix master directly; never rebase (see section 6).
- **No-PR / manual override**: no PR exists, but a patched version is
  available. Fix via `package.json` overrides and `npm update`.
- **patch-package**: no safe dependency bump is possible (patched release
  requires incompatible peer versions). Patch the installed file directly.
- **Dismiss**: alert is in a dev-only path with no realistic attack vector,
  or is already mitigated by an existing patch. Justify explicitly.

`fixed_in` from step 1 being null means no patched version exists yet;
that alert is a candidate for patch-package or dismiss.

## 4. Check CI configuration

```bash
ls .github/workflows/ 2>/dev/null
```

If no CI workflow exists, every PR falls back to a manual review
regardless of classification. Say so and stop before merging anything.

## 5. Present batch table and get one approval

Show every open alert in a single table:

| Alert # | Package | Severity | Fixed in | Has PR | Fix path |
|---------|---------|----------|----------|--------|----------|

Ask for one approval covering the whole plan. The user can carve out
exceptions in their reply. Do not start any fix before approval.

## 6. Execute fixes by path

### PR-merge

```bash
gh pr merge <N> --squash --delete-branch
```

Loop over approved numbers in sequence.

After merging multiple PRs back-to-back, always regenerate the lockfile
on master before pushing. Two sequential Dependabot merges can each drop
the other's nested lockfile entries since each was generated in isolation:

```bash
npm install --package-lock-only
npm ci --dry-run
```

If `npm ci --dry-run` exits clean, commit the updated lockfile and push.

### PR-failing-CI (lockfile sync error)

Never use `@dependabot rebase`. The `brace-expansion` flat override in
this repo causes Dependabot to place `brace-expansion@5.x` at a nested
path that violates the override, so rebases reproduce the same CI failure.

Fix on master instead:

1. Add or update `package.json` overrides for the target package.
   Use scoped overrides when the package is a transitive dep:
   ```json
   "overrides": {
     "parent-pkg": { "vuln-pkg": ">=X.Y.Z <NEXT_MAJOR.0.0" }
   }
   ```
   Always include an upper bound on the major to prevent unintended
   major bumps. A flat override on a package that is also a direct dep
   causes `EOVERRIDE`; scope it to the transitive parent instead.

2. Run `npm update <pkg> --package-lock-only`. Do NOT delete and
   regenerate the full lockfile. This repo's `brace-expansion` override
   creates a lockfile structure a fresh `npm install` cannot reproduce.

3. If `npm update` misses a nested 4.x/5.x entry (scoped overrides are
   not enforced by `npm update` for nested paths), patch the lockfile
   entry directly. Get the correct hash first:
   ```bash
   npm view <pkg>@<version> dist
   ```
   Then update the `resolved` URL and `integrity` field for that entry
   in `package-lock.json`.

4. Verify the fix actually landed. A committed override can look correct
   in `package.json` while the lockfile still resolves the old version:
   ```bash
   npm ls <pkg>
   ```
   Check for `invalid:` markers. If any appear, the lockfile is still
   stale; regenerate with `npm install --package-lock-only` in a clean
   environment (only `package.json` present, no existing lockfile) and
   copy the result back.

5. Confirm the build is clean:
   ```bash
   npm ci --dry-run
   ```
   Must exit 0 with no "Missing:" or "Invalid:" lines.

6. Commit both `package.json` and `package-lock.json` to master and push.
   Dependabot detects master already satisfies the target version and
   closes its PR automatically. No manual close needed.

### No-PR / manual override

Same steps as PR-failing-CI from step 2 onward (add override, update,
verify with `npm ls`, confirm with `npm ci --dry-run`, commit).

For a direct dependency with a patched version available, bump it in
`package.json` and run `npm update <pkg> --package-lock-only` to avoid
a full lockfile regeneration.

### patch-package

Use when no dependency version bump can fix the alert (e.g. the patched
release requires incompatible peer packages).

1. Identify the vulnerable code path in the installed package under
   `node_modules`.
2. Apply the minimal fix in place, then:
   ```bash
   npx patch-package <pkg>
   ```
   This writes a patch file to `patches/`.
3. Verify the patch applies cleanly on a fresh install:
   ```bash
   npm ci
   ```
4. Commit the patch file. The `postinstall: patch-package --error-on-fail`
   hook in `package.json` ensures CI fails loudly if a future dep bump
   ever causes the patch to stop applying.
5. GitHub's dependency graph scan is manifest-based and never inspects
   installed file contents, so the Dependabot alert will not auto-close.
   Dismiss it manually via API:
   ```bash
   gh api repos/gailroco/cvportfolio/dependabot/alerts/<N> -X PATCH \
     -f state=dismissed \
     -f dismissed_reason=tolerable_risk \
     -f dismissed_comment="<280 char max: patch commit sha and tracking issue>"
   ```
6. File or update a tracking issue so the patch is discoverable if the
   upstream package ever ships a proper fix.

### Dismiss

```bash
gh api repos/gailroco/cvportfolio/dependabot/alerts/<N> -X PATCH \
  -f state=dismissed \
  -f dismissed_reason=<tolerable_risk|no_bandwidth|not_used> \
  -f dismissed_comment="<justification>"
```

Only dismiss when the vulnerable code path is genuinely unreachable or
already mitigated. State the reason explicitly.

## 7. Wait for CI (one blocking call)

After pushing any fix to master, wait for CI before proceeding:

```bash
timeout 600 bash -c '
  while true; do
    s=$(gh run list --branch master --limit 1 --json status --jq ".[0].status")
    [ "$s" = "completed" ] && break
    sleep 15
  done
'
```

Run with `run_in_background: true`. One completion notification carries
the result.

Then confirm the outcome:

```bash
gh run list --branch master --limit 1 --json conclusion --jq ".[0].conclusion"
```

If CI fails, read the failure log before proceeding:

```bash
gh run view <run-id> --log-failed 2>/dev/null | grep -E "Missing:|Invalid:|error" | head -20
```

## 8. Verify alerts closed

After all fixes and CI green:

```bash
gh api repos/gailroco/cvportfolio/dependabot/alerts \
  --jq '[.[] | select(.state=="open")] | length'
```

Report how many remain open and why (no patched version, deferred,
dismissed). One compact closing summary: alerts resolved (package,
severity, fix path used), alerts still open and why.
