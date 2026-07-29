---
name: security-audit
description: Audit gailroco/cvportfolio for open security vulnerabilities using GitHub's Dependabot alerts, prioritize by severity, and file GitHub issues for the ones not already covered by an open Dependabot PR. Use when asked to run a CVE audit, check for security vulnerabilities, or review dependency advisories for this repo.
---

# Security audit (Dependabot alerts to GitHub issues)

This repo already has Dependabot alerts and auto generated update PRs
enabled. This skill does not re run npm audit or duplicate what
Dependabot already tracks. It reads Dependabot's own alert feed,
decides which alerts need a tracked issue on top of (or instead of) an
existing Dependabot PR, and files only those, so repeat runs do not
spam the issue tracker.

## 1. Pull open alerts, filtered fields only

```bash
gh api repos/gailroco/cvportfolio/dependabot/alerts --jq \
  '[.[] | select(.state=="open")] |
   sort_by(. as $a | ["critical","high","medium","low"] | index($a.security_advisory.severity)) |
   .[] | {number, severity: .security_advisory.severity,
          package: .dependency.package.name,
          ghsa: .security_advisory.ghsa_id,
          summary: .security_advisory.summary,
          patched: (.security_advisory.vulnerabilities[0].first_patched_version.identifier // "none")}'
```

Filter fields at the API boundary rather than pulling the full alert
object into context. Each alert also carries a long CVSS vector, a full
prose description, and a references array, all noise for triage. The
jq filter above reduces each alert to one line before it ever lands in
the conversation.

If there are zero open alerts, stop and report that: nothing to file.

## 2. Cross check against open Dependabot PRs

```bash
gh pr list --state open --author app/dependabot --json number,title
```

Match each alert's package name against the PR titles (Dependabot
titles read "Bump `<package>` from X to Y" or "Bump `<package>` and
`<other>`"). An alert with a matching open PR is already in flight:
note the PR number against it instead of filing a new issue, unless
step 4's severity policy overrides that.

## 3. Dedup against existing tracked issues

```bash
gh issue list --search '"[Security]" in:title' --state all --json number,title
```

Skip any alert whose GHSA id or package name already appears in an
existing issue title, open or closed. Re filing on every run defeats
the point of this skill.

## 4. Severity policy

This repo is a static personal portfolio site with no backend and no
user data, so the bar for "needs a standalone issue" is real risk to
the built site or the dev toolchain, not every low severity transitive
dependency alert. Default policy; confirm with the user if they want
it adjusted:

- Critical or high severity: file an individual issue now, regardless
  of whether a Dependabot PR is already open. High severity items
  deserve visible tracking even when a fix is already in flight.
- Medium severity: file an individual issue only if no open Dependabot
  PR already covers it. If a PR covers it, skip the issue and mention
  it in the closing summary instead.
- Low severity: no issue by default, listed in the summary only. Raise
  it to the user only if the same low severity alert has stayed open
  more than 60 days with no Dependabot PR addressing it.

## 5. Draft issues, then checkpoint

Check whether the `security` label already exists before using it:

```bash
gh label list --json name --jq '.[].name' | grep -qx security || \
  gh label create security --color b60205 \
    --description "Security vulnerability tracking"
```

For each alert that clears the policy in step 4, draft:

- Title: `[Security] <severity>: <package> (<GHSA id>)`
- Labels: `security` plus the existing `dependencies` label.
- Body: package name, current and patched version, severity, a one
  line summary, a link to `https://github.com/advisories/<ghsa>`, and,
  if step 2 found a matching PR, a note that PR #N already addresses
  it.

**Checkpoint:** show the full drafted list (title plus a one line body
summary per issue) and wait for approval before creating anything.
Filing issues is visible, shared state, the same rule as any other
GitHub mutation.

## 6. Create and report

```bash
gh issue create --repo gailroco/cvportfolio --title "..." --body "..." \
  --label security --label dependencies
```

After filing, report a short summary: how many alerts were open, how
many were already covered by a Dependabot PR, how many issues were
filed (with numbers), and how many were left as summary only under the
low severity policy.

## 7. Running this on a schedule

This is meant to run periodically, not only on demand. If the user
wants it automatic, point them at the `schedule` skill to run it on a
cron cadence instead of re invoking it manually each time.
