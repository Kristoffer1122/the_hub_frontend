variable "container_name" {
  description = "Name of our Next.js frontend"
  type        = string
  default     = "nextjs_frontend"
}

variable "azure_openai_endpoint" {
  description = "Azure OpenAI endpoint"
  type        = string
  sensitive   = true
}

variable "azure_openai_deployment_name" {
  description = "Azure OpenAI deployment name"
  type        = string
  default     = "scheduler"
}

variable "backend_url" {
  description = "Backend API URL"
  type        = string
  default     = "http://host.docker.internal:7878"
}

terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.1"
    }
  }
}

provider "docker" {}

resource "docker_image" "app" {
  name = "nextjs_frontend:latest"
  build {
    context    = path.module
    dockerfile = "Dockerfile"
  }
  keep_locally = false
}

resource "docker_container" "app" {
  image    = docker_image.app.image_id
  name     = var.container_name
  must_run = true
  env = [
    "AZURE_OPENAI_ENDPOINT=${var.azure_openai_endpoint}",
    "AZURE_OPENAI_DEPLOYMENT_NAME=${var.azure_openai_deployment_name}",
    "BACKEND_URL=${var.backend_url}"
  ]
  ports {
    internal = 3000
    external = 3000
  }

  # Allow container to reach backend and host services
  host {
    host = "host.docker.internal"
    ip   = "host-gateway"
  }
}
