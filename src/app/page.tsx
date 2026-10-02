import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plazaHref = "mailto:estudio@nereita.art";

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
          Nereita
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
        <section className="grid min-h-[calc(100dvh-4.5rem)] grid-cols-1 grid-rows-[auto_minmax(12rem,1fr)] md:grid-cols-2 md:grid-rows-1">
          <div className="flex flex-col justify-start px-4 py-8 md:justify-center md:px-8">
            <h1 className="font-display text-[2.5rem] uppercase leading-[0.9] tracking-[-0.05em] md:text-6xl lg:text-7xl">
              Pintura y arte
            </h1>
            <p className="mt-6 max-w-[65ch] text-base leading-relaxed">
              Nereita es una academia presencial. Se pinta, se dibuja y se
              discute el trabajo en el taller.
            </p>
            <div className="mt-8">
              <PedirPlaza />
            </div>
          </div>
          <div className="relative min-h-48 border-t border-black md:min-h-0 md:border-t-0 md:border-l">
            <Image
              src="/galeria.jpg"
              alt="Sala de una galería con cuadros de colores en la pared."
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </section>

        <section id="taller" className="border-t border-black px-4 py-24 md:px-8">
          <div className="mx-auto max-w-[1400px]">
            <h2 className="font-display text-5xl uppercase leading-[0.9] tracking-[-0.05em] md:text-7xl">
              Qué se trabaja
            </h2>
            <p className="mt-8 max-w-[65ch] text-base leading-relaxed">
              Pintura al óleo, dibujo del natural, color y grabado. Cada
              práctica tiene su mesa y su horario.
            </p>
            <ul className="mt-16 flex flex-col gap-6">
              {practicas.map((nombre) => (
                <li key={nombre}>
                  <h3 className="font-display text-4xl uppercase leading-[0.9] tracking-[-0.05em] md:text-6xl">
                    {nombre}
                  </h3>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-t border-black">
          <div className="relative aspect-square w-full md:aspect-[16/9] md:max-h-[720px]">
            <Image
              src="/pinceles.jpg"
              alt="Botes de pinceles manchados de pintura."
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
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
            <h2 className="max-w-[10ch] font-display text-5xl uppercase leading-[0.9] tracking-[-0.05em] md:text-7xl">
              Tres tardes
            </h2>
            <p className="mt-8 max-w-[65ch] text-base leading-relaxed">
              Lunes y miércoles, de 17:00 a 20:00, con modelo. Sábado, de 10:00
              a 13:00, color y papel.
            </p>
          </div>
        </section>

        <section id="plaza" className="border-t border-black px-4 py-24 md:px-8">
          <div className="mx-auto grid max-w-[1400px] items-end gap-8 md:grid-cols-2">
            <h2 className="font-display text-5xl uppercase leading-[0.9] tracking-[-0.05em] md:text-7xl">
              Una tarde de prueba
            </h2>
            <div className="flex flex-col items-start gap-8">
              <p className="max-w-[65ch] text-base leading-relaxed">
                Vienes una tarde, ves el taller y decides después. Escribe y te
                respondemos con el día.
              </p>
              <PedirPlaza />
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-black px-4 py-8 md:px-8">
        <p className="mx-auto max-w-[1400px] text-base leading-relaxed">
          Nereita, academia de pintura y arte.
        </p>
      </footer>
    </>
  );
}
