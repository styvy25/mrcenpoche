
"use client";

// Utility to create a Node class
class Node {
  x: number = 0;
  y: number = 0;
  vx: number = 0;
  vy: number = 0;
}

// Effect class for animated effects
class Effect {
  phase: number;
  offset: number;
  frequency: number;
  amplitude: number;

  constructor(config: { phase?: number, offset?: number, frequency?: number, amplitude?: number } = {}) {
    this.phase = config.phase || 0;
    this.offset = config.offset || 0;
    this.frequency = config.frequency || 0.001;
    this.amplitude = config.amplitude || 1;
  }

  update() {
    this.phase += this.frequency;
    return this.offset + Math.sin(this.phase) * this.amplitude;
  }
}

// Line class for animated lines
class Line {
  spring: number;
  friction: number;
  nodes: Node[];

  constructor(config: { spring?: number } = {}) {
    this.spring = (config.spring || 0.45) + 0.1 * Math.random() - 0.05;
    this.friction = 0.5 + 0.01 * Math.random() - 0.005;
    this.nodes = [];
    
    // Initialize nodes
    for (let i = 0; i < 50; i++) {
      const node = new Node();
      node.x = 0;
      node.y = 0;
      this.nodes.push(node);
    }
  }

  update(pos: { x: number, y: number }) {
    let spring = this.spring;
    let node = this.nodes[0];
    
    // Update first node based on cursor position
    node.vx += (pos.x - node.x) * spring;
    node.vy += (pos.y - node.y) * spring;
    
    // Update remaining nodes
    for (let i = 0, n = this.nodes.length; i < n; i++) {
      node = this.nodes[i];
      
      if (i > 0) {
        const prev = this.nodes[i - 1];
        node.vx += (prev.x - node.x) * spring;
        node.vy += (prev.y - node.y) * spring;
        node.vx += prev.vx * 0.025;
        node.vy += prev.vy * 0.025;
      }
      
      // Apply friction and update position
      node.vx *= this.friction;
      node.vy *= this.friction;
      node.x += node.vx;
      node.y += node.vy;
      
      // Decrease spring tension for smooth trailing effect
      spring *= 0.99;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    let x = this.nodes[0].x;
    let y = this.nodes[0].y;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    
    // Create smooth curves between nodes
    for (let i = 1, n = this.nodes.length - 2; i < n; i++) {
      const a = this.nodes[i];
      const b = this.nodes[i + 1];
      const x = 0.5 * (a.x + b.x);
      const y = 0.5 * (a.y + b.y);
      ctx.quadraticCurveTo(a.x, a.y, x, y);
    }
    
    // Connect to last node
    const a = this.nodes[this.nodes.length - 2];
    const b = this.nodes[this.nodes.length - 1];
    ctx.quadraticCurveTo(a.x, a.y, b.x, b.y);
    
    ctx.stroke();
    ctx.closePath();
  }
}

// Main animation variables
let ctx: CanvasRenderingContext2D | null = null;
let effect: Effect;
let lines: Line[] = [];
let pos = { x: 0, y: 0 };
let running = false;
let animationFrame: number;

// Config parameters
const SETTINGS = {
  friction: 0.5,
  trails: 80,
  size: 50,
  dampening: 0.025,
  tension: 0.99
};

// Handle mouse/touch movement
function handlePointerMove(e: MouseEvent | TouchEvent) {
  if ('touches' in e) {
    pos.x = e.touches[0].clientX;
    pos.y = e.touches[0].clientY;
  } else {
    pos.x = e.clientX;
    pos.y = e.clientY;
  }
  e.preventDefault();
}

// Initialize lines
function initLines() {
  lines = [];
  for (let i = 0; i < SETTINGS.trails; i++) {
    lines.push(new Line({ spring: 0.45 + (i / SETTINGS.trails) * 0.025 }));
  }
}

// Render animation frame
function render() {
  if (!ctx || !running) return;
  
  // Clear canvas with semi-transparent layer for trail effect
  ctx.globalCompositeOperation = "source-over";
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.globalCompositeOperation = "lighter";
  
  // Set line style with dynamic color based on effect
  const hue = Math.round(effect.update());
  ctx.strokeStyle = `hsla(${hue},100%,50%,0.025)`;
  ctx.lineWidth = 10;
  
  // Update and draw all lines
  for (let i = 0; i < SETTINGS.trails; i++) {
    const line = lines[i];
    line.update(pos);
    line.draw(ctx);
  }
  
  // Continue animation loop
  animationFrame = window.requestAnimationFrame(render);
}

// Resize canvas to match window
function resizeCanvas() {
  if (!ctx) return;
  
  const canvas = ctx.canvas;
  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerHeight;
}

// Initialize canvas animation
export function renderCanvas() {
  // Find canvas element
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  if (!canvas) return;
  
  // Setup context
  ctx = canvas.getContext("2d");
  if (!ctx) return;
  
  running = true;
  
  // Initialize effect with random phase
  effect = new Effect({
    phase: Math.random() * 2 * Math.PI,
    amplitude: 85,
    frequency: 0.0015,
    offset: 285
  });
  
  // Set initial position to center of screen
  pos.x = window.innerWidth / 2;
  pos.y = window.innerHeight / 2;
  
  // Add event listeners
  document.addEventListener("mousemove", handlePointerMove);
  document.addEventListener("touchmove", handlePointerMove, { passive: false });
  document.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
      pos.x = e.touches[0].clientX;
      pos.y = e.touches[0].clientY;
    }
  }, { passive: true });
  
  // Handle window events
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("focus", () => {
    if (!running) {
      running = true;
      render();
    }
  });
  window.addEventListener("blur", () => {
    running = false;
    cancelAnimationFrame(animationFrame);
  });
  
  // Initialize canvas and start animation
  resizeCanvas();
  initLines();
  render();
}

// Cleanup function to remove event listeners (useful for React cleanup)
export function cleanupCanvas() {
  running = false;
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }
  document.removeEventListener("mousemove", handlePointerMove);
  document.removeEventListener("touchmove", handlePointerMove);
}
