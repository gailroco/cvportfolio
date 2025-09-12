# Maintenance Guide

## Local development
- Node 20+ and npm 10+
- Install: `npm install`
- Start dev server: `npm run develop` (http://localhost:8000)

### Proper server startup sequence
To avoid gray rectangle issues with images:
```shell
# Development server
taskkill /F /IM node.exe  # stop any running servers
npm run clean            # clear cache
npm run develop          # start dev server

# Production preview server
taskkill /F /IM node.exe  # stop any running servers
npm run clean            # clear cache
npm run build -- --prefix-paths  # build with path prefix
npm run serve -- --prefix-paths  # start production server
```

## Build and deploy
- Production build: `npm run build`
- Production build with path prefix: `npm run build -- --prefix-paths`
- Preview locally: `npm run serve`
- Preview with path prefix: `npm run serve -- --prefix-paths` (http://localhost:9000/cvportfolio/)
- GitHub Pages: `npm run deploy` (publishes `public/`)

## Security and dependency hygiene
- Audit regularly: `npm audit`
- Upgrade Gatsby suite together (same minor patch family) to avoid peer conflicts
- Avoid unused deps; remove when not referenced in code
- Keep `nanoid`, `bootstrap`, and `sass-embedded` up-to-date
- Use `npm overrides` in package.json to force secure versions of transitive dependencies

## Coding conventions
- Centralize shared logic in hooks (e.g., `useDeviceType`)
- Keep components presentational; data flows via context only
- Prefer SCSS partials for section-specific styles

## Adding content
- Edit `src/data/data.js` for text, URLs, and images
- Place new images in `src/images/` and reference by filename
- Images are automatically processed by Gatsby and support case-insensitive filename matching

## Troubleshooting
- If styles look off after Bootstrap 5, verify class names and spacing utilities
- If images don't show, check filename case and that the file exists in `src/images/`
- If images show as gray rectangles, follow the proper server startup sequence above
- If build fails, run `npm run clean` then reinstall
- If you get "resource busy or locked" errors on Windows, stop all Node processes first
- Sass deprecation warnings are resolved by using `sass-embedded` with modern API configuration

## File management
- The `.gitignore` file has been updated to exclude build artifacts, caches, logs, and OS-specific files
- Always commit changes to `src/data/data.js` and `src/images/` for content updates
- Never commit `node_modules/`, `.cache/`, or `public/` directories
