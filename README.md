# The Hub - Frontend

Next.js frontend for The Hub application.

## Running (Recommended)

Run everything from the monorepo using Docker Compose:

```bash
git clone --recurse-submodules https://github.com/Kristoffer1122/the_hub.git
cd the_hub
docker compose up --build
```

See the [monorepo README](https://github.com/Kristoffer1122/the_hub) for full instructions.

## Prerequisites (local dev only)

- Node.js 20+
- Azure CLI (for AI features)

## Azure Authentication

The weekly recap feature uses Azure AI Foundry. You must authenticate with Azure:

```bash
az login
```

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `BACKEND_URL` | Rust backend API URL | `http://localhost:7878` |
| `AZURE_OPENAI_ENDPOINT` | Azure AI Foundry endpoint | - |
| `AZURE_OPENAI_DEPLOYMENT_NAME` | AI agent name | `scheduler` |

### This does not save any of your Personal data
https://www.shera.no/privacy-policy