import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

export function mapRange(
  v: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) {
  return outMin + ((outMax - outMin) * (v - inMin)) / (inMax - inMin);
}
