---
title: Entrie Co.
description: An end-to-end authentication SaaS built in Go with an ephemeral microservices architecture, Argon2id hashing, and pricing that scales with you.
technologies:
  - Go
  - Docker
  - Microservices
  - Argon2id
  - Hetzner
  - SaaS
link: https://entrie.co
---

> Entrie Co. is currently being built from scratch. This is a description of what it is and the architecture behind it.

# 1. What is Entrie Co.?

Entrie Co. is an end-to-end authentication SaaS. The positioning is "better, secure, independent, transparent auth." I started it because most auth providers are either expensive and opaque, or you have to roll your own and hope you don't mess something up. Entrie sits in the middle.

The entire stack, including the web binaries, is written in Go. I picked Go because it's compiled, has a small footprint, and lets me control container resource allocation tightly. The whole thing runs on Hetzner.

# 2. The Architecture

The system is split into five components.

**Orchestrator** handles all request routing and manages the worker pools. Everything goes through it.

**HashPool** is a pool of ephemeral hashWorkers. All password hashing happens here using Argon2id with `t=4, m=128MiB`, which is above OWASP minimums for sensitive auth. The pool is fully ephemeral by design, workers spin up, do their job, and get destroyed. There's no long-lived state sitting around to compromise.

**ConsumerPool** is also fully ephemeral. Each active project gets its own isolated consumerWorker container. Even at low load, I enforce a minimum of 0.05 vCPU and 96MiB RAM per worker so every project has a guaranteed baseline, not best-effort. For the Mini tier and Entrie Lite, that minimum drops to 0.025 vCPU and 40MiB.

**CentralDb** is where all persistent data lives. Because the HashPool and ConsumerPool are stateless and ephemeral, the CentralDb is the only stateful component in the whole system, which makes it much easier to reason about, secure, and back up.

**WebConfig** is the admin interface. Developers use it to manage their projects, organizations, users, and configuration without needing to touch APIs or config files directly.

# 3. Organizations and Projects

Entrie uses an Organization -> Project hierarchy. Each org can have multiple projects, and each project is on its own paid plan. This keeps billing clean if you're managing more than one product from the same account.

Standard secure protocols are supported out of the box, so you can drop Entrie into an existing stack without rewriting your auth layer.

# 4. Pricing

There's no free tier. Entrie is for production use.

| Tier | Price | Total Users | MAU | Notable |
| :--- | :--- | :--- | :--- | :--- |
| **Mini** | $3/mo | 750 | 300 | |
| **Starter** | $6/mo | 100,000 | 10,000 | |
| **Pro** | $16/mo | Unlimited | 30,000 | Unlocks custom branding |
| **Scale** | $80/mo | 60,000 | 60,000 | Unlocks SSO, pay-as-you-grow |

On the Scale tier, additional usage is billed at $0.08 per 1,000 new signups and $0.06 per 1,000 MAU beyond the base. Custom branding is Pro and above, SSO is Scale only.

# 5. Entrie Lite

Entrie Lite is the open-source, self-hostable version. It strips out the multi-tenant orchestration layer and runs as a simple 3-container stack: the Core Engine, the WebConfig, and the HashWorker. It's for people who want to self-host, audit exactly what's handling their users' credentials, or just run it on a homelab.
