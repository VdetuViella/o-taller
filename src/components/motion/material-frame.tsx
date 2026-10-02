"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export function MaterialFrame() {
  const frameRef = useRef<HTMLDivElement>(null);
  const stillRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      gsap.to(stillRef.current, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: frameRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }, { scope: frameRef });

  return (
    <div
      ref={frameRef}
      className="relative aspect-square w-full overflow-hidden md:aspect-[16/9] md:max-h-[720px]"
    >
      <div ref={stillRef} className="absolute -top-[8%] left-0 h-[116%] w-full">
        <Image
          src="/pinceles.jpg"
          alt="Botes de pinceles manchados de pintura."
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
