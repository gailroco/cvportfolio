---
name: fix-issue
description: Fix a gailroco/cvportfolio GitHub issue end to end: investigate, patch, verify in a browser, commit, comment, and close. Use when the user says "fix issue #N", references a gailroco/cvportfolio GitHub issue by number, or asks to work through the open issue list.
---

# Fix a cvportfolio issue

This repo is a static Gatsby portfolio site with no backend, no device
target, and no configured test suite (`npm test` is a stub that
intentionally fails, there is nothing to run). Verification here means
reading the fix and checking it in a real browser, not running a test
command.

## 1. Pull the issue

```bash
gh issue view <N> --repo gailroco/cvportfolio
```

If the user did not give a number, `gh issue list --repo
gailroco/cvportfolio` first and ask which one, or confirm if there is
one obvious match.

## 2. Diagnose before patching

- Find the relevant page, component, or data file under `src/` and
  trace how it produces the reported behavior.
- Root cause it, restate the actual problem in your own words rather
  than the issue title alone.
- If a screenshot or reported page is involved, load it in a browser
  first (see step 4's tooling) to see the real current behavior before
  guessing at a fix.

**Checkpoint:** present the restated problem and an implementation
plan, what changes, which files, any layout or content risk, and wait
for approval before writing any code.

## 3. Fix

After approval, make the code change. Keep it scoped to the issue,
this is a small personal site, do not fold in unrelated cleanup.

## 4. Verify in a browser, not just a clean build

Any UI or layout facing change must be checked visually before it
counts as done, a passing build proves the site compiles, not that the
fix looks right.

```bash
npm run develop
```

Then load `http://localhost:8000` (or the specific route affected) with
the `claude-in-chrome` tools, or hand off to the user to check
manually, and confirm the reported problem is actually gone. For a
content-only or data-only change (copy, dates, links) a quick visual
check is still worth doing but the bar is lower.

Also lint before committing, there is no `lint` npm script wired up, so
call eslint directly:

```bash
npx eslint src
```

## 5. No test suite: do not fabricate one

This repo has no unit testing framework configured. Do not add ad hoc
test files or wire one up as a side effect of an issue fix, that is a
separate, larger decision. If a fix is complex enough that the user
would want real test coverage, say so and let them decide whether to
set up testing as its own piece of work.

## 6. Commit

Follow the global commit format (present tense title, 72 characters or
less, blank line, `-` bullets, no file or function or variable names,
no dash used as punctuation). Stage files by name, never `git add -A`
or `git add .`.

This repo's convention: never add a `Co-Authored-By` trailer to
commits here, regardless of the default commit template.

**Checkpoint:** show the drafted title and bullet body and wait for
approval before running `git commit`.

## 7. Push

**Checkpoint:** ask whether to push to `master` before running it.

```bash
git push
```

## 8. Comment and close

Draft the issue comment in this format:

```
**Problem:** <what the user visible symptom was>

**Root cause:** <why it happened>

**Fix:** <what changed>

Fixed in <sha>.
```

**Checkpoint:** show the proposed comment and wait for approval before
posting.

```bash
gh issue comment <N> --repo gailroco/cvportfolio --body "$(cat <<'EOF'
**Problem:** <...>

**Root cause:** <...>

**Fix:** <...>

Fixed in <sha>.
EOF
)"
```

**Checkpoint:** ask whether to close the issue now. Only close after
the browser check in step 4 actually confirmed the fix, not on the
strength of a clean build alone.

```bash
gh issue close <N> --repo gailroco/cvportfolio
```

## 9. Deploy

`npm run deploy` publishes straight to the live GitHub Pages site.
After closing the issue, mention it is available and ask whether to
deploy now or batch it with other pending fixes. Do not run it on your
own initiative.

**Checkpoint:** ask whether to deploy now before running it.

```bash
npm run deploy
```

## 10. Save what is worth keeping

If the fix surfaced a non obvious, reusable lesson (a Gatsby build
quirk, a layout gotcha, something likely to recur), save it as a
`reference` or `feedback` memory. Routine "found bug, fixed with commit
X" detail belongs in the issue comment and commit message, git and
GitHub are already the record for that.
