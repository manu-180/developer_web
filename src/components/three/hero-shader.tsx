"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec2  uMouse;

  vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec2 mod289(vec2 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec3 permute(vec3 x){ return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
          + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0),
                            dot(x12.xy, x12.xy),
                            dot(x12.zw, x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p){
    float v = 0.0;
    float a = 0.5;
    for(int i=0;i<4;i++){
      v += a * snoise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  vec3 pal(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
  }

  void main(){
    vec2 uv = vUv;
    vec2 p = uv - 0.5;
    p.x *= uResolution.x / uResolution.y;

    vec2 m = (uMouse - 0.5) * 0.3;
    float t = uTime * 0.08;

    vec2 q = vec2(
      fbm(p * 1.6 + vec2(0.0, t) + m),
      fbm(p * 1.6 + vec2(5.2, 1.3 - t) + m)
    );
    vec2 r = vec2(
      fbm(p * 1.6 + 4.0 * q + vec2(1.7, 9.2) + t),
      fbm(p * 1.6 + 4.0 * q + vec2(8.3, 2.8) - t)
    );
    float n = fbm(p * 1.4 + 4.0 * r);

    vec3 base = vec3(0.039, 0.039, 0.043);
    vec3 mid  = vec3(0.07, 0.07, 0.08);

    float thread = smoothstep(0.55, 0.85, n);
    vec3 lime = vec3(0.78, 1.0, 0.0);
    vec3 col = mix(base, mid, smoothstep(-0.4, 0.8, n));
    col = mix(col, lime * 0.55, thread * 0.18);

    float vert = smoothstep(0.0, 1.0, uv.y);
    col *= mix(0.7, 1.05, vert);

    float g = (fract(sin(dot(uv*uResolution.xy, vec2(12.9898,78.233))) * 43758.5453) - 0.5);
    col += g * 0.02;

    float vig = smoothstep(1.1, 0.4, length(p));
    col *= mix(0.6, 1.0, vig);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function FullScreenShader({ paused }: { paused: boolean }) {
  const mouseRef = useRef<[number, number]>([0.5, 0.5]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    []
  );

  useFrame(({ clock, size, pointer }) => {
    if (paused) return;
    uniforms.uTime.value = clock.getElapsedTime();
    uniforms.uResolution.value.set(size.width, size.height);
    const mx = (pointer.x + 1) / 2;
    const my = (pointer.y + 1) / 2;
    mouseRef.current[0] += (mx - mouseRef.current[0]) * 0.06;
    mouseRef.current[1] += (my - mouseRef.current[1]) * 0.06;
    uniforms.uMouse.value.set(mouseRef.current[0], mouseRef.current[1]);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

const CSS_FALLBACK =
  "radial-gradient(75% 60% at 30% 20%, rgba(200,255,0,0.10) 0%, transparent 60%)," +
  "radial-gradient(60% 80% at 80% 70%, rgba(154,183,255,0.06) 0%, transparent 60%)," +
  "linear-gradient(180deg, #0a0a0b 0%, #0c0c0e 100%)";

export function HeroShader() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [paused, setPaused] = useState(false);
  const [dpr, setDpr] = useState<[number, number]>([1, 1.4]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Adaptive DPR cap based on device pixel ratio + viewport
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    setDpr(isMobile ? [1, 1] : [1, 1.6]);
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = wrapperRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setPaused(!e.isIntersecting);
      },
      { rootMargin: "0px", threshold: 0 }
    );
    io.observe(el);

    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [enabled]);

  return (
    <div
      ref={wrapperRef}
      className="absolute inset-0 -z-10"
      style={{ background: CSS_FALLBACK }}
      aria-hidden
    >
      {enabled && (
        <Canvas
          dpr={dpr}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: false,
          }}
          camera={{ position: [0, 0, 1] }}
          frameloop={paused ? "never" : "always"}
        >
          <FullScreenShader paused={paused} />
        </Canvas>
      )}
    </div>
  );
}
