import equipment from "@/assets/equipment.png";
import cardioRoom from "@/assets/cardio-room.png";
import barbell from "@/assets/gallery-barbell.jpg";
import dumbbells from "@/assets/gallery-dumbbells.jpg";
import ropes from "@/assets/gallery-ropes.jpg";
import changingRoom from "@/assets/changing-room.png";
import washroom from "@/assets/washroom.png";
import heroImg from "@/assets/hero.jpg";
import { SafeImage } from "@/components/ui/safe-image";

export function Gallery() {
  const tiles = [
    {
      src: equipment,
      alt: "Strength training equipment",
      cls: "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto",
    },
    { src: cardioRoom, alt: "Cardio training room", cls: "aspect-square" },
    { src: barbell, alt: "Chalked grip on barbell", cls: "aspect-square" },
    { src: dumbbells, alt: "Dumbbell rack", cls: "aspect-square md:col-span-2" },
    { src: ropes, alt: "Battle rope training", cls: "aspect-square" },
    { src: changingRoom, alt: "Changing room area", cls: "aspect-square" },
    { src: washroom, alt: "SAUNA ROOM", cls: "aspect-square" },
  ];

  return (
    <section id="gallery" className="py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="reveal section-label mb-6">Inside the Club</div>
            <h2 className="reveal font-display text-5xl sm:text-6xl uppercase leading-[0.95]">
              Step <span className="text-metal">inside.</span>
            </h2>
          </div>
          <p className="reveal max-w-md text-muted-foreground">
            A look at our equipment, training floors and member facilities.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[minmax(180px,auto)] gap-3">
          {tiles.map((t, i) => (
            <div key={i} className={`reveal relative overflow-hidden rounded-lg group ${t.cls}`}>
              <SafeImage
                src={t.src}
                alt={t.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-1200 ease-out group-hover:scale-110"
                fallbackSrc={heroImg}
              />
              <div className="absolute inset-0 bg-linear-to-t from-background/70 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="font-display text-xs tracking-[0.3em] uppercase text-silver">
                  {t.alt}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
