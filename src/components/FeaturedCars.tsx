import { motion } from "framer-motion";
import { useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CarCard from "./CarCard";
import { fetchPublicListings, ApiCar } from "@/services/api";


// Helper function to find a specific attribute value
const getAttribute = (car: ApiCar, attributeName: string): string | number | null => {
  const attr = car.attributeValues.find(
    (a) => a.attribute.name.toLowerCase() === attributeName.toLowerCase()
  );
  if (!attr) return null;
  return attr.stringValue ?? attr.numberValue;
};


const FeaturedCars = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: apiResponse, isLoading, isError } = useQuery({
    queryKey: ['publicListings'],
    queryFn: () => fetchPublicListings({ limit: 5 }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const featuredCars = (apiResponse?.data || []).map(car => ({
    id: car.id,
    image: car.images[0]?.url || "https://placehold.co/800x600?text=Imagine+Indisponibilă",
    brand: getAttribute(car, "marca") as string || 'N/A',
    model: getAttribute(car, "model") as string || car.title.split(' ').slice(1).join(' '),
    year: getAttribute(car, "an") as number || 0,
    km: getAttribute(car, "kilometraj") as number || 0,
    fuel: getAttribute(car, "combustibil") as string || 'N/A',
    transmission: getAttribute(car, "cutie de viteze") as string || 'N/A',
    price: car.price ?? undefined,
    priceOnRequest: !car.price,
    financing: true,
  }));

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-96">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
      );
    }

    if (isError) {
      return (
        <div className="text-center h-96 flex flex-col justify-center">
          <p className="text-destructive-foreground text-lg">Nu am putut încărca mașinile.</p>
          <p className="text-muted-foreground mt-2">Vă rugăm să reveniți mai târziu.</p>
        </div>
      );
    }
    
    if (featuredCars.length === 0) {
        return (
             <div className="text-center h-96 flex flex-col justify-center">
                <p className="text-muted-foreground text-lg">Nu există mașini în stoc momentan.</p>
            </div>
        )
    }

    return (
       <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 fade-mask-x"
          >
            {featuredCars.map((car, index) => (
              <div key={car.id || index} className="flex-shrink-0 w-[340px]">
                <CarCard {...car} index={index} />
              </div>
            ))}
          </div>
        </div>
    )
  }

  return (
    <section className="section-padding bg-navy-light relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(220_35%_6%/0.8)_0%,transparent_60%)]" />
      
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-primary text-sm tracking-luxury uppercase"
            >
              Selecție Premium
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-display text-3xl md:text-4xl mt-3"
            >
              Colecția <span className="text-gold-gradient">Noastră</span>
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 mt-6 md:mt-0"
          >
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full border border-primary/20 hover:border-primary hover:bg-primary/10 hover:text-primary transition-all duration-300 flex items-center justify-center touch-feedback"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full border border-primary/20 hover:border-primary hover:bg-primary/10 hover:text-primary transition-all duration-300 flex items-center justify-center touch-feedback"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </motion.div>
        </motion.div>

        {/* Cars Horizontal Scroll */}
        {renderContent()}

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 text-center"
        >
          <Link
            to="/stoc"
            className="inline-flex items-center gap-2 text-primary hover:text-gold-light transition-colors group"
          >
            <span className="tracking-wide">Vezi toate autoturismele</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" strokeWidth={1.5} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
