import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="font-display text-8xl md:text-9xl text-gold-gradient mb-4">
          404
        </h1>
        <h2 className="font-display text-2xl md:text-3xl mb-4">
          Pagina Nu Există
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Ne pare rău, pagina pe care o cauți nu a fost găsită. 
          Poate a fost mutată sau ștearsă.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="btn-luxury-filled flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Acasă
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-luxury flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Înapoi
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
