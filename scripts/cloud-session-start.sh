#!/usr/bin/env bash
# SessionStart hook for Claude cloud sessions. Does nothing locally.
# Installs dependencies with npm ci, but only when node_modules is
# missing or package-lock.json changed since the last install.
set -euo pipefail

[[ "${CLAUDE_CODE_REMOTE:-}" == "true" ]] || exit 0

cd "${CLAUDE_PROJECT_DIR:-$(dirname "${BASH_SOURCE[0]}")/..}"

want="$(cat .nvmrc)"
have="$(node -v 2>/dev/null | sed 's/^v//')"
if [[ "$have" != "$want" ]]; then
  echo "cvportfolio: Node $have found, .nvmrc wants $want." \
       "Check the cloud environment setup script." >&2
fi

stamp=node_modules/.package-lock.sha256
hash="$(sha256sum package-lock.json | cut -d' ' -f1)"
if [[ -f "$stamp" && "$(cat "$stamp")" == "$hash" ]]; then
  exit 0
fi

npm ci --no-audit --no-fund --loglevel=error
echo "$hash" > "$stamp"
