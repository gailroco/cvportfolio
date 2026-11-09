#!/usr/bin/env bash
# Run a cvportfolio npm task inside the pinned Docker build image.
#
#   scripts/docker-npm.sh ci|lint|build|develop|serve
#
# The repo is mounted at /app and the container runs as the host user,
# so node_modules, .cache and public stay owned by you. Deploying is
# deliberately not supported here.
set -euo pipefail

repo="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
image="cvportfolio-build:$(cat "$repo/.nvmrc")"

task="${1:-}"
case "$task" in
  ci)      cmd=(npm ci) ;;
  lint)    cmd=(npm run lint) ;;
  build)   cmd=(npm run build) ;;
  develop) cmd=(npm run develop -- -H 0.0.0.0 -p 8000) ;;
  serve)   cmd=(npm run serve -- -H 0.0.0.0 -p 8000) ;;
  *)
    echo "usage: $0 ci|lint|build|develop|serve" >&2
    echo "deploy is not available in the container" >&2
    exit 2
    ;;
esac

docker build -q -t "$image" "$repo/docker" >/dev/null

ports=()
if [[ "$task" == develop || "$task" == serve ]]; then
  ports=(-p 127.0.0.1:8000:8000)
fi

tty=()
[[ -t 0 && -t 1 ]] && tty=(-it)

exec docker run --rm "${tty[@]}" "${ports[@]}" \
  --user "$(id -u):$(id -g)" \
  -e HOME=/tmp \
  -v "$repo:/app" \
  -v cvportfolio-npm-cache:/npm-cache \
  "$image" "${cmd[@]}"
