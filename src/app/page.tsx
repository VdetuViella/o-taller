import { Button } from "@/components/ui/button";
import { HeroStill } from "@/components/motion/hero-still";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { MaterialFrame } from "@/components/motion/material-frame";
import { PracticeList } from "@/components/motion/practice-list";
import { RevealHeading } from "@/components/motion/reveal-heading";
import { cn } from "@/lib/utils";

const plazaHref = "mailto:estudio@otaller.art";

const practicas = [
  "Pintura al óleo",
  "Dibujo del natural",
  "Teoría del color",
  "Grabado",
] as const;

function PedirPlaza({ className }: { className?: string }) {
  return (
    <Button
      nativeButton={false}
      render={<a href={plazaHref} />}
      size="lg"
      className={cn(
        "h-12 px-6 text-base focus-visible:ring-black",
        className,
      )}
    >
      Pedir plaza
    </Button>
  );
}

export default function Home() {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-background focus:px-4 focus:py-2 focus:outline focus:outline-2 focus:outline-black"
      >
        Saltar al contenido
      </a>
      <div className="h-2 bg-primary" aria-hidden="true" />
      <header className="flex h-16 items-center justify-between gap-4 border-b border-black px-4 md:px-8">
        <a
          href="#contenido"
          className="font-display text-lg uppercase leading-none tracking-[-0.05em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
        >
          O Taller
        </a>
        <nav className="flex items-center gap-4 md:gap-6" aria-label="Secciones">
          <a
            href="#taller"
            className="text-sm whitespace-nowrap underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black md:text-base"
          >
            Taller
          </a>
          <PedirPlaza className="h-10 px-3 text-sm md:h-12 md:px-6 md:text-base" />
        </nav>
      </header>
      <main id="contenido">
        <HeroStill
          title="Pintura y arte"
          lede="O Taller es una academia presencial. Se pinta, se dibuja y se discute el trabajo en el taller."
          cta={<PedirPlaza />}
        />

        <section id="taller" className="border-t border-black px-4 py-24 md:px-8">
          <div className="mx-auto max-w-[1400px]">
            <h2 className="font-display text-5xl uppercase leading-[0.9] tracking-[-0.05em] md:text-7xl">
              Qué se trabaja
            </h2>
            <p className="mt-8 max-w-[65ch] text-base leading-relaxed">
              Pintura al óleo, dibujo del natural, color y grabado. Cada
              práctica tiene su mesa y su horario.
            </p>
            <PracticeList names={practicas} />
          </div>
        </section>

        <section className="border-t border-black">
          <MaterialFrame />
          <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24">
            <h2 className="font-display text-5xl uppercase leading-[0.9] tracking-[-0.05em] md:text-7xl">
              Material de clase
            </h2>
            <p className="mt-8 max-w-[65ch] text-base leading-relaxed">
              Los pinceles y la pintura están en el taller. El caballete
              también.
            </p>
          </div>
        </section>

        <section className="border-t border-black px-4 py-24 md:px-8">
          <div className="mx-auto max-w-[1400px]">
            <RevealHeading className="max-w-[10ch] font-display text-5xl uppercase leading-[0.9] tracking-[-0.05em] md:text-7xl">
              Tres tardes
            </RevealHeading>
            <p className="mt-8 max-w-[65ch] text-base leading-relaxed">
              Lunes y miércoles, de 17:00 a 20:00, con modelo. Sábado, de 10:00
              a 13:00, color y papel.
            </p>
          </div>
        </section>

        <section id="plaza" className="border-t border-black px-4 py-24 md:px-8">
          <div className="mx-auto grid max-w-[1400px] items-end gap-8 md:grid-cols-2">
            <RevealHeading className="font-display text-5xl uppercase leading-[0.9] tracking-[-0.05em] md:text-7xl">
              Una tarde de prueba
            </RevealHeading>
            <div className="flex flex-col items-start gap-8">
              <p className="max-w-[65ch] text-base leading-relaxed">
                Vienes una tarde, ves el taller y decides después. Escribe y te
                respondemos con el día.
              </p>
              <MagneticButton>
                <PedirPlaza />
              </MagneticButton>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-black px-4 py-8 md:px-8">
        <p className="mx-auto max-w-[1400px] text-base leading-relaxed">
          O Taller, academia de pintura y arte.
        </p>
      </footer>
    </>
  );
}
