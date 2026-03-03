# The Hub - Frontend

Next.js frontend for The Hub application.

## Prerequisites

- Node.js 20+
- Docker (for containerized deployment)
- Terraform (for infrastructure management)
- Azure CLI (for AI features)

## Azure Authentication

The weekly recap feature uses Azure AI Foundry. You must authenticate with Azure:

```bash
az login
```

This is required for the AI-powered weekly recap generation to work.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Docker Deployment

Build and run with Terraform:

```bash
terraform init
terraform apply
```

Or manually with Docker:

```bash
docker build -t nextjs_frontend .
docker run -p 3000:3000 \
  -e BACKEND_URL=http://host.docker.internal:7878 \
  -e AZURE_OPENAI_ENDPOINT=your_endpoint \
  -e AZURE_OPENAI_DEPLOYMENT_NAME=scheduler \
  nextjs_frontend
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `BACKEND_URL` | Rust backend API URL | `http://localhost:7878` |
| `AZURE_OPENAI_ENDPOINT` | Azure AI Foundry endpoint | - |
| `AZURE_OPENAI_DEPLOYMENT_NAME` | AI agent name | `scheduler` |
