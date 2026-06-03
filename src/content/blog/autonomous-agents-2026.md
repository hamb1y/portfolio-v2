---
title: "Autonomous Agents in 2026"
description: "I spent months running autonomous AI agents on my homelab. Most were forgettable. One became indispensable. Here is why the framework matters more than the model."
date: 2026-05-30
tags: [AI, Autonomous Agents, Nanobot, Homelab, DeepSeek, LLM]
readTime: "10 min"
---

# Autonomous Agents in 2026

Over the past few months, I ran several autonomous AI agents continuously on my homelab. Most were forgettable. One became useful enough that I now treat it as part of my system. This is the story of what I tested, what I found, and what I think it means for where this category actually is right now.

I tried Hermes Agent and OpenClaw early on. For my setup and my workflow, they didn't work. The responses felt stiff, there was no real initiative, and it felt like talking to a chatbot that had been told to pretend to be an agent. I nearly wrote off the whole category.

Then I found Nanobot, an open-source project with 43k GitHub stars. The architecture was different from anything else I had tried — long-term memory, a personality system, subagent spawning, goal tracking, and heartbeat monitoring, all designed around 24/7 persistence. I decided to run it as an experiment: a systemd user service, DeepSeek V4 Flash as the model, running as my user with access to my home environment. I gave it a custom system prompt designed for maximum capability and told it to execute tasks directly.

I'm a contributor now — a few PRs and issues in the repo. But I didn't start as a believer. I started as a skeptic who expected to uninstall within a week.

## The Experiment

The setup matters here. My agent runs as a systemd user service on a single-user Rocky Linux homelab. No Docker, no container sandbox. It has access to my home directory, my SSH keys, and my media mount at `/mnt/hdd-mg06-8t`. For privileged operations, it uses an HTTP sudo gateway called Sudogranter on localhost:64420.

Yes, this is a security tradeoff. I am not recommending this setup for anyone else. I run a single-user homelab with no network exposure, and I accept the risk because the productivity gain has been significant. If I were setting this up for a multi-user system or a production environment, I would containerize everything and restrict capabilities heavily.

The model is DeepSeek V4 Flash. 284B parameter MoE with 13B active per token, a million-token context window, MIT licensed, at $0.14 per million input tokens. That is less than 1% of Claude Opus, cheap enough that cost never factors into whether I let it explore or iterate.

The experiment was simple: use it every day for real tasks and see if it became more useful over time.

## The First Week

The out-of-the-box experience was not good. With default settings and standard alignment prompts, it refused or hedged on most requests. For my use case — an agent that needs to execute commands and make decisions — the default behavior was a blocker.

I replaced the system prompt with a custom one focused on direct execution. This is a personal choice that worked for my workflow. Your mileage will vary depending on what you are trying to accomplish.

After the prompt change, the agent was technically capable — DeepSeek V4 Flash is a solid model — but it had no useful context. It did not know my filesystem layout, my naming conventions, or my preferences. It did not remember mistakes from ten minutes ago. Every task was a cold start.

I almost stopped the experiment right there.

## What Changed

I kept using it, and the change was gradual. I gave it tasks every day — organizing files, debugging services, handling sysadmin work. I spoke to it directly, without padding, and it adapted to that style over time.

Around week three, I noticed I was correcting it less often. It had internalized my filesystem layout, my conventions, and my preferences. By week six, the same binary with the same model was saving me hours a day.

The model did not get smarter. What changed was the accumulated memory. Every fix I approved got recorded. Every preference became a directive. Over time, the agent specialized for my system and my workflow in a way that a stateless interface cannot replicate.

## What It Did

**Media library management.** I run Jellyfin in a Podman Quadlet with SELinux. The agent configured the entire stack over a few hours. When I asked it to grab the latest season of an airing anime, it spawned a sub-agent for the torrent search, downloaded the files, scanned them into Jellyfin, fixed the naming, and told me when it was done.

**Homebrew on NixOS.** NixOS does not have `/bin/bash`, and Homebrew hardcodes it everywhere. The agent patched the shebangs, configured environment variables, installed a GCC wrapper, and fixed SELinux context issues on the binaries. When `brew update` overwrote the patches, it re-applied them from its own memory.

**OS migration.** We moved from NixOS to Rocky Linux 10 — every service, config file, and package. The agent planned the migration, reinstalled everything, and debugged the post-migration environment. Because it remembered the old setup, it could tell me exactly what had changed.

**This blog post.** It created a skill, brainstormed topics, captured my thoughts, drafted, iterated, and pushed to GitHub where Netlify deployed it. It even researched DeepSeek V4 Flash specs for the technical details.

These were not toy tasks. Each one would have taken me hours of manual work. The agent handled them in minutes because it already knew my environment and remembered past fixes.

## Why the Others Did Not Stick

I tested Hermes Agent and OpenClaw under similar conditions with the same model. Even from the first session, they felt less capable. The reason is architectural rather than magical.

Hermes Agent is stateless — every session starts from zero with no persistent memory of your preferences. OpenClaw has a personality system but it does not compound over time. You set directives once and they stay flat.

Nanobot's design — long-term memory, persistent context, subagents, goal tracking — means every interaction is an investment. The agent accumulates understanding over time. That compounding effect is what made the difference in my testing, not any single feature.

## What I Think This Means

The thing I kept running into with stateless agents was that nothing carried over. Every session, I was back at the beginning. With Nanobot, the opposite happened — every session built on the last one. For long-running personal workflows, that accumulated context ended up mattering more than raw model intelligence.

This finding comes with real tradeoffs. The setup that gave me the best results also gives the agent broad access to my system. That is not acceptable for every environment, and I would design it differently for anything beyond a personal homelab.

The more I used it, the less it felt like a smart tool and the more it felt like an automation layer that had absorbed my environment. It did not replace thinking — it replaced the repeated context-switching and manual execution that used to eat up my day. The value came from persistence and memory, not from any special intelligence.

For the first time, I have a setup that makes the autonomous agent category feel real to me in a practical, daily-useful sense. I think the most useful agents going forward will not be the most generally intelligent ones. They will be the ones with enough persistence and memory to become specific to the person running them.

If you run a homelab and are curious about this space, I would recommend starting with a containerized agent in a restricted environment. Give it long-term memory and use it consistently for real tasks. Judge it after a month, not after a day.

---

*I am a contributor to the Nanobot project. This post was not sponsored or commissioned. I paid for the API calls out of pocket — at $0.14/M tokens for DeepSeek V4 Flash, the total cost was small.*
