"use client";

import { useEffect, useRef } from "react";

const MATRIX_CHARS = "01アイウエオαβγλμσ0123456789<>/{[]}=+*#";
const NODE_COLORS = ["#0d9488", "#0f766e", "#e11d48", "#ea580c"];

type Node = {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  color: string;
};

function hexAlpha(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function HeroNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const count = reduced ? 42 : 96;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seedNodes = () => {
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 380 + 80,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        vz: (Math.random() - 0.5) * 0.4,
        color: NODE_COLORS[i % NODE_COLORS.length],
      }));
    };

    const project = (node: Node) => {
      const parallaxX = (mouse.current.x - 0.5) * 72;
      const parallaxY = (mouse.current.y - 0.5) * 48;
      const focal = 480;
      const scale = focal / (focal + node.z);
      return {
        sx: width / 2 + (node.x - width / 2 + parallaxX) * scale,
        sy: height / 2 + (node.y - height / 2 + parallaxY) * scale,
        scale,
        radius: 1.4 + scale * 2.8,
      };
    };

    const onMove = (event: MouseEvent) => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      mouse.current.x = (event.clientX - rect.left) / rect.width;
      mouse.current.y = (event.clientY - rect.top) / rect.height;
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      const projected = nodes
        .map((node) => ({ node, ...project(node) }))
        .sort((a, b) => a.scale - b.scale);

      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i];
          const b = projected[j];
          const dist = Math.hypot(a.sx - b.sx, a.sy - b.sy);
          const maxDist = 150;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.22 * Math.min(a.scale, b.scale);
            ctx.strokeStyle = `rgba(13, 148, 136, ${alpha})`;
            ctx.lineWidth = 0.65;
            ctx.beginPath();
            ctx.moveTo(a.sx, a.sy);
            ctx.lineTo(b.sx, b.sy);
            ctx.stroke();
          }
        }
      }

      for (const { node, sx, sy, scale, radius } of projected) {
        const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, radius * 5);
        glow.addColorStop(0, hexAlpha(node.color, 0.55 * scale));
        glow.addColorStop(1, hexAlpha(node.color, 0));
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(sx, sy, radius * 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fillStyle = hexAlpha(node.color, 0.65 + scale * 0.35);
        ctx.fill();
      }

      if (!reduced) {
        for (const node of nodes) {
          node.x += node.vx;
          node.y += node.vy;
          node.z += node.vz;
          if (node.x < width * 0.04 || node.x > width * 0.96) node.vx *= -1;
          if (node.y < height * 0.04 || node.y > height * 0.96) node.vy *= -1;
          if (node.z < 60 || node.z > 460) node.vz *= -1;
        }
      }

      frame = requestAnimationFrame(tick);
    };

    const onResize = () => {
      resize();
      seedNodes();
    };

    resize();
    seedNodes();
    tick();
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-network-canvas" aria-hidden />;
}

function HeroMatrixColumns() {
  const columns = useRef(
    Array.from({ length: 22 }, (_, i) => ({
      id: i,
      delay: `${(i * 0.28) % 5}s`,
      duration: `${5 + (i % 6)}s`,
      chars: Array.from({ length: 32 }, () => MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]).join("\n"),
    }))
  );

  return (
    <div className="hero-matrix" aria-hidden>
      {columns.current.map((col) => (
        <span
          key={col.id}
          className="hero-matrix-col"
          style={{ animationDelay: col.delay, animationDuration: col.duration }}
        >
          {col.chars}
        </span>
      ))}
    </div>
  );
}

export function HeroScene() {
  return (
    <div className="hero-scene" aria-hidden>
      <div className="hero-scene-base" />
      <div className="hero-scene-glow" />
      <HeroMatrixColumns />
      <HeroNetworkCanvas />
      <div className="hero-scene-vignette" />
    </div>
  );
}
