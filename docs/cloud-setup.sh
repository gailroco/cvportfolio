#!/usr/bin/env bash
# Setup script for the cvportfolio Claude cloud environment.
# Paste this into the environment's setup script field on claude.ai.
# It installs the Node version from .nvmrc when the preinstalled one
# differs. Dependencies are installed later by the SessionStart hook.
set -euo pipefail

want="22.23.1"   # keep in step with .nvmrc
have="$(node -v 2>/dev/null | sed 's/^v//' || true)"
[[ "$have" == "$want" ]] && exit 0

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [[ ! -s "$NVM_DIR/nvm.sh" ]]; then
  git clone --depth 1 --branch v0.40.3 https://github.com/nvm-sh/nvm.git "$NVM_DIR"
fi
. "$NVM_DIR/nvm.sh"
nvm install "$want"
nvm alias default "$want"
ln -sf "$NVM_DIR/versions/node/v$want/bin/"{node,npm,npx} /usr/local/bin/
