"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MagneticButton } from "@/components/motion/magnetic-button";

gsap.registerPlugin(useGSAP);

const MOTION_OK = "(prefers-reduced-motion: no-preference)";
const FINE_POINTER =
  "(prefers-reduced-motion: no-preference) and (pointer: fine)";

const SHIFT = 16;

type HeroStillProps = {
  title: string;
  lede: string;
  cta: ReactNode;
};

export function HeroStill({ title, lede, cta }: HeroStillProps) {
  const root = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ledeRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const stillRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      gsap.from([titleRef.current, ledeRef.current, ctaRef.current], {
        y: 24,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
      });
    });

    mm.add(FINE_POINTER, () => {
      const frame = frameRef.current;
      const still = stillRef.current;
      const label = labelRef.current;
      if (!frame || !still || !label) return;

      gsap.set(label, { autoAlpha: 0 });

      const xTo = gsap.quickTo(still, "x", {
        duration: 0.45,
        ease: "power3.out",
      });
      const yTo = gsap.quickTo(still, "y", {
        duration: 0.45,
        ease: "power3.out",
      });
      const labelX = gsap.quickTo(label, "x", {
        duration: 0.2,
        ease: "power3.out",
      });
      const labelY = gsap.quickTo(label, "y", {
        duration: 0.2,
        ease: "power3.out",
      });

      let labelVisible = false;

      const onMove = (event: PointerEvent) => {
        const rect = frame.getBoundingClientRect();
        const nx = (event.clientX - rect.left) / rect.width - 0.5;
        const ny = (event.clientY - rect.top) / rect.height - 0.5;
        xTo(gsap.utils.clamp(-SHIFT, SHIFT, nx * SHIFT * 2));
        yTo(gsap.utils.clamp(-SHIFT, SHIFT, ny * SHIFT * 2));

        const lx = gsap.utils.clamp(
          8,
          Math.max(8, rect.width - 96),
          event.clientX - rect.left + 12,
        );
        const ly = gsap.utils.clamp(
          8,
          Math.max(8, rect.height - 24),
          event.clientY - rect.top - 28,
        );
        labelX(lx);
        labelY(ly);

        if (!labelVisible) {
          labelVisible = true;
          gsap.killTweensOf(label, "autoAlpha");
          gsap.set(label, { autoAlpha: 1 });
        }
      };

      const onLeave = () => {
        labelVisible = false;
        xTo(0);
        yTo(0);
        gsap.to(label, { autoAlpha: 0, duration: 0.2, overwrite: "auto" });
      };

      frame.addEventListener("pointermove", onMove);
      frame.addEventListener("pointerleave", onLeave);

      return () => {
        frame.removeEventListener("pointermove", onMove);
        frame.removeEventListener("pointerleave", onLeave);
      };
    });
  }, { scope: root });

  return (
    <section
      ref={root}
      className="grid min-h-[calc(100dvh-4.5rem)] grid-cols-1 grid-rows-[auto_minmax(12rem,1fr)] md:grid-cols-2 md:grid-rows-1"
    >
      <div className="flex flex-col justify-start px-4 py-8 md:justify-center md:px-8">
        <h1
          ref={titleRef}
          className="font-display text-[2.5rem] uppercase leading-[0.9] tracking-[-0.05em] md:text-6xl lg:text-7xl"
        >
          {title}
        </h1>
        <p
          ref={ledeRef}
          className="mt-6 max-w-[65ch] text-base leading-relaxed"
        >
          {lede}
        </p>
        <div ref={ctaRef} className="mt-8">
          <MagneticButton>{cta}</MagneticButton>
        </div>
      </div>
      <div
        ref={frameRef}
        className="relative min-h-48 overflow-hidden border-t border-black md:min-h-0 md:border-t-0 md:border-l"
      >
        <div ref={stillRef} className="absolute -inset-6">
          <Image
            src="/galeria.jpg"
            alt="Sala de una galería con cuadros de colores en la pared."
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <span
          ref={labelRef}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 text-sm text-black opacity-0 select-none"
        >
          bodegón
        </span>
      </div>
    </section>
  );
}
