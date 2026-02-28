---
title: How I Made My Stem-G8 Project
description: A music psychology research platform that studied emotional responses to music using a custom heart rate sensor, a SvelteKit frontend, and a Flask backend.
technologies:
- Svelte 5
- SvelteKit
- Python
- Flask
- Arduino
- Sensors
- Teamwork
link: www.rishimalnad.dev
---

> **Note:** STEM-G8 is no longer active, but it was a fully functional research platform that successfully collected music-emotion data from real participants.

# 1. What was STEM-G8?
STEM-G8 was a music psychology research platform I built as a group project. The idea was to study the emotional responses people have to short music clips. Participants would listen to music snippets, rate how the music made them feel, describe their own emotional state, and fill in some basic demographic info. The goal was to find patterns between music and listener emotions, and we collected hundreds of real participant sessions this way.

# 2. How it worked
The system had three main parts working together. The frontend was written in Svelte 5 and was the main thing participants interacted with, it handled the survey flow, audio playback, and collecting ratings. It also acted as the orchestrator for the heart sensor data, ingesting JSON from the sensor pipeline every 5 seconds and bundling it as partial JSON updates along with the survey results, identified by a UUID, and sending them to the backend.

The backend was a lightweight Flask REST API that received these partial JSON updates and stored them as individual JSON files per session. After collection, we would compress and encrypt the results using a pipeline of eXdupe, then zstd, then age with a public/private key pair, meaning only I had access to the private key, but anyone could encrypt data to the public key. This kept the research data secure.

We also built a separate analysis suite in Python using tools like CatBoost, scikit-learn, Plotly, and seaborn to visualize and run machine learning on the collected data after the fact, without touching the live system.

# 3. The issues we faced
The hardest part at the start was figuring out how to architect something this complex as a group. We had to figure out how the frontend and backend would divide responsibilities, how to handle the heart sensor data pipeline, and how to make sure data wasn't getting corrupted. Early on we did run into JSON corruption issues from non-atomic file writes, which we fixed with safe parsing and atomic rename operations. Sourcing the hardware components was also a challenge. Slowly, through a lot of iteration and hard work, everything fell into place.

# 4. How the heart sensor worked
The heart sensor setup was probably the most complex part of the whole project. After a few failed attempts at getting a reliable reading, we settled on using an MPU-6050 accelerometer and a MAX30102 heart rate sensor, connected to two Arduinos. One Arduino acted as a dumb pipe, purely streaming the raw sensor data over serial to the computer. The other was used as a makeshift PSU for the accelerometer, Arduinos were cheap enough that this was the easiest solution.

Once we had a stable hardware setup, we wrote a Python script that would analyze the incoming sensor data using AI and signal processing algorithms, then broadcast the processed results as JSON every 5 seconds over HTTP on a local port. The frontend would poll this every 5 seconds and include the latest heart heuristics in the partial JSON update it sent to the backend, tagged with the participant's UUID so everything could be matched up later.

# 5. The end result
STEM-G8 ended up being a complete, end-to-end research platform. It successfully collected hundreds of participant sessions with music ratings, demographic data, session metadata, and heart sensor readings all bundled together. The data pipeline was robust, the participant experience was polished with things like audio sequencing and progress tracking, and the whole system held up well under real use. It's no longer running, but it was a genuinely complete piece of work and a great learning experience in building something research-grade as a team.
