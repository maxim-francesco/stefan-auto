import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Frown, RefreshCw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import { fetchPublicListings, ApiCar } from "@/services/api";

// Helper function to find a specific attribute value
const getAttribute = (car: ApiCar, attributeName: string): string | number | null => {
  const attr = car.attributeValues.find(
    (a) => a.attribute.name.toLowerCase() === attributeName.toLowerCase()
  );
  if (!attr) return null;
  return attr.stringValue ?? attr.numberValue;
};


const Inventory = () => {
  const { data: apiResponse, isLoading, isError, refetch } = useQuery({
    queryKey: ['publicListings', 'all'],
    queryFn: () => fetchPublicListings(),
  });

  const allCars = useMemo(() => {
    if (!apiResponse?.data) return [];
    return apiResponse.data.map(car => ({
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
    }));
  }, [apiResponse]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
      );
    }
  
    if (isError) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 glass rounded-2xl"
        >
          <h2 className="font-display text-xl text-destructive-foreground mb-2">Ceva nu a funcționat</h2>
          <p className="text-muted-foreground mb-6">A apărut o eroare la încărcarea mașinilor.</p>
          <button
            onClick={() => refetch()}
            className="btn-luxury-filled flex items-center justify-center gap-2 mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            Încearcă din nou
          </button>
        </motion.div>
      );
    }

    if (allCars.length === 0) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 glass rounded-2xl"
        >
          <Frown className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="font-display text-xl text-foreground mb-2">Niciun vehicul disponibil</h2>
          <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
            Stocul nostru se actualizează constant. Vă rugăm să reveniți mai târziu.
          </p>
        </motion.div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {allCars.map((car, index) => (
            <motion.div
              key={car.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: (index % 12) * 0.05 }}
              layout
            >
              <CarCard {...car} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  };


  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <span className="text-primary text-sm tracking-luxury uppercase">
              Stoc Disponibil
            </span>
            <h1 className="font-display text-4xl md:text-5xl mt-2 mb-4">
              Descoperă <span className="text-gold-gradient">Colecția Noastră</span>
            </h1>
            <p className="text-muted-foreground max-w-xl">
              Descoperă autoturismele noastre premium, fiecare verificat și oferit cu garanție.
            </p>
          </motion.div>

          {/* Results Count */}
          {!isLoading && !isError && apiResponse && (
             <p className="text-muted-foreground text-sm mb-8">
              {allCars.length} {allCars.length === 1 ? "autoturism găsit" : "autoturisme găsite"}
            </p>
          )}

          {renderContent()}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Inventory;
