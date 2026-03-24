# Rust Backend

This frontend connects to the Rust backend API.

## Repository

- **Repo:** [Kristoffer1122/the_hub_backend](https://github.com/Kristoffer1122/the_hub_backend)
- **Language:** Rust (Axum + Diesel + MariaDB)
- **Default Port:** `7878`

## Running Together

The easiest way to run both services is via Docker Compose from the monorepo root:

```bash
git clone --recurse-submodules https://github.com/Kristoffer1122/the_hub.git
cd the_hub
docker compose up --build
```

See the [monorepo README](https://github.com/Kristoffer1122/the_hub) for full instructions.

## Connection

The frontend communicates with the backend via the `BACKEND_URL` environment variable:

```bash
# Default (local development)
BACKEND_URL=http://localhost:7878

# Docker Compose (service-to-service)
BACKEND_URL=http://backend:7878
```