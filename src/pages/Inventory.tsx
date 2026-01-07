import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, ChevronDown, Search, Loader2, Frown, RefreshCw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import { fetchPublicListings, ApiCar } from "@/services/api";
import { Link } from "react-router-dom";

// Helper function to find a specific attribute value
const getAttribute = (car: ApiCar, attributeName: string): string | number | null => {
  const attr = car.attributeValues.find(
    (a) => a.attribute.name.toLowerCase() === attributeName.toLowerCase()
  );
  if (!attr) return null;
  return attr.stringValue ?? attr.numberValue;
};


const Inventory = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("Toate");
  const [selectedFuel, setSelectedFuel] = useState("Toate");
  const [selectedTransmission, setSelectedTransmission] = useState("Toate");
  const [searchQuery, setSearchQuery] = useState("");

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
      financing: true, // Assuming all can be financed for now
    }));
  }, [apiResponse]);

  const filteredCars = useMemo(() => {
    return allCars.filter((car) => {
      const matchesBrand = selectedBrand === "Toate" || car.brand === selectedBrand;
      const matchesFuel = selectedFuel === "Toate" || car.fuel === selectedFuel;
      const matchesTransmission = selectedTransmission === "Toate" || car.transmission === selectedTransmission;
      const matchesSearch = searchQuery === "" || 
        `${car.brand} ${car.model}`.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesBrand && matchesFuel && matchesTransmission && matchesSearch;
    });
  }, [allCars, selectedBrand, selectedFuel, selectedTransmission, searchQuery]);

  // Dynamically generate filter options from the available cars
  const brands = useMemo(() => ["Toate", ...Array.from(new Set(allCars.map(car => car.brand).filter(Boolean)))], [allCars]);
  const fuels = useMemo(() => ["Toate", ...Array.from(new Set(allCars.map(car => car.fuel).filter(Boolean)))], [allCars]);
  const transmissions = useMemo(() => ["Toate", ...Array.from(new Set(allCars.map(car => car.transmission).filter(Boolean)))], [allCars]);


  const FilterButton = ({ options, selected, onSelect, label }: {
    options: string[];
    selected: string;
    onSelect: (value: string) => void;
    label: string;
  }) => (
    <div className="space-y-2">
      <label className="text-sm text-muted-foreground">{label}</label>
      <div className="relative">
        <select
          value={selected}
          onChange={(e) => onSelect(e.target.value)}
          className="w-full bg-navy-lighter border border-border rounded-lg px-4 py-3 text-sm appearance-none cursor-pointer hover:border-primary/50 transition-colors"
        >
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  );

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
          <h3 className="font-display text-xl text-destructive-foreground mb-2">Ceva nu a funcționat</h3>
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

    if (filteredCars.length === 0) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 glass rounded-2xl"
        >
          <Frown className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="font-display text-xl text-foreground mb-2">Niciun vehicul disponibil</h3>
          <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
            Nu am găsit autoturisme care să corespundă criteriilor tale.
            Contactează-ne pentru o ofertă personalizată.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                setSelectedBrand("Toate");
                setSelectedFuel("Toate");
                setSelectedTransmission("Toate");
                setSearchQuery("");
              }}
              className="btn-luxury flex items-center justify-center gap-2"
            >
              Resetează filtrele
            </button>
            <Link
              to="/servicii"
              className="btn-luxury-filled flex items-center justify-center gap-2"
            >
              Mașini la Comandă
            </Link>
          </div>
        </motion.div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredCars.map((car, index) => (
            <motion.div
              key={car.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: (index % 9) * 0.05 }}
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
              Colecția <span className="text-gold-gradient">Auto</span>
            </h1>
            <p className="text-muted-foreground max-w-xl">
              Descoperă autoturismele noastre premium, fiecare verificat și oferit cu garanție.
            </p>
          </motion.div>

          {/* Search & Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col lg:flex-row gap-4 mb-8"
          >
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Caută marca sau modelul..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-navy-lighter border border-border rounded-lg pl-12 pr-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            {/* Desktop Filters */}
            <div className="hidden lg:flex gap-4">
              <FilterButton
                options={brands}
                selected={selectedBrand}
                onSelect={setSelectedBrand}
                label="Marca"
              />
              <FilterButton
                options={fuels}
                selected={selectedFuel}
                onSelect={setSelectedFuel}
                label="Combustibil"
              />
              <FilterButton
                options={transmissions}
                selected={selectedTransmission}
                onSelect={setSelectedTransmission}
                label="Transmisie"
              />
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden btn-luxury flex items-center justify-center gap-2 py-3"
            >
              <Filter className="w-4 h-4" />
              Filtrează
            </button>
          </motion.div>

          {/* Active Filters */}
          {!isLoading && (selectedBrand !== "Toate" || selectedFuel !== "Toate" || selectedTransmission !== "Toate") && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {selectedBrand !== "Toate" && (
                <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
                  {selectedBrand}
                  <button onClick={() => setSelectedBrand("Toate")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedFuel !== "Toate" && (
                <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
                  {selectedFuel}
                  <button onClick={() => setSelectedFuel("Toate")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedTransmission !== "Toate" && (
                <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
                  {selectedTransmission}
                  <button onClick={() => setSelectedTransmission("Toate")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </motion.div>
          )}

          {/* Results Count */}
          {!isLoading && !isError && apiResponse && (
             <p className="text-muted-foreground text-sm mb-8">
              {filteredCars.length} {filteredCars.length === 1 ? "autoturism găsit" : "autoturisme găsite"}
            </p>
          )}

          {renderContent()}
        </div>
      </main>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed bottom-0 left-0 right-0 bg-navy-light border-t border-border rounded-t-3xl z-50 p-6 lg:hidden max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl">Filtre</h3>
                <button onClick={() => setIsFilterOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <FilterButton
                  options={brands}
                  selected={selectedBrand}
                  onSelect={setSelectedBrand}
                  label="Marca"
                />
                <FilterButton
                  options={fuels}
                  selected={selectedFuel}
                  onSelect={setSelectedFuel}
                  label="Combustibil"
                />
                <FilterButton
                  options={transmissions}
                  selected={selectedTransmission}
                  onSelect={setSelectedTransmission}
                  label="Transmisie"
                />
              </div>

              <button
                onClick={() => setIsFilterOpen(false)}
                className="btn-luxury-filled w-full mt-8 py-4"
              >
                Vezi {filteredCars.length} rezultate
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Inventory;
