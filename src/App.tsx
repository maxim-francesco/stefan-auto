import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Index from "./pages/Index";
import Inventory from "./pages/Inventory";
import Financing from "./pages/Financing";
import SpecialServices from "./pages/SpecialServices";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ScrollProgress from "./components/ScrollProgress";
import FloatingCTA from "./components/FloatingCTA";
import CarDetail from "./pages/CarDetail";

const queryClient = new QueryClient();

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -8 },
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={{ type: "tween", ease: "easeInOut", duration: 0.35 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/stoc" element={<Inventory />} />
          <Route path="/stoc/:id" element={<CarDetail />} />
          <Route path="/finantare" element={<Financing />} />
          <Route path="/servicii" element={<SpecialServices />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollProgress />
        <AnimatedRoutes />
        <FloatingCTA />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
