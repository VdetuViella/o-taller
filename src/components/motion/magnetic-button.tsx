"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const FINE_POINTER =
  "(prefers-reduced-motion: no-preference) and (pointer: fine)";

const REACH = 8;

type MagneticButtonProps = {
  children: ReactNode;
};

export function MagneticButton({ children }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(FINE_POINTER, () => {
      const el = ref.current;
      if (!el) return;

      const xTo = gsap.quickTo(el, "x", {
        duration: 0.35,
        ease: "power3.out",
      });
      const yTo = gsap.quickTo(el, "y", {
        duration: 0.35,
        ease: "power3.out",
      });

      const onMove = (event: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        const dist = Math.hypot(dx, dy) || 1;
        const reach = Math.min(REACH, dist);
        xTo((dx / dist) * reach);
        yTo((dy / dist) * reach);
      };

      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);

      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    });
  }, { scope: ref });

  return (
    <div ref={ref} className="inline-block">
      {children}
    </div>
  );
}
