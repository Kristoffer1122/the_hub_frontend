# Rust Backend

This frontend connects to the Rust backend API for game library data.

## Repository

- **Repo:** [Kristoffer1122/rust_webserver](https://github.com/Kristoffer1122/rust_webserver)
- **Language:** Rust (Axum + Diesel + MySQL)
- **Default Port:** `7878`

## Connection

The frontend communicates with the backend via the `BACKEND_URL` environment variable:

```bash
# Default (local development)
BACKEND_URL=http://localhost:7878

# Docker (container-to-host)
BACKEND_URL=http://host.docker.internal:7878
```

## Setup

1. Clone the backend:
   ```bash
git clone https://github.com/Kristoffer1122/rust_webserver.git
   ```
2. Follow backend setup instructions in that repo
3. Start the backend on port `7878`
4. Start this frontend with `npm run dev`