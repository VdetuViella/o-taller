"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MagneticButton } from "@/components/motion/magnetic-button";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MOTION_OK = "(prefers-reduced-motion: no-preference)";
const FINE_POINTER =
  "(prefers-reduced-motion: no-preference) and (pointer: fine)";

const SHIFT = 16;
const TILT = 4;

type HeroStillProps = {
  title: string;
  lede: string;
  cta: ReactNode;
};

export function HeroStill({ title, lede, cta }: HeroStillProps) {
  const root = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ledeRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const scrubRef = useRef<HTMLDivElement>(null);
  const stillRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap.from([titleRef.current, ledeRef.current, ctaRef.current], {
          y: 24,
          autoAlpha: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
        });

        gsap.to(copyRef.current, {
          y: -56,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(scrubRef.current, {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      mm.add(FINE_POINTER, () => {
        const frame = frameRef.current;
        const still = stillRef.current;
        if (!frame || !still) return;

        const tilt = { x: 0, y: 0, rx: 0, ry: 0 };
        const paint = () => {
          still.style.transform = `translate3d(${tilt.x}px, ${tilt.y}px, 0) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`;
        };
        const quick = () => ({
          duration: 0.45,
          ease: "power3.out",
          onUpdate: paint,
        });
        const xTo = gsap.quickTo(tilt, "x", quick());
        const yTo = gsap.quickTo(tilt, "y", quick());
        const rxTo = gsap.quickTo(tilt, "rx", quick());
        const ryTo = gsap.quickTo(tilt, "ry", quick());

        const onMove = (event: PointerEvent) => {
          const rect = frame.getBoundingClientRect();
          const nx = (event.clientX - rect.left) / rect.width - 0.5;
          const ny = (event.clientY - rect.top) / rect.height - 0.5;
          xTo(gsap.utils.clamp(-SHIFT, SHIFT, nx * SHIFT * 2));
          yTo(gsap.utils.clamp(-SHIFT, SHIFT, ny * SHIFT * 2));
          ryTo(nx * TILT * 2);
          rxTo(-ny * TILT * 2);
        };

        const onLeave = () => {
          xTo(0);
          yTo(0);
          rxTo(0);
          ryTo(0);
        };

        frame.addEventListener("pointermove", onMove);
        frame.addEventListener("pointerleave", onLeave);

        return () => {
          frame.removeEventListener("pointermove", onMove);
          frame.removeEventListener("pointerleave", onLeave);
        };
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="grid min-h-[calc(100dvh-4.5rem)] grid-cols-1 grid-rows-[auto_minmax(12rem,1fr)] md:grid-cols-2 md:grid-rows-1"
    >
      <div
        ref={copyRef}
        className="flex flex-col justify-start px-4 py-8 will-change-transform md:justify-center md:px-8"
      >
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
        <div className="absolute inset-0 [perspective:1200px]">
          <div ref={scrubRef} className="absolute -inset-10 will-change-transform">
            <div
              ref={stillRef}
              className="absolute inset-0 [transform-style:preserve-3d] will-change-transform"
            >
              <Image
                src="/galeria.jpg"
                alt="Sala de una galería con cuadros de colores en la pared."
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
