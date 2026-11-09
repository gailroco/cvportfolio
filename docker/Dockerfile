# Build environment for cvportfolio. Keep the tag in step with .nvmrc.
# Debian based (glibc) so sharp picks the same prebuilt binary as the
# native Linux x86_64 build. Pinned by digest so the image never drifts.
FROM node:22.23.1-bookworm-slim@sha256:6c74791e557ce11fc957704f6d4fe134a7bc8d6f5ca4403205b2966bd488f6b3

# Shared npm cache, mounted as a named volume by scripts/docker-npm.sh.
# World writable so it works for whatever host UID runs the container.
RUN mkdir -p /npm-cache && chmod 1777 /npm-cache
ENV npm_config_cache=/npm-cache \
    npm_config_update_notifier=false \
    GATSBY_TELEMETRY_DISABLED=1

USER node
WORKDIR /app
EXPOSE 8000
