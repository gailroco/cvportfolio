---
name: dependabot-merge
description: Triage and merge gailroco/cvportfolio's open Dependabot PRs at minimum token cost, batch fetch diff stats, confirm CI, auto merge low risk lockfile only bumps, and flag anything that needs a real look. Use when asked to clear out Dependabot PRs, merge dependency bumps, or handle Dependabot pull requests. Complements the security-audit skill, which files issues for alerts, not PRs.
---

# Merge Dependabot PRs (low token)

Dependabot PRs are almost always mechanical: a version bump in
`package.json` and/or `package-lock.json`, no source files touched.
Treating each one like a full code review, fetching the full PR body
(the changelog and commit list Dependabot writes there easily runs
several thousand tokens per PR), reading the full diff, writing a
multi paragraph narrative, and polling CI with a stream of separate
tool calls, burns far more tokens than the decision requires. This
skill's whole point is to make the cheap, obvious cases cheap.

## 0. Rules that keep this cheap

- Never fetch a Dependabot PR's `body` field. It is release notes and
  a commit list already summarized in the title (`Bump <pkg> from X to
  Y`). It adds no decision relevant information beyond what step 2
  gets from the title and diff stat alone.
- Do not invoke the general `review` skill or write a full narrative
  review for a lockfile only, non major bump. Reserve real review
  (full diff read, prose writeup) for PRs that touch source files or
  jump a major version.
- Do not poll CI with a stream of separate tool calls (Monitor
  emitting one notification per check). Waiting for CI is a one shot
  "block until done" condition: use a single `Bash` call with
  `run_in_background` and an until loop instead, so it costs one
  notification, not one per poll.
- Do not ask for merge approval one PR at a time. Classify every open
  PR first, then present one batch table and get one approval for the
  whole eligible set.

## 1. List PRs, minimal fields only

```bash
gh pr list --state open --author app/dependabot \
  --json number,title,additions,deletions,changedFiles
```

If this is empty, stop and report there is nothing to do.

## 2. Classify risk from the title and diff stat, no diff fetch yet

For each PR:

- **Files touched**: `changedFiles` from step 1. If every changed file
  is `package.json` and/or `package-lock.json` (or the project's
  lockfile equivalent), it is a mechanical bump. Anything else (a
  source file, a config file outside the manifest pair) needs a real
  diff read in step 6.
- **Version jump**: parse straight from the title, Dependabot always
  writes `Bump <pkg> from X.Y.Z to A.B.C`. A major bump (`X` != `A`)
  needs a real look regardless of files touched, breaking changes are
  plausible. Patch and minor bumps on a lockfile only diff do not.

This needs zero extra API calls, the title from step 1 is enough.

## 3. Cross reference open Dependabot alerts, filtered fields only

```bash
gh api repos/gailroco/cvportfolio/dependabot/alerts --jq \
  '[.[] | select(.state=="open")] |
   .[] | {number, severity: .security_advisory.severity,
          package: .dependency.package.name}'
```

Match `package` against each PR's dependency name (from the title) so
the batch table in step 5 can note which merges close a tracked alert.
This is the same alert feed `security-audit` uses; do not re fetch the
full alert objects, the severity and package name are all this needs.

## 4. Confirm CI can actually gate the merge

Check the workflow exists:

```bash
ls .github/workflows/ 2>/dev/null
```

If there is no CI workflow, say so and stop before merging anything,
there is no automated signal to rely on and every PR falls back to a
real review regardless of step 2's classification.

If CI exists, check status for all open Dependabot PRs in one pass:

```bash
for n in $(gh pr list --state open --author app/dependabot --json number --jq '.[].number'); do
  s=$(gh pr checks "$n" 2>&1)
  echo "$n: ${s:-none}"
done
```

PRs already opened before the workflow existed report no checks.
`pull_request` triggers do not run retroactively, only a new commit
(open, synchronize, reopen) fires them.

**Checkpoint:** if any PRs need a nudge, list which ones and get one
batch approval before commenting, posting to a PR is visible shared
state:

```bash
gh pr comment <N> --body "@dependabot rebase"
```

## 5. Wait for checks, one blocking call

```bash
timeout 600 bash -c '
  while true; do
    pending=0
    for n in <PR numbers needing a wait>; do
      s=$(gh pr checks "$n" --json state --jq "[.[].state] | map(select(.==\"PENDING\" or .==\"IN_PROGRESS\")) | length" 2>/dev/null || echo 0)
      [ "$s" != "0" ] && pending=1
    done
    [ "$pending" = "0" ] && break
    sleep 15
  done
'
```

Run this with `run_in_background: true` and let the single completion
notification carry the result. Do not wrap this in `Monitor`, there is
one outcome to learn ("done" or "timed out"), not a stream of events
worth separate messages.

## 6. Real review only where step 2 flagged it

For any PR that touches a source file or is a major bump, fetch the
diff and read it properly:

```bash
gh pr diff <N>
```

Judge it on its own merits (breaking changes, behavior change, blast
radius). This is the only place the full diff and manifest changes
belong in context, keep it scoped to the PRs that actually need it.

## 7. One batch table, one checkpoint

Present every open PR in a single table: PR#, package, version jump,
files touched, CI status, alert closed (if any), auto merge eligible
(yes / needs review / blocked on CI). Auto merge eligible means:
lockfile and/or manifest only, non major bump, CI green.

**Checkpoint:** ask for one approval covering the whole eligible
batch (the user can carve out exceptions in their reply) before
merging anything. PRs that failed CI or need a real review are never
auto merge eligible, call those out separately and wait for an
explicit decision on each.

## 8. Merge the approved set

```bash
gh pr merge <N> --squash --delete-branch
```

Loop over the approved numbers in sequence, no per PR confirmation
needed once the batch was approved in step 7.

## 9. Report

One compact closing summary: PRs merged (package, version, alert
closed if applicable), PRs left open and why (needs review, CI red,
no CI configured, user held it back). No per PR narrative.

## 10. Running this on a schedule

If the user wants this cleared automatically instead of on demand,
point them at the `schedule` or `loop` skill rather than re invoking
this by hand each time.
