export interface StarfieldOptions {
  starCount?: number;
  parallaxIntensity?: number;
  starColor?: string;
  layerCount?: number;
}

export interface Star {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  layer: Layer;
  speed: number;
  dirX: number;
  dirY: number;
}

export interface Layer {
  depth: number;
  sizeRange: [number, number];
  speedRange: [number, number];
  percentage: number;
}

export class Starfield {
  private ctx: CanvasRenderingContext2D;
  private stars: Star[] = [];
  private mouseX = 0;
  private mouseY = 0;
  private cssWidth!: number;
  private cssHeight!: number;
  private parallaxIntensity!: number;
  private starColor!: string;
  private layers!: Layer[];
  private dpr!: number;
  private padding = 0.4;
  private parallaxFactor = 0.08;
  private valid = true;
  private lastTime = 0;

  constructor(canvas: HTMLCanvasElement, options: StarfieldOptions = {}) {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Canvas context not supported');
    }
    this.ctx = ctx;
    
    // Guard against server-side rendering
    if (typeof window === 'undefined' || canvas.clientWidth === 0 || canvas.clientHeight === 0) {
      this.valid = false;
      return;
    }
    
    this.dpr = window.devicePixelRatio;
    this.cssWidth = canvas.clientWidth;
    this.cssHeight = canvas.clientHeight;
    canvas.width = this.cssWidth * this.dpr;
    canvas.height = this.cssHeight * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
    
    this.parallaxIntensity = options.parallaxIntensity ?? 1.0;
    this.starColor = options.starColor ?? '#FFFFFF';
    
    // Create 3 layers with increasing depth
    this.layers = [
      { depth: 0.2, sizeRange: [0.3, 0.6], speedRange: [0.1, 0.3], percentage: 0.4 }, // Distant
      { depth: 0.5, sizeRange: [0.6, 1.2], speedRange: [0.3, 0.6], percentage: 0.4 }, // Mid
      { depth: 0.8, sizeRange: [1.0, 2.0], speedRange: [0.6, 1.0], percentage: 0.2 }, // Close
    ];
    
    this.lastTime = performance.now();
    
    const starCount = options.starCount ?? 250;
    this.initStars(starCount);
  }

  private initStars(count: number) {
    this.stars = [];
    
    // Calculate star distribution across layers
    let remaining = count;
    for (let i = 0; i < this.layers.length; i++) {
      const layer = this.layers[i];
      const layerCount = i === this.layers.length - 1 
        ? remaining 
        : Math.floor(count * layer.percentage);
      
       for (let j = 0; j < layerCount; j++) {
         const paddedWidth = this.cssWidth * (1 + 2 * this.padding);
         const paddedHeight = this.cssHeight * (1 + 2 * this.padding);
         const offsetX = this.padding * this.cssWidth;
         const offsetY = this.padding * this.cssHeight;
         const x = Math.random() * paddedWidth - offsetX;
         const y = Math.random() * paddedHeight - offsetY;
         const size = this.randomBetween(...layer.sizeRange);
          const speed = this.randomBetween(...layer.speedRange);
          const angle = Math.random() * Math.PI * 2;
          const dirX = Math.cos(angle);
          const dirY = Math.sin(angle);
        
        this.stars.push({
          x,
          y,
          baseX: x,
          baseY: y,
          size,
          layer,
          speed,
          dirX,
          dirY,
        });
      }
      remaining -= layerCount;
    }
  }

  private randomBetween(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  updateMouse(x: number, y: number) {
    // Convert 0-1 range to -1 to 1 range and apply parallax intensity
    this.mouseX = (x * 2 - 1) * this.parallaxIntensity;
    this.mouseY = (y * 2 - 1) * this.parallaxIntensity;
  }

  draw() {
    if (!this.valid) return;
    
    // Calculate delta time for smooth movement
    const now = performance.now();
    const deltaTime = this.lastTime === 0 ? 0 : (now - this.lastTime) / 1000;
    this.lastTime = now;
    
    // Clear with transparency (using CSS pixel dimensions)
    this.ctx.clearRect(0, 0, this.cssWidth, this.cssHeight);
    
    // Draw each star with parallax offset
    this.ctx.fillStyle = this.starColor;
    
    for (const star of this.stars) {
      // Update star position based on direction and speed (subtle movement)
      const moveSpeed = star.speed * 7; // Subtle movement scale
      star.baseX += star.dirX * moveSpeed * deltaTime;
      star.baseY += star.dirY * moveSpeed * deltaTime;
      
      // Wrap stars around screen edges with padding
      const paddedWidth = this.cssWidth * (1 + 2 * this.padding);
      const paddedHeight = this.cssHeight * (1 + 2 * this.padding);
      const offsetX = this.padding * this.cssWidth;
      const offsetY = this.padding * this.cssHeight;
      
      if (star.baseX < -offsetX) star.baseX += paddedWidth;
      if (star.baseX > this.cssWidth + offsetX) star.baseX -= paddedWidth;
      if (star.baseY < -offsetY) star.baseY += paddedHeight;
      if (star.baseY > this.cssHeight + offsetY) star.baseY -= paddedHeight;
      
      // Calculate parallax offset based on layer depth and screen size
      const maxShiftX = this.cssWidth * this.parallaxFactor;
      const maxShiftY = this.cssHeight * this.parallaxFactor;
      const parallaxX = this.mouseX * star.layer.depth * maxShiftX;
      const parallaxY = this.mouseY * star.layer.depth * maxShiftY;
      
      // Apply parallax to base position
      const x = star.baseX + parallaxX;
      const y = star.baseY + parallaxY;
      
      // Draw star
      this.ctx.beginPath();
      this.ctx.arc(x, y, star.size, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  resize() {
    if (!this.valid) return;
    const canvas = this.ctx.canvas as HTMLCanvasElement;
    this.dpr = window.devicePixelRatio;
    this.cssWidth = canvas.clientWidth;
    this.cssHeight = canvas.clientHeight;
    canvas.width = this.cssWidth * this.dpr;
    canvas.height = this.cssHeight * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
    
    // Reinitialize stars for new dimensions
    this.initStars(this.stars.length);
  }
}