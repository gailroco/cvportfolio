#!/bin/bash
# Setup script for the cvportfolio Claude cloud environment.
# Paste this into the environment's "Setup script" field on claude.ai/code.
#
# Cloud VMs ship Node 22 at /opt/node22 (on PATH by default), but not
# necessarily the exact patch release this repo pins. When it differs,
# this replaces /opt/node22 with the pinned release from nodejs.org,
# which the Trusted network level allows. The script runs as root,
# before the repo is cloned, so the version is written here and must be
# kept in step with .nvmrc. Dependencies are installed later by the
# repo's SessionStart hook.
#
# It always exits 0: a failure here should not stop the session from
# starting, and the SessionStart hook warns when Node does not match.

want="22.23.1"   # keep in step with .nvmrc
sha="9749e988f437343b7fa832c69ded82a312e41a03116d766797ac14f6f9eee578"
dir=/opt/node22

have="$("$dir/bin/node" -v 2>/dev/null | sed 's/^v//')"
if [ "$have" = "$want" ]; then
  echo "cvportfolio setup: Node $want already installed"
  exit 0
fi

tmp="$(mktemp -d)"
tarball="node-v$want-linux-x64.tar.xz"
if curl -fsSL -o "$tmp/$tarball" "https://nodejs.org/dist/v$want/$tarball" \
   && echo "$sha  $tmp/$tarball" | sha256sum --check --status \
   && mkdir "$tmp/node" \
   && tar -xJf "$tmp/$tarball" -C "$tmp/node" --strip-components=1; then
  rm -rf "$dir.orig"
  [ -d "$dir" ] && mv "$dir" "$dir.orig"
  mv "$tmp/node" "$dir"
  # Carry over the VM's preinstalled global packages (playwright,
  # eslint, prettier and so on) and their command links, keeping the
  # npm and corepack that ship with the pinned release.
  if [ -d "$dir.orig/lib/node_modules" ]; then
    for m in "$dir.orig"/lib/node_modules/*; do
      case "$(basename "$m")" in npm|corepack) continue ;; esac
      [ -e "$dir/lib/node_modules/$(basename "$m")" ] || cp -a "$m" "$dir/lib/node_modules/"
    done
    for b in "$dir.orig"/bin/*; do
      case "$(basename "$b")" in node|npm|npx|corepack) continue ;; esac
      [ -e "$dir/bin/$(basename "$b")" ] || cp -a "$b" "$dir/bin/"
    done
  fi
  echo "cvportfolio setup: replaced Node ${have:-none} with $("$dir/bin/node" -v)"
else
  echo "cvportfolio setup: could not install Node $want, keeping ${have:-none}" >&2
fi
rm -rf "$tmp"
exit 0
