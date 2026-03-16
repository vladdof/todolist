# Backend

## Database persistence after deploy

The backend uses SQLite by default. To keep data between deploys:

1. Mount a persistent volume/disk in your hosting platform.
2. Set `SQLITE_STORAGE_PATH` to a file on that volume (example: `/data/database.sqlite`).

If `SQLITE_STORAGE_PATH` is not set, the app uses `./database.sqlite`.

On startup, the app now:
- creates tables if they do not exist
- does **not** drop existing tables
- seeds demo tasks only when the tasks table is empty

## Suggested project improvements

1. Add automated tests for backend routes (create/list/delete tasks).
2. Add CI checks for backend and frontend (build + lint + tests).
3. Move backend dependencies from `devDependencies` to `dependencies` for production installs.
4. Add healthcheck endpoint (`/health`) for deployment monitoring.
