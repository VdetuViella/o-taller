"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MOTION_OK = "(prefers-reduced-motion: no-preference)";
const FINE_POINTER =
  "(prefers-reduced-motion: no-preference) and (pointer: fine)";

const SHIFT = 16;
const TILT = 4;

export function MaterialFrame() {
  const frameRef = useRef<HTMLDivElement>(null);
  const scrubRef = useRef<HTMLDivElement>(null);
  const stillRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap.to(scrubRef.current, {
          yPercent: -14,
          ease: "none",
          scrollTrigger: {
            trigger: frameRef.current,
            start: "top bottom",
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
    { scope: frameRef },
  );

  return (
    <div
      ref={frameRef}
      className="relative aspect-square w-full overflow-hidden md:aspect-[16/9] md:max-h-[720px]"
    >
      <div className="absolute inset-0 [perspective:1200px]">
        <div
          ref={scrubRef}
          className="absolute -top-[14%] left-0 h-[128%] w-full will-change-transform"
        >
          <div
            ref={stillRef}
            className="absolute inset-0 [transform-style:preserve-3d] will-change-transform"
          >
            <Image
              src="/pinceles.jpg"
              alt="Botes de pinceles manchados de pintura."
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
