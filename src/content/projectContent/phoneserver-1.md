---
title: Converting my Grandmother's Old, Broken phone into a server
description: How I converted my grandmother's old and broken phone into a (almost) fully functioning server.
technologies:
  - Web
  - Linux
  - Bash
  - Android
  - Server/Administration
link: https://project1.com
---

## NOTE: This project is defunct. After further testing, the setup proved unstable. Due to hardware constraints and a lack of root access, it is inherently unsuitable for production workloads like Docker or binding to port 443. While rooting the phone is an option, the hardware limitations remain. For serious use cases, dedicating a small budget (around $100 USD / ~10k INR) to a proper ARM homeserver is highly recommended.

# Converting my Grandmother's Old, Broken phone into a server

Around January of 2025, I gifted my grandmother a new phone because her old one was laggy and its touchscreen was broken. However, the internal hardware still worked perfectly fine, so I decided to convert it into a Linux server using Termux. Termux (not to be confused with the terminal multiplexer tmux) is a powerful terminal emulator built for Android that allows you to run Linux tools like Nginx and Node.js directly through the CLI. Here is how I converted my grandmother's old phone into a web server:

![Image of me connecting to the phone through ssh](/phoneserver-1.png)
 - Step 1: First, I factory reset the phone and cleaned the storage as much as I could. I then installed the F-Droid store to download Shizuku, Canta, and Termux. I started Shizuku by enabling developer mode and sending the ADB command from my computer. With Shizuku access granted, I used Canta to remove most of the heavy Samsung bloatware. Finally, I opened Termux, installed dropbear, and wrote a quick script to execute `dropbear -p 43000`. This allowed me to SSH into the phone from my laptop, making it much easier to configure and run.
 - Step 2: After connecting through ssh, I installed python, nodejs, git, nginx, neovim and figlet using the command `pkg update && pkg upgrade && pkg install python nodejs nvim git figlet nginx` (pkg is termux's package manager, based on apt). Then, I installed pnpm which is more disk and memory efficient using the command `npm install pnpm@latest --global`, which allowed me to use the pnpm command locally.
 - Step 3: After installing all the dependencies, I had 3 uses for the phoneserver.
    1. Host an FTP Server with some files
    2. Host 2 static astro.js sites
    3. Host the dynamic JNVCKM Site v2
 - Step 4: to do this, for the first one I asked Grok AI to build me a python webserver, then added some css to it and made a start script. To host the two astro.js sites, I did `cd && git clone https://github.com/hamb1y/portfolio && git clone https://github.com/hamb1y/orangesmp-website` to get both of these sites onto my server. Then I did `cd ~/portfolio && pnpm install && pnpm run astro build && pnpm run astro preview --host` to first go into the portfolio root directory, then install all the dependencies, then build the site, then run the site to test that it did in fact work. I did the same for both of the astro.js sites. Then, I made a startup script for both of those, which looks like this:
    1. Portfolio:

     `
        pkg update -y;
        pkg upgrade -y;
        pkg install git nodejs -y;
        npm install pnpm@latest --global;
        rm -rf ~/portfolio;
        git clone https://github.com/hamb1y/portfolio.git;
        cd ~/portfolio;
        pnpm install;
        pnpm run astro build;
        figlet "Server Started!";
        pnpm run astro preview --host;
     `
     
     2. OrangeSMP Website:

     `
        pkg update -y;
        pkg upgrade -y;
        pkg install git nodejs -y;
        npm install pnpm@latest --global;
        rm -rf ~/orangesmp-website;
        git clone https://github.com/hamb1y/orangesmp-website.git;
        cd ~/orangesmp-website;
        pnpm install;
        pnpm run astro build;
        figlet "Server Started!";
        pnpm run astro preview --host;
     `

 However, there are a few caveats which I found out later which made this almost uselss:
  - There's no root access, which makes everything much harder and different
  - It only support arm64 linux programs. While it's better than windows, many programs can't be used because of this.
  - **!IMPORTANT!** - Due to no root access, it becomes very difficult to port forward from here to the outside internet or a domain name. This made this phone almost entirely useless, and I had to find this out the hard way later.
