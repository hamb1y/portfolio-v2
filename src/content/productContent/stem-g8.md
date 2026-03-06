---
title: STEM-G8
description: A music psychology research platform that collected heart rate data and emotional responses to music from hundreds of real participants.
technologies:
  - Svelte 5
  - Python
  - Flask
  - Arduino
  - MPU-6050
  - MAX30102
  - CatBoost
  - scikit-learn
link: https://www.rishimalnad.dev/products
---

> **Note:** STEM-G8 is no longer active. It was a group project that ran for a limited time to collect research data.

# 1. What was STEM-G8?

STEM-G8 was a music psychology research platform I built as a group project. The idea was to study how people emotionally respond to short music clips. Participants would listen to music snippets, rate how the music made them feel, describe their own emotional state, and fill in some basic demographic info. The goal was to find patterns between music and listener emotions, and we collected hundreds of real participant sessions this way.

The thing that set it apart from being just a survey was the custom heart rate sensor hardware running alongside each session, so we could compare what participants said they felt with what their body was actually doing.

# 2. How it worked

The system had three main parts.

The frontend was written in Svelte 5 and was the main thing participants interacted with. It handled the survey flow, audio playback, and collecting ratings. It also polled the heart sensor pipeline every 5 seconds, bundled the readings as partial JSON updates tagged with a session UUID, and sent them to the backend.

The backend was a lightweight Flask REST API. It received those partial updates and stored them as individual JSON files per session. After collection was done, we ran a pipeline to compress and encrypt everything using eXdupe, then zstd, then age with a public/private key pair. Only I had the private key, so the data was secure even if the server was compromised.

After the data was collected, we had a separate Python analysis suite using CatBoost, scikit-learn, Plotly, and seaborn to do the actual machine learning and visualization on the dataset, all without touching the live system.

# 3. The issues we faced

The hardest part at the start was figuring out how to split responsibilities across the system as a group. We ran into JSON corruption problems early on from non-atomic file writes, which we fixed with safe parsing and atomic rename operations. Sourcing the hardware was also annoying. Getting consistent sensor readings took a few failed hardware revisions before we found a setup that actually worked reliably under real conditions.

# 4. The heart sensor setup

The heart sensor was probably the most complex part of the whole thing. We went through a few failed attempts before settling on an MPU-6050 accelerometer and a MAX30102 heart rate sensor connected to two Arduinos. One Arduino was just a dumb pipe streaming the raw sensor data over serial to the computer. The other one was used as a makeshift PSU for the accelerometer. Arduinos are cheap enough that this was the simplest option.

Once the hardware was stable, we wrote a Python script that analysed the incoming sensor data using signal processing and AI, then broadcasted the processed readings as JSON every 5 seconds over HTTP on a local port. The frontend polled that endpoint and included the latest heart heuristics in the partial JSON update it sent to the backend, tagged with the session UUID so it could all be joined up at analysis time.

# 5. The end result

STEM-G8 collected hundreds of participant sessions with music ratings, demographic data, session metadata, and heart sensor readings all bundled together. The data pipeline held up well, the participant experience was polished with audio sequencing and progress tracking, and the system ran reliably under real use. It's no longer running, but it was a genuinely complete piece of work and a solid learning experience in building something research-grade as a team.
