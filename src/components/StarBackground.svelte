<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { Starfield } from '../lib/starfield';

  export let starCount = 500;
  export let parallaxIntensity = 1.0;
  export let starColor = '#FFFFFF';

  let canvas: HTMLCanvasElement;
  let starfield: Starfield | null = null;
  let animationFrameId: number | null = null;
  
  // Mouse position normalized to window coordinates (0 to 1)
  let mouse = { x: 0.5, y: 0.5 };

  const handleMouseMove = (event: MouseEvent) => {
    mouse.x = event.clientX / window.innerWidth;
    mouse.y = event.clientY / window.innerHeight;
  };

  const handleMouseLeave = () => {
    // Keep last mouse position when leaving window
    // Optionally reset to center: mouse.x = 0.5; mouse.y = 0.5;
  };

  const handleResize = () => {
    if (starfield) {
      starfield.resize();
    }
  };

  const animate = () => {
    if (starfield) {
      // Update starfield with current mouse position
      starfield.updateMouse(mouse.x, mouse.y);
      starfield.draw();
    }
    animationFrameId = requestAnimationFrame(animate);
  };

  onMount(() => {
    console.log('StarBackground mounted');
    console.log('Canvas element:', canvas);
    console.log('Canvas dimensions:', canvas?.clientWidth, 'x', canvas?.clientHeight);
    
    try {
      starfield = new Starfield(canvas, {
        starCount,
        parallaxIntensity,
        starColor,
      });
      console.log('Starfield created successfully');
    } catch (error) {
      console.error('Error creating Starfield:', error);
      return;
    }

    // Ensure proper sizing after layout
    requestAnimationFrame(() => {
      console.log('Resizing starfield');
      starfield?.resize();
    });

    // Start animation loop
    animate();

    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Initial draw
    starfield.draw();
    console.log('Initial draw complete');
  });

  onDestroy(() => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseleave', handleMouseLeave);
    
    window.removeEventListener('resize', handleResize);
  });
</script>

  <div class="starfield-container">
    <!-- Linear gradient background -->
    <div class="gradient"></div>
    
    <!-- Canvas overlay for stars -->
    <canvas
      bind:this={canvas}
      aria-hidden="true"
      class="canvas"
    ></canvas>
  </div>

<style>
  .starfield-container {
    position: fixed;
    inset: 0;
    z-index: -1;
    overflow: visible;
    margin: 0;
    padding: 0;
    max-width: none;
  }

  .gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      #000000 0%,
      #0a0a0f 50%,
      #000000 100%
    );
    margin: 0;
    padding: 0;
    max-width: none;
  }

  .canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    display: block;
    margin: 0;
    padding: 0;
    max-width: none;
  }
</style>