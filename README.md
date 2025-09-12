<p align="center">
  <a href="https://gailroco.github.io/cvportfolio/">
    <img alt="Portfolio" src="src/images/favicon.png" width="60" />
  </a>
</p>
<h1 align="center">
  CV Portfolio
</h1>

A simple Gatsby-based portfolio site with React, SCSS, and small animation helpers.

## ☕ Quick start

1. **Prerequisites.**

    ```shell
    node -v   # >= 20
    npm -v    # >= 10
    ```

2. **Install and run.**

    ```shell
    npm install
    npm run develop
    ```

    Your site runs at http://localhost:8000

3. **Build, serve, deploy.**

    ```shell
    npm run build       # production build
    npm run serve       # serve the built site locally
    npm run deploy      # deploy to GitHub Pages (gh-pages)
    ```

    **For production preview with path prefix:**
    ```shell
    npm run build -- --prefix-paths  # build with path prefix
    npm run serve -- --prefix-paths  # serve at http://localhost:9000/cvportfolio/
    ```

4. **Troubleshooting image display issues.**

    If images show as gray placeholders instead of actual images:
    
    ```shell
    # First, stop any running servers
    taskkill /F /IM node.exe  # Windows: kill all Node processes
    # OR Ctrl+C in terminal windows running npm commands
    
    npm run clean       # clear Gatsby cache
    npm run develop     # restart dev server
    # OR
    npm run build -- --prefix-paths  # rebuild with path prefix
    npm run serve -- --prefix-paths  # serve production preview
    ```
    
    **Note:** On Windows, you may get "resource busy or locked" errors if Gatsby processes are still running. Always stop servers before running `npm run clean`.

5. **Proper server startup sequence.**

    To avoid gray rectangles and ensure images display correctly:
    
    **Development Server:**
    ```shell
    taskkill /F /IM node.exe  # stop any running servers
    npm run clean            # clear cache
    npm run develop          # start dev server
    ```
    
    **Production Preview Server:**
    ```shell
    taskkill /F /IM node.exe  # stop any running servers
    npm run clean            # clear cache
    npm run build -- --prefix-paths  # build with path prefix
    npm run serve -- --prefix-paths  # start production server
    ```

## Project structure
- `src/components/` React UI components (Hero, About, Projects, Contact, Footer)
- `src/data/data.js` Content configuration (titles, text, links, images)
- `src/style/` SCSS partials organized by concerns
- `src/transition/` animation helpers (Fade, RevealBase)
- `docs/` Architecture, components, and maintenance docs

## Documentation
- [Architecture](docs/ARCHITECTURE.md)
- [UI Components](docs/COMPONENTS.md)
- [Maintenance Guide](docs/MAINTENANCE.md)

## Notes
- Bootstrap upgraded to v5; jQuery is not required
- Shared hook `src/hooks/useDeviceType.js` provides consistent responsive behavior

## Security
- Run `npm audit` regularly and apply non-breaking updates
- Keep `nanoid` and Gatsby plugins up-to-date

## License
See [LICENSE.md](LICENSE.md)
