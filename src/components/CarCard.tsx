import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Fuel, Gauge, Calendar, Settings2 } from "lucide-react";
import { useRef } from "react";

interface CarCardProps {
  image: string;
  brand: string;
  model: string;
  year: number;
  km: number;
  fuel: string;
  transmission: string;
  price?: number;
  priceOnRequest?: boolean;
  financing?: boolean;
  index?: number;
}

const CarCard = ({
  image,
  brand,
  model,
  year,
  km,
  fuel,
  transmission,
  price,
  priceOnRequest,
  financing,
  index = 0,
}: CarCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["2deg", "-2deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-2deg", "2deg"]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="card-luxury group cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative img-zoom aspect-[16/10]">
        <img
          src={image}
          alt={`${brand} ${model}`}
          className="w-full h-full object-cover"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {priceOnRequest && (
            <span className="bg-primary/95 text-primary-foreground text-xs px-3 py-1.5 rounded-sm font-medium tracking-wide">
              Preț la Cerere
            </span>
          )}
          {financing && (
            <span className="glass text-xs px-3 py-1.5 rounded-sm tracking-wide">
              Finanțare Disponibilă
            </span>
          )}
        </div>

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-primary/10 blur-3xl" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5" style={{ transform: "translateZ(20px)" }}>
        {/* Title */}
        <h3 className="font-display text-xl mb-1">
          {brand} <span className="text-primary">{model}</span>
        </h3>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-3 mt-4 mb-5">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary/70" strokeWidth={1.5} />
            <span className="text-sm">{year}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Gauge className="w-4 h-4 text-primary/70" strokeWidth={1.5} />
            <span className="text-sm">{km.toLocaleString()} km</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Fuel className="w-4 h-4 text-primary/70" strokeWidth={1.5} />
            <span className="text-sm">{fuel}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Settings2 className="w-4 h-4 text-primary/70" strokeWidth={1.5} />
            <span className="text-sm">{transmission}</span>
          </div>
        </div>

        {/* Price */}
        <div className="pt-4 border-t border-primary/10 flex items-center justify-between">
          {price ? (
            <span className="font-display text-2xl text-gold-gradient">
              {price.toLocaleString()} €
            </span>
          ) : (
            <span className="text-muted-foreground text-sm">Preț la cerere</span>
          )}
          <button className="text-primary text-sm font-medium hover:text-gold-light transition-colors group/btn flex items-center gap-1">
            Detalii 
            <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;
