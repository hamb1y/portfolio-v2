---
title: Running Artificial Intelligence models locally on my laptop
description: How I ran powerful Artificial Intelligence models locally on my computer.
technologies:
  - Artificial Intelligence
  - Server/Administration
  - Bash
  - Ollama
  - Python
link: ''
---

# Running Artificial Intelligence models locally on my laptop:
So, here's how I ran artificial intelligence models locally on my laptop. I wanted to see if I could have chatGPT with me even when I was offline. So I decided to research into running AI models locally on my computer. I found out that if your laptop/computer has a discrete GPU (My laptop does have one, though it is less powerful), you could easily run small Artificial Intelligence models locally on your computer. So, I decided to do just that and found an easy way to run models on your local computer, a CLI (Command Line Interface) tool called Ollama.
![An image of the Ollama Models page, which lists many downloadable AI models.](__/localai-ollamahome.png__)
- Step 1: I downloaded and installed Ollama on my linux laptop using the command `curl -fsSL https://ollama.com/install.sh | sh`. During installation, the script automatically enabled the Ollama daemon to start on startup, and configured a dual setup with my Nvidia GPU, AMD integrated GPU and octa-core AMD CPU.
- Step 2: I pulled my first model using `ollama run llama3.2`, which downloaded the model and dropped me straight into an interactive chat session in the terminal. I was pretty impressed that it just worked out of the box, and that Ollama automatically handled offloading layers to the GPU where it could.
- Step 3: I explored the Ollama model library and tried out a few different models. I tried out some coding-focused models like `qwen2.5-coder` and also smaller, faster general purpose models. The key thing I learned here is that model size matters a lot, bigger models are smarter but slower, and on a laptop with limited VRAM you have to find the right balance.

# Results and Thoughts:
Overall, the experience was much better than I expected. Smaller models like llama3.2 and qwen2.5-coder ran reasonably well on my hardware, and having a local AI that works completely offline is genuinely useful. The responses aren't as good as something like ChatGPT or Claude, but for basic coding help, summarization, or just experimenting, it works surprisingly well.

One thing worth noting is that Ollama also exposes a local REST API on `http://localhost:11434`, which means you can build your own tools and scripts on top of it. I wrote a small Python script to query it programmatically, which opens up a lot of possibilities for automation.

The main limitations are what you'd expect from running on a laptop, larger, smarter models are too slow or simply won't fit in VRAM, and the fan does spin up quite a bit under load. But for what it is, running a fully local, private AI model on your own hardware for free is pretty cool.