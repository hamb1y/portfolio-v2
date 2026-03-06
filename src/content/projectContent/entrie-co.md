---
title: Entrie Co. - Better, secure, independent, transparent auth.
description: An end-to-end, highly optimized authentication SaaS. Built from scratch with Go and a secure microservices architecture, featuring ephemeral hash pools and strict container resource allocation.
technologies:
  - Go
  - Microservices
  - SaaS
  - Security
  - Docker
  - Hetzner
link: https://entrie.co
---

# 1. What is Entrie Co.?

Entrie Co. is an end-to-end (e2e) authentication SaaS platform. The core philosophy behind Entrie is providing "better, secure, independent, transparent auth." Rather than relying on massive, opaque third-party black boxes, Entrie is built from scratch with a rigorous microservices architecture specifically optimized for security and raw efficiency. 

The entire stack—including the web binaries—is written purely in Go. Go was selected because its compiled efficiency allows the system to tightly control container resource allocation, ensuring high performance even under massive load limits while running on affordable Hetzner infrastructure.

We support secure standard protocols out of the box, ensuring developers can drop Entrie easily into their existing frontend stacks.

# 2. Architecture & Microservices

The architecture is split into five highly specialized components to maximize security and minimize attack surfaces:

- **Orchestrator:** The brain of the operation. It orchestrates all the other pools and routes requests securely.
- **HashPool:** A pool consisting entirely of ephemeral `hashWorkers`. To guarantee industry-standard security, we use `argon2id` with a strict configuration (`t=4, m=128MiB`). Because hashing is resource-intensive but stateless, the HashPool spins up and destroys workers ephemerally to prevent long-term exposure.
- **ConsumerPool:** Another fully ephemeral pool made of `consumerWorkers`. Each active project is assigned its own isolated `consumerWorker`. Even during low load periods, a strict minimum of `0.05 vCPU` and `96MiB` of memory is allocated per container to guarantee stable latency. For our Mini tier and the self-hosted Lite version, this is heavily optimized down to a minimum of `0.025 vCPU` and `40MiB`.
- **CentralDb:** Since the HashPool and ConsumerPool are entirely ephemeral, all persistent data is securely funneled and stored centrally in the CentralDb.
- **WebConfig:** A dedicated pool and dashboard interface that allows developers to easily manage their connected instances, environments, users, and organizations.

# 3. Organizations and Pricing Strategy

The platform is structured using an Organization > Project hierarchy. Every organization can have multiple projects, and each project pays for its own specific tier. Because Entrie is built for serious production workloads, there is no perpetually free tier, ensuring sustained infrastructure quality.

The pricing matrix is designed to scale directly alongside a project's growth:

1. **Mini ($3 / month):** Designed for early startups. Supports up to 750 total users and 300 Monthly Active Users (MAU).
2. **Starter ($6 / month):** For growing platforms. Up to 100k total users and 10k MAU.
3. **Pro ($16 / month):** Unlimited total users with a hard limit of 30k MAU. *This tier unlocks Custom Branding capabilities.*
4. **Scale ($80 / month):** The enterprise tier. 60k MAU and 60k total users out of the box. Additional billing kicks in at $0.08 per 1,000 new signups and $0.06 per 1,000 additional MAU. *This tier unlocks raw SSO integrations.*

# 4. Entrie Lite (Open Source)

Because transparency is a core pillar of the project, I am also developing **Entrie Lite**. It is a fully open-source, self-hostable implementation of the Entrie architecture. To make it easier for homelabbers and self-hosters to deploy, Entrie Lite bypasses the heavy multi-tenant orchestration and consolidates the infrastructure down to just 3 core containers: the Core Engine, the `WebConfig`, and the `HashWorker`.
