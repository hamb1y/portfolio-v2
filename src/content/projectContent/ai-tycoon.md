---
title: AI Tycoon
description: A single-player Roblox story game wrapped in a tycoon, in development.
technologies:
  - Roblox Studio
  - Luau
  - Game design
  - 3D modeling
  - Aseprite
---

![The forest edge in Roblox Studio: tall trees, grass and sunflowers, a lake, and the city skyline in fog past the trees](/images/projects/ai-tycoon-forest.webp)

A single-player Roblox story game wrapped in a tycoon. The player starts an AI company and builds it up across four acts. Act I ships first as a beta. AI Tycoon is a working title.

## Who does what

I do all the writing (story, dialogue, names, flavor text), the art direction, the pixel art (32×32 icons in Aseprite), all the 3D modeling and world building, and the cutscene direction, and I review everything else. The code side covers the gameplay systems, the UI, the economy math and balancing, saving, the store and tooling.

## How the scope changed

1. **First plan:** a full 3D world, from the original design doc.
2. **Scaled down:** a UI-driven sim. The player sits at a 3D computer on a desk, and the gameplay UI lines up with the monitor. Most of the 3D world was cut.
3. **Scaled back up:** a small open world. I drew a map and found that modeling a world this size in Roblox is manageable. The computer stays the core of the gameplay, and the world around it is walkable.

## The world

The areas are the slums, the suburbs, a commercial strip, the city, a datacenter zone on the city's edge, a polluted lake, and a forested mountain. A snowy mountain feeds a mountain lake, and a river leaves it and winds through open ground to the polluted lake.

The player moves between three bases:

- **First:** in the slums, a rusty pickup truck and a medium trailer. The trailer is home, and the truck is how the player moves.
- **Second:** between the slums and the suburbs.
- **Third:** in the city.

So far the terrain, the mountain and the lakes are in, along with a dense forest edge of grass, sunflowers and rocks, and the city skyline in fog past the trees. I'm now setting up wind sway for the trees.

## Gameplay (designed)

- **Core loop:** buy hardware, hire developers, research, train models, and sell model output through a marketplace app. Power, cooling and network limits affect output. The player at the computer counts as the first developer.
- **Economy:** customer segments each have a quality minimum, a price and a demand cap, so a better model only earns more once it qualifies for a higher segment. Training cost grows faster than quality, with diminishing returns for overtraining. Developer research speeds up early and slows down at scale. Offline progress is capped.
- **Computer UI:** clean, hard-edged 16:9 apps on the monitor (Research, Hardware/Floor Plan, Marketplace, Power, Store), built to scale down to phones.
- **Characters:** all R6. The player can use their own avatar (forced to R6), a noob, or a custom preset.
- **Store:** optional, and opened only by the player. No pop-ups, timers, loot boxes or pay-to-retry, and story content is never sold.

## Process

Everything is built directly in Roblox Studio in plain Luau, with no external toolchain.

Built so far: shared config, catalog and formula modules, a networking helper, basic saving, a working economy loop, a placeholder computer UI, and a helper for the 16:9 screen layout.

Code work on the camera, UI framework, cutscene engine, saving and store is paused partway, and some of it has to be redone for the open world. The order now is: I model the world; then the art direction and writing get settled (the four-act outline, how the world changes across acts, the visual style, the UI palette and fonts, and how Act I begins); then code resumes.
