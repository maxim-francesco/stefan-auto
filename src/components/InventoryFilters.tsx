import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X, RotateCcw, ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export interface FilterableCar {
  id: string;
  title: string;
  brand: string | null;
  model: string | null;
  year: number | null;
  km: number | null;
  fuel: string | null;
  transmission: string | null;
  bodyType: string | null;
  price: number | undefined;
}

interface InventoryFiltersProps {
  cars: FilterableCar[];
  onCloseMobile?: () => void;
  idPrefix?: string;
}

export const InventoryFilters = ({ cars, onCloseMobile, idPrefix = "filter" }: InventoryFiltersProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Collapsible state for filter sections
  const [makesOpen, setMakesOpen] = useState(true);
  const [fuelsOpen, setFuelsOpen] = useState(true);
  const [gearboxesOpen, setGearboxesOpen] = useState(true);
  const [bodyTypesOpen, setBodyTypesOpen] = useState(true);
  const [rangesOpen, setRangesOpen] = useState(true);

  // Parse active query parameters
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

  const yearMinParam = searchParams.get("yearMin") || "";
  const yearMaxParam = searchParams.get("yearMax") || "";
  const priceMinParam = searchParams.get("priceMin") || "";
  const priceMaxParam = searchParams.get("priceMax") || "";
  const kmMinParam = searchParams.get("kmMin") || "";
  const kmMaxParam = searchParams.get("kmMax") || "";

  // Calculate categorical options and counts derived from FULL fetched stock
  const makeOptions = useMemo(() => {
    const counts = new Map<string, number>();
    cars.forEach((car) => {
      if (car.brand) {
        counts.set(car.brand, (counts.get(car.brand) || 0) + 1);
      }
    });
    return Array.from(counts.entries())
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value));
  }, [cars]);

  const fuelOptions = useMemo(() => {
    const counts = new Map<string, number>();
    cars.forEach((car) => {
      if (car.fuel) {
        counts.set(car.fuel, (counts.get(car.fuel) || 0) + 1);
      }
    });
    return Array.from(counts.entries())
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value));
  }, [cars]);

  const gearboxOptions = useMemo(() => {
    const counts = new Map<string, number>();
    cars.forEach((car) => {
      if (car.transmission) {
        counts.set(car.transmission, (counts.get(car.transmission) || 0) + 1);
      }
    });
    return Array.from(counts.entries())
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value));
  }, [cars]);

  const bodyTypeOptions = useMemo(() => {
    const counts = new Map<string, number>();
    cars.forEach((car) => {
      if (car.bodyType) {
        counts.set(car.bodyType, (counts.get(car.bodyType) || 0) + 1);
      }
    });
    return Array.from(counts.entries())
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value));
  }, [cars]);

  // Derived min/max for placeholders
  const derivedRanges = useMemo(() => {
    let minYear = Infinity, maxYear = -Infinity;
    let minPrice = Infinity, maxPrice = -Infinity;
    let minKm = Infinity, maxKm = -Infinity;

    cars.forEach((car) => {
      if (car.year !== null && car.year !== undefined) {
        if (car.year < minYear) minYear = car.year;
        if (car.year > maxYear) maxYear = car.year;
      }
      if (car.price !== null && car.price !== undefined) {
        if (car.price < minPrice) minPrice = car.price;
        if (car.price > maxPrice) maxPrice = car.price;
      }
      if (car.km !== null && car.km !== undefined) {
        if (car.km < minKm) minKm = car.km;
        if (car.km > maxKm) maxKm = car.km;
      }
    });

    return {
      minYear: minYear === Infinity ? 2000 : minYear,
      maxYear: maxYear === -Infinity ? 2026 : maxYear,
      minPrice: minPrice === Infinity ? 0 : minPrice,
      maxPrice: maxPrice === -Infinity ? 100000 : maxPrice,
      minKm: minKm === Infinity ? 0 : minKm,
      maxKm: maxKm === -Infinity ? 500000 : maxKm,
    };
  }, [cars]);

  // URL update helpers
  const updateParam = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (value !== null && value !== undefined && value.trim() !== "") {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams, { replace: true });
  };

  const toggleMultiSelect = (key: string, currentSelected: string[], valueToToggle: string) => {
    const updated = currentSelected.includes(valueToToggle)
      ? currentSelected.filter((v) => v !== valueToToggle)
      : [...currentSelected, valueToToggle];
    updateParam(key, updated.length > 0 ? updated.join(",") : null);
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  const isAnyFilterActive =
    searchQuery !== "" ||
    selectedMakes.length > 0 ||
    selectedFuels.length > 0 ||
    selectedGearboxes.length > 0 ||
    selectedBodyTypes.length > 0 ||
    yearMinParam !== "" ||
    yearMaxParam !== "" ||
    priceMinParam !== "" ||
    priceMaxParam !== "" ||
    kmMinParam !== "" ||
    kmMaxParam !== "";

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="space-y-2">
        <label htmlFor={`${idPrefix}-search-input`} className="text-xs uppercase tracking-luxury text-primary font-medium">
          Căutare după nume
        </label>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id={`${idPrefix}-search-input`}
            type="text"
            placeholder="Caută mașină (ex: Dacia, Audi...)"
            value={searchQuery}
            onChange={(e) => updateParam("search", e.target.value)}
            className="input-luxury pl-10 pr-9 min-h-[44px]"
          />
          {searchQuery && (
            <button
              onClick={() => updateParam("search", null)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground min-h-[44px] flex items-center justify-center"
              aria-label="Șterge căutarea"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Clear All Button */}
      {isAnyFilterActive && (
        <button
          onClick={clearAllFilters}
          className="btn-luxury w-full flex items-center justify-center gap-2 py-2.5 text-xs min-h-[44px]"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Resetează filtrele
        </button>
      )}

      {/* Marcă Facet */}
      <div className="border border-border/60 rounded-xl p-4 bg-card/50">
        <button
          onClick={() => setMakesOpen(!makesOpen)}
          className="w-full flex items-center justify-between font-display text-sm text-foreground mb-2 min-h-[44px]"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-primary" />
            Marcă
          </span>
          {makesOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </button>
        {makesOpen && (
          <div className="space-y-1 mt-3">
            {makeOptions.map((option) => (
              <label
                key={option.value}
                htmlFor={`${idPrefix}-make-${option.value}`}
                className="flex items-center justify-between gap-3 px-2 py-2 rounded-lg hover:bg-primary/5 cursor-pointer min-h-[44px] transition-colors select-none"
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    id={`${idPrefix}-make-${option.value}`}
                    checked={selectedMakes.includes(option.value)}
                    onCheckedChange={() => toggleMultiSelect("make", selectedMakes, option.value)}
                    className="h-5 w-5 rounded border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                  />
                  <span className="text-sm font-medium">{option.value}</span>
                </div>
                <span className="text-xs text-muted-foreground bg-secondary/60 px-2 py-0.5 rounded-full font-mono">
                  {option.count}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Combustibil Facet */}
      <div className="border border-border/60 rounded-xl p-4 bg-card/50">
        <button
          onClick={() => setFuelsOpen(!fuelsOpen)}
          className="w-full flex items-center justify-between font-display text-sm text-foreground mb-2 min-h-[44px]"
        >
          <span>Combustibil</span>
          {fuelsOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </button>
        {fuelsOpen && (
          <div className="space-y-1 mt-3">
            {fuelOptions.map((option) => (
              <label
                key={option.value}
                htmlFor={`${idPrefix}-fuel-${option.value}`}
                className="flex items-center justify-between gap-3 px-2 py-2 rounded-lg hover:bg-primary/5 cursor-pointer min-h-[44px] transition-colors select-none"
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    id={`${idPrefix}-fuel-${option.value}`}
                    checked={selectedFuels.includes(option.value)}
                    onCheckedChange={() => toggleMultiSelect("fuel", selectedFuels, option.value)}
                    className="h-5 w-5 rounded border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                  />
                  <span className="text-sm font-medium">{option.value}</span>
                </div>
                <span className="text-xs text-muted-foreground bg-secondary/60 px-2 py-0.5 rounded-full font-mono">
                  {option.count}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Cutie de viteze Facet */}
      <div className="border border-border/60 rounded-xl p-4 bg-card/50">
        <button
          onClick={() => setGearboxesOpen(!gearboxesOpen)}
          className="w-full flex items-center justify-between font-display text-sm text-foreground mb-2 min-h-[44px]"
        >
          <span>Cutie de viteze</span>
          {gearboxesOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </button>
        {gearboxesOpen && (
          <div className="space-y-1 mt-3">
            {gearboxOptions.map((option) => (
              <label
                key={option.value}
                htmlFor={`${idPrefix}-gearbox-${option.value}`}
                className="flex items-center justify-between gap-3 px-2 py-2 rounded-lg hover:bg-primary/5 cursor-pointer min-h-[44px] transition-colors select-none"
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    id={`${idPrefix}-gearbox-${option.value}`}
                    checked={selectedGearboxes.includes(option.value)}
                    onCheckedChange={() => toggleMultiSelect("gearbox", selectedGearboxes, option.value)}
                    className="h-5 w-5 rounded border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                  />
                  <span className="text-sm font-medium">{option.value}</span>
                </div>
                <span className="text-xs text-muted-foreground bg-secondary/60 px-2 py-0.5 rounded-full font-mono">
                  {option.count}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Caroserie Facet */}
      <div className="border border-border/60 rounded-xl p-4 bg-card/50">
        <button
          onClick={() => setBodyTypesOpen(!bodyTypesOpen)}
          className="w-full flex items-center justify-between font-display text-sm text-foreground mb-2 min-h-[44px]"
        >
          <span>Caroserie</span>
          {bodyTypesOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </button>
        {bodyTypesOpen && (
          <div className="space-y-1 mt-3">
            {bodyTypeOptions.map((option) => (
              <label
                key={option.value}
                htmlFor={`${idPrefix}-bodyType-${option.value}`}
                className="flex items-center justify-between gap-3 px-2 py-2 rounded-lg hover:bg-primary/5 cursor-pointer min-h-[44px] transition-colors select-none"
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    id={`${idPrefix}-bodyType-${option.value}`}
                    checked={selectedBodyTypes.includes(option.value)}
                    onCheckedChange={() => toggleMultiSelect("bodyType", selectedBodyTypes, option.value)}
                    className="h-5 w-5 rounded border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                  />
                <span className="text-sm font-medium">{option.value}</span>
                </div>
                <span className="text-xs text-muted-foreground bg-secondary/60 px-2 py-0.5 rounded-full font-mono">
                  {option.count}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Numeric Ranges */}
      <div className="border border-border/60 rounded-xl p-4 bg-card/50 space-y-4">
        <button
          onClick={() => setRangesOpen(!rangesOpen)}
          className="w-full flex items-center justify-between font-display text-sm text-foreground min-h-[44px]"
        >
          <span>Intervale (An, Preț, Km)</span>
          {rangesOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </button>

        {rangesOpen && (
          <div className="space-y-4 pt-2">
            {/* An */}
            <div className="space-y-1.5">
              <span className="text-xs text-muted-foreground font-medium">An fabricație</span>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  id={`${idPrefix}-year-min-input`}
                  type="number"
                  placeholder={`Min (${derivedRanges.minYear})`}
                  value={yearMinParam}
                  onChange={(e) => updateParam("yearMin", e.target.value)}
                  className="input-luxury text-xs min-h-[44px]"
                />
                <Input
                  id={`${idPrefix}-year-max-input`}
                  type="number"
                  placeholder={`Max (${derivedRanges.maxYear})`}
                  value={yearMaxParam}
                  onChange={(e) => updateParam("yearMax", e.target.value)}
                  className="input-luxury text-xs min-h-[44px]"
                />
              </div>
            </div>

            {/* Preț */}
            <div className="space-y-1.5">
              <span className="text-xs text-muted-foreground font-medium">Preț (€)</span>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  id={`${idPrefix}-price-min-input`}
                  type="number"
                  placeholder={`Min (${derivedRanges.minPrice} €)`}
                  value={priceMinParam}
                  onChange={(e) => updateParam("priceMin", e.target.value)}
                  className="input-luxury text-xs min-h-[44px]"
                />
                <Input
                  id={`${idPrefix}-price-max-input`}
                  type="number"
                  placeholder={`Max (${derivedRanges.maxPrice} €)`}
                  value={priceMaxParam}
                  onChange={(e) => updateParam("priceMax", e.target.value)}
                  className="input-luxury text-xs min-h-[44px]"
                />
              </div>
            </div>

            {/* Km */}
            <div className="space-y-1.5">
              <span className="text-xs text-muted-foreground font-medium">Kilometraj (km)</span>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  id={`${idPrefix}-km-min-input`}
                  type="number"
                  placeholder={`Min (${derivedRanges.minKm.toLocaleString()} km)`}
                  value={kmMinParam}
                  onChange={(e) => updateParam("kmMin", e.target.value)}
                  className="input-luxury text-xs min-h-[44px]"
                />
                <Input
                  id={`${idPrefix}-km-max-input`}
                  type="number"
                  placeholder={`Max (${derivedRanges.maxKm.toLocaleString()} km)`}
                  value={kmMaxParam}
                  onChange={(e) => updateParam("kmMax", e.target.value)}
                  className="input-luxury text-xs min-h-[44px]"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {onCloseMobile && (
        <button
          onClick={onCloseMobile}
          className="btn-luxury-filled w-full py-3 mt-4 lg:hidden min-h-[44px] flex items-center justify-center"
        >
          Afișează rezultatele
        </button>
      )}
    </div>
  );
};
