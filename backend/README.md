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
- does not run full schema migrations automatically (handle schema changes separately)

## Per-user todos without registration

Todos are now isolated by an anonymous client id:

1. Frontend generates a random client id once and stores it in `localStorage`.
2. Every API request sends this value in the `x-client-id` header.
3. Backend filters create/read/update/delete queries by `x-client-id`.

### Why this approach

- Better isolation than IP-only (many users can share one IP).
- Simpler and more stable than browser fingerprinting.
- No registration/login required.

### Other options

- **IP only**: easy, but unreliable and often shared.
- **Fingerprint + IP**: can improve uniqueness, but is unstable and privacy-sensitive.
- **Signed anonymous cookie/session id**: good alternative when localStorage is not desired.

## Render deployment note

Auto-deploy from Render dashboard is totally fine.  
Make sure these env vars are set there:

- `SQLITE_STORAGE_PATH` to a persistent disk path (example: `/data/database.sqlite`)
- `CORS_WHITELIST` including your frontend URL

## Suggested project improvements

1. Add automated tests for backend routes (create/list/delete tasks).
2. Add CI checks for backend and frontend (build + lint + tests).
3. Move backend dependencies from `devDependencies` to `dependencies` for production installs.
4. Add healthcheck endpoint (`/health`) for deployment monitoring.
