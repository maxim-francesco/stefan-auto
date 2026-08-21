import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Frown, RefreshCw, Filter, X, RotateCcw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import { fetchPublicListings } from "@/services/api";
import { getAttr, getAttrNumber, getAttrYear } from "@/lib/attributes";
import { InventoryFilters, FilterableCar } from "@/components/InventoryFilters";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const Inventory = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { data: apiResponse, isLoading, isError, refetch } = useQuery({
    queryKey: ['publicListings', 'all'],
    queryFn: () => fetchPublicListings({ limit: 200 }),
  });

  const allCars = useMemo(() => {
    if (!apiResponse?.data) return [];
    return apiResponse.data.map((car) => {
      const brandVal = getAttr(car.attributeValues, "attr:make", "Marca");
      const modelVal = getAttr(car.attributeValues, "attr:model", "Model");
      const fuelVal = getAttr(car.attributeValues, "attr:fuelType", "Combustibil");
      const transVal = getAttr(car.attributeValues, "attr:gearbox", "Cutie de viteze");
      const bodyVal = getAttr(car.attributeValues, "attr:bodyType", "Caroserie");

      return {
        id: car.id,
        title: car.title,
        image: car.images[0]?.url || "/placeholder.svg",
        brand: (brandVal as string) || null,
        model: (modelVal as string) || "",
        year: getAttrYear(car.attributeValues, "attr:year", "An"),
        km: getAttrNumber(car.attributeValues, "attr:mileage", "Kilometraj"),
        fuel: (fuelVal as string) || null,
        transmission: (transVal as string) || null,
        bodyType: (bodyVal as string) || null,
        price: car.price ?? undefined,
        priceOnRequest: !car.price,
      };
    });
  }, [apiResponse]);

  // Parse active search parameters from URL
  const searchQuery = searchParams.get("search") || "";
  const selectedMakes = useMemo(() => {
    const p = searchParams.get("make");
    return p ? p.split(",") : [];
  }, [searchParams]);

  const selectedFuels = useMemo(() => {
    const p = searchParams.get("fuel");
    return p ? p.split(",") : [];
  }, [searchParams]);

  const selectedGearboxes = useMemo(() => {
    const p = searchParams.get("gearbox");
    return p ? p.split(",") : [];
  }, [searchParams]);

  const selectedBodyTypes = useMemo(() => {
    const p = searchParams.get("bodyType");
    return p ? p.split(",") : [];
  }, [searchParams]);

  const yearMin = searchParams.get("yearMin") ? Number(searchParams.get("yearMin")) : null;
  const yearMax = searchParams.get("yearMax") ? Number(searchParams.get("yearMax")) : null;
  const priceMin = searchParams.get("priceMin") ? Number(searchParams.get("priceMin")) : null;
  const priceMax = searchParams.get("priceMax") ? Number(searchParams.get("priceMax")) : null;
  const kmMin = searchParams.get("kmMin") ? Number(searchParams.get("kmMin")) : null;
  const kmMax = searchParams.get("kmMax") ? Number(searchParams.get("kmMax")) : null;

  // Filter cars client-side following the ABSENCE RULE
  const filteredCars = useMemo(() => {
    return allCars.filter((car) => {
      // Text search
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        const titleMatches = car.title.toLowerCase().includes(q);
        const brandMatches = car.brand ? car.brand.toLowerCase().includes(q) : false;
        const modelMatches = car.model ? car.model.toLowerCase().includes(q) : false;
        if (!titleMatches && !brandMatches && !modelMatches) return false;
      }

      // Marcă (Make)
      if (selectedMakes.length > 0) {
        if (!car.brand || !selectedMakes.includes(car.brand)) return false;
      }

      // Combustibil (Fuel)
      if (selectedFuels.length > 0) {
        if (!car.fuel || !selectedFuels.includes(car.fuel)) return false;
      }

      // Cutie de viteze (Gearbox)
      if (selectedGearboxes.length > 0) {
        if (!car.transmission || !selectedGearboxes.includes(car.transmission)) return false;
      }

      // Caroserie (BodyType)
      if (selectedBodyTypes.length > 0) {
        if (!car.bodyType || !selectedBodyTypes.includes(car.bodyType)) return false;
      }

      // Year Range
      if (yearMin !== null && !isNaN(yearMin)) {
        if (car.year === null || car.year === undefined || car.year < yearMin) return false;
      }
      if (yearMax !== null && !isNaN(yearMax)) {
        if (car.year === null || car.year === undefined || car.year > yearMax) return false;
      }

      // Price Range
      if (priceMin !== null && !isNaN(priceMin)) {
        if (car.price === null || car.price === undefined || car.price < priceMin) return false;
      }
      if (priceMax !== null && !isNaN(priceMax)) {
        if (car.price === null || car.price === undefined || car.price > priceMax) return false;
      }

      // Kilometrage Range
      if (kmMin !== null && !isNaN(kmMin)) {
        if (car.km === null || car.km === undefined || car.km < kmMin) return false;
      }
      if (kmMax !== null && !isNaN(kmMax)) {
        if (car.km === null || car.km === undefined || car.km > kmMax) return false;
      }

      return true;
    });
  }, [
    allCars,
    searchQuery,
    selectedMakes,
    selectedFuels,
    selectedGearboxes,
    selectedBodyTypes,
    yearMin,
    yearMax,
    priceMin,
    priceMax,
    kmMin,
    kmMax,
  ]);

  // Helpers for active pills
  const removeParamValue = (key: string, valueToRemove: string) => {
    const currentParam = searchParams.get(key);
    if (!currentParam) return;
    const values = currentParam.split(",").filter((v) => v !== valueToRemove);
    const newParams = new URLSearchParams(searchParams);
    if (values.length > 0) {
      newParams.set(key, values.join(","));
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams, { replace: true });
  };

  const removeParamKey = (key: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(key);
    setSearchParams(newParams, { replace: true });
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  // Count active filter conditions
  const activeFiltersCount =
    (searchQuery ? 1 : 0) +
    selectedMakes.length +
    selectedFuels.length +
    selectedGearboxes.length +
    selectedBodyTypes.length +
    (yearMin !== null ? 1 : 0) +
    (yearMax !== null ? 1 : 0) +
    (priceMin !== null ? 1 : 0) +
    (priceMax !== null ? 1 : 0) +
    (kmMin !== null ? 1 : 0) +
    (kmMax !== null ? 1 : 0);

  // Active filter descriptions for empty state
  const activeFilterLabels = useMemo(() => {
    const labels: string[] = [];
    if (searchQuery) labels.push(`Căutare: "${searchQuery}"`);
    if (selectedMakes.length > 0) labels.push(`Marcă: ${selectedMakes.join(", ")}`);
    if (selectedFuels.length > 0) labels.push(`Combustibil: ${selectedFuels.join(", ")}`);
    if (selectedGearboxes.length > 0) labels.push(`Cutie: ${selectedGearboxes.join(", ")}`);
    if (selectedBodyTypes.length > 0) labels.push(`Caroserie: ${selectedBodyTypes.join(", ")}`);
    if (yearMin !== null) labels.push(`An min: ${yearMin}`);
    if (yearMax !== null) labels.push(`An max: ${yearMax}`);
    if (priceMin !== null) labels.push(`Preț min: ${priceMin} €`);
    if (priceMax !== null) labels.push(`Preț max: ${priceMax} €`);
    if (kmMin !== null) labels.push(`Km min: ${kmMin}`);
    if (kmMax !== null) labels.push(`Km max: ${kmMax}`);
    return labels;
  }, [
    searchQuery,
    selectedMakes,
    selectedFuels,
    selectedGearboxes,
    selectedBodyTypes,
    yearMin,
    yearMax,
    priceMin,
    priceMax,
    kmMin,
    kmMax,
  ]);

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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 glass rounded-2xl">
          <h2 className="font-display text-xl text-destructive-foreground mb-2">Ceva nu a funcționat</h2>
          <p className="text-muted-foreground mb-6">A apărut o eroare la încărcarea mașinilor.</p>
          <button onClick={() => refetch()} className="btn-luxury-filled flex items-center justify-center gap-2 mx-auto min-h-[44px]">
            <RefreshCw className="w-4 h-4" />
            Încearcă din nou
          </button>
        </motion.div>
      );
    }

    if (allCars.length === 0) {
      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 glass rounded-2xl">
          <Frown className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="font-display text-xl text-foreground mb-2">Niciun vehicul disponibil</h2>
          <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
            Stocul nostru se actualizează constant. Vă rugăm să reveniți mai târziu.
          </p>
        </motion.div>
      );
    }

    if (filteredCars.length === 0) {
      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 glass rounded-2xl p-8">
          <Frown className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="font-display text-xl text-foreground mb-2">Niciun rezultat găsit</h2>
          <p className="text-muted-foreground mb-4 max-w-md mx-auto text-sm">
            Niciun autoturism nu corespunde filtrelor active: <span className="text-foreground font-medium">{activeFilterLabels.join(" • ")}</span>.
          </p>
          <button onClick={clearAllFilters} className="btn-luxury-filled flex items-center justify-center gap-2 mx-auto min-h-[44px]">
            <RotateCcw className="w-4 h-4" />
            Resetează filtrele
          </button>
        </motion.div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredCars.map((car, index) => (
            <motion.div
              key={car.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: (index % 12) * 0.05 }}
              layout
            >
              <CarCard
                id={car.id}
                image={car.image}
                brand={car.brand || "N/A"}
                model={car.model}
                year={car.year || 0}
                km={car.km || 0}
                fuel={car.fuel || "N/A"}
                transmission={car.transmission || "N/A"}
                price={car.price}
                priceOnRequest={car.priceOnRequest}
              />
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <span className="text-primary text-sm tracking-luxury uppercase">Stoc Disponibil</span>
            <h1 className="font-display text-4xl md:text-5xl mt-2 mb-4">
              Descoperă <span className="text-gold-gradient">Colecția Noastră</span>
            </h1>
            <p className="text-muted-foreground max-w-xl">
              Descoperă autoturismele noastre premium, fiecare verificat și oferit cu garanție.
            </p>
          </motion.div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            {/* Left Sidebar / Mobile Filter Trigger */}
            <div className="lg:col-span-1">
              {/* Mobile Filter Button */}
              <div className="lg:hidden mb-6">
                <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                  <SheetTrigger asChild>
                    <button className="btn-luxury w-full flex items-center justify-center gap-2 min-h-[44px]">
                      <Filter className="w-4 h-4 text-primary" />
                      Filtrează Autoturisme {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                    </button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto bg-card border-border p-6 text-foreground">
                    <SheetHeader className="mb-4">
                      <SheetTitle className="text-xl font-display text-foreground">Filtrează Stocul</SheetTitle>
                    </SheetHeader>
                    <InventoryFilters cars={allCars} onCloseMobile={() => setMobileFiltersOpen(false)} idPrefix="mobile" />
                  </SheetContent>
                </Sheet>
              </div>

              {/* Desktop Filters Sidebar */}
              <div className="hidden lg:block sticky top-28 bg-card/60 border border-border/80 rounded-2xl p-5 backdrop-blur-xl">
                <InventoryFilters cars={allCars} idPrefix="desktop" />
              </div>
            </div>

            {/* Right Side: Results & Cards */}
            <div className="lg:col-span-3 space-y-6">
              {/* Top Controls Bar: Ratio Count & Active Pills */}
              {!isLoading && !isError && apiResponse && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4 glass rounded-xl px-5 py-3.5">
                    <p className="text-foreground text-sm font-medium">
                      {filteredCars.length} din {allCars.length} autoturisme
                    </p>

                    {activeFiltersCount > 0 && (
                      <button
                        onClick={clearAllFilters}
                        className="text-xs text-primary hover:text-gold-light flex items-center gap-1.5 font-medium transition-colors min-h-[44px] px-2"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Resetează filtrele
                      </button>
                    )}
                  </div>

                  {/* Active Filter Pills (Requirement 2.6) */}
                  {activeFiltersCount > 0 && (
                    <div className="flex flex-wrap gap-2 items-center pt-1">
                      <span className="text-xs text-muted-foreground mr-1">Filtre active:</span>
                      
                      {searchQuery && (
                        <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 text-xs px-3 py-1.5 rounded-full">
                          Căutare: "{searchQuery}"
                          <button onClick={() => removeParamKey("search")} className="hover:text-foreground p-0.5" aria-label="Șterge căutare">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}

                      {selectedMakes.map((make) => (
                        <span key={`make-${make}`} className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 text-xs px-3 py-1.5 rounded-full">
                          Marcă: {make}
                          <button onClick={() => removeParamValue("make", make)} className="hover:text-foreground p-0.5" aria-label={`Șterge marcă ${make}`}>
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}

                      {selectedFuels.map((fuel) => (
                        <span key={`fuel-${fuel}`} className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 text-xs px-3 py-1.5 rounded-full">
                          Combustibil: {fuel}
                          <button onClick={() => removeParamValue("fuel", fuel)} className="hover:text-foreground p-0.5" aria-label={`Șterge combustibil ${fuel}`}>
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}

                      {selectedGearboxes.map((gear) => (
                        <span key={`gear-${gear}`} className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 text-xs px-3 py-1.5 rounded-full">
                          Cutie: {gear}
                          <button onClick={() => removeParamValue("gearbox", gear)} className="hover:text-foreground p-0.5" aria-label={`Șterge cutie ${gear}`}>
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}

                      {selectedBodyTypes.map((body) => (
                        <span key={`body-${body}`} className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 text-xs px-3 py-1.5 rounded-full">
                          Caroserie: {body}
                          <button onClick={() => removeParamValue("bodyType", body)} className="hover:text-foreground p-0.5" aria-label={`Șterge caroserie ${body}`}>
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}

                      {yearMin !== null && (
                        <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 text-xs px-3 py-1.5 rounded-full">
                          An min: {yearMin}
                          <button onClick={() => removeParamKey("yearMin")} className="hover:text-foreground p-0.5" aria-label="Șterge an minim">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}

                      {yearMax !== null && (
                        <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 text-xs px-3 py-1.5 rounded-full">
                          An max: {yearMax}
                          <button onClick={() => removeParamKey("yearMax")} className="hover:text-foreground p-0.5" aria-label="Șterge an maxim">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}

                      {priceMin !== null && (
                        <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 text-xs px-3 py-1.5 rounded-full">
                          Preț min: {priceMin} €
                          <button onClick={() => removeParamKey("priceMin")} className="hover:text-foreground p-0.5" aria-label="Șterge preț minim">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}

                      {priceMax !== null && (
                        <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 text-xs px-3 py-1.5 rounded-full">
                          Preț max: {priceMax} €
                          <button onClick={() => removeParamKey("priceMax")} className="hover:text-foreground p-0.5" aria-label="Șterge preț maxim">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}

                      {kmMin !== null && (
                        <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 text-xs px-3 py-1.5 rounded-full">
                          Km min: {kmMin}
                          <button onClick={() => removeParamKey("kmMin")} className="hover:text-foreground p-0.5" aria-label="Șterge km minim">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}

                      {kmMax !== null && (
                        <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 text-xs px-3 py-1.5 rounded-full">
                          Km max: {kmMax}
                          <button onClick={() => removeParamKey("kmMax")} className="hover:text-foreground p-0.5" aria-label="Șterge km maxim">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}

              {renderContent()}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Inventory;
