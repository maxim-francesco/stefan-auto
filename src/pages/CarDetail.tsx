import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Loader2,
  AlertTriangle,
  ChevronLeft,
  Calendar,
  Gauge,
  Fuel,
  Settings2,
  Phone,
  MessageCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchPublicListingById, ApiCar } from "@/services/api";

const getAttribute = (car: ApiCar, attributeName: string): string | number | boolean | null => {
  const attr = car.attributeValues.find(
    (a) => a.attribute.name.toLowerCase() === attributeName.toLowerCase()
  );
  if (!attr) return null;
  return attr.stringValue ?? attr.numberValue ?? attr.booleanValue;
};

const CarDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: car, isLoading, isError } = useQuery({
    queryKey: ["listing", id],
    queryFn: () => fetchPublicListingById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (isError || !car) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-center px-4">
        <div>
          <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="font-display text-2xl text-destructive-foreground mb-2">Eroare la încărcare</h2>
          <p className="text-muted-foreground mb-6">
            Nu am putut încărca detaliile pentru acest autoturism.
          </p>
          <Link to="/stoc" className="btn-luxury-filled">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Înapoi la Stoc
          </Link>
        </div>
      </div>
    );
  }

  const mainImage = car.images?.[0]?.url || "https://placehold.co/1200x800?text=Imagine+Indisponibilă";

  const carDetails = {
    year: getAttribute(car, 'an'),
    mileage: getAttribute(car, 'kilometraj'),
    fuel: getAttribute(car, 'combustibil'),
    transmission: getAttribute(car, 'cutie de viteze'),
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Back button */}
            <Link
              to="/stoc"
              className="inline-flex items-center gap-2 text-primary hover:text-gold-light transition-colors mb-6 group"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Înapoi la stoc</span>
            </Link>

            {/* Title */}
            <h1 className="font-display text-4xl md:text-5xl mt-2 mb-4">
              {car.title}
            </h1>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8 mt-8">
              {/* Left Column - Gallery & Description */}
              <div className="lg:col-span-2">
                {/* Main Image */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden glass mb-8">
                  <img src={mainImage} alt={car.title} className="w-full h-full object-cover" />
                </div>
                
                {/* Description */}
                <h2 className="font-display text-2xl mb-4 text-gold-gradient">Descriere</h2>
                <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
                  <p>{car.description}</p>
                </div>
              </div>

              {/* Right Column - Details & CTA */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 glass rounded-2xl p-6">
                  <h2 className="font-display text-2xl mb-4">Detalii Vehicul</h2>
                  
                  {car.price ? (
                    <p className="font-display text-4xl text-gold-gradient mb-6">
                      {car.price.toLocaleString('ro-RO', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 })}
                    </p>
                  ) : (
                    <p className="bg-primary/10 text-primary px-4 py-2 rounded-lg mb-6">
                      Preț la cerere
                    </p>
                  )}

                  {/* Specs */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary/70" />
                      <div>
                        <p className="text-xs text-muted-foreground">An</p>
                        <p className="text-sm font-medium">{carDetails.year || 'N/A'}</p>
                      </div>
                    </div>
                     <div className="flex items-center gap-3">
                      <Gauge className="w-5 h-5 text-primary/70" />
                      <div>
                        <p className="text-xs text-muted-foreground">Kilometraj</p>
                        <p className="text-sm font-medium">{carDetails.mileage ? `${Number(carDetails.mileage).toLocaleString()} km` : 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Fuel className="w-5 h-5 text-primary/70" />
                      <div>
                        <p className="text-xs text-muted-foreground">Combustibil</p>
                        <p className="text-sm font-medium">{carDetails.fuel || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Settings2 className="w-5 h-5 text-primary/70" />
                      <div>
                        <p className="text-xs text-muted-foreground">Transmisie</p>
                        <p className="text-sm font-medium">{carDetails.transmission || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border pt-6 flex flex-col gap-3">
                     <a
                        href="tel:0731758666"
                        className="btn-luxury-filled w-full flex items-center justify-center gap-2 py-3"
                      >
                        <Phone className="w-4 h-4" />
                        Sună Acum
                      </a>
                      <a
                        href="https://wa.me/40731758666"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-luxury w-full flex items-center justify-center gap-2 py-3"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Contactează pe WhatsApp
                      </a>
                  </div>

                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CarDetail;
