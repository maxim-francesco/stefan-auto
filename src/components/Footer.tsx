
import { Link } from "react-router-dom";
import { Phone, MapPin, MessageCircle } from "lucide-react";
import logo from "@/assets/Stefan.png";
import { FaTiktok, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-navy-light border-t border-primary/10">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <img
              src={logo}
              alt="STEFAN AUTO GVR SRL Logo"
              className="h-28 w-auto mb-6"
            />
            <p className="text-muted-foreground text-sm leading-relaxed">
              STEFAN AUTO GVR SRL <br />
              CUI: 47133950 <br />
              Nr. Reg. Com.: J23/7668/2022
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg mb-6 text-gold-gradient">
              Navigare
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Acasă", path: "/" },
                { name: "Stoc Auto", path: "/stoc" },
                { name: "Finanțare", path: "/finantare" },
                { name: "Servicii", path: "/servicii" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Info */}
          <div>
            <h4 className="font-display text-lg mb-6 text-gold-gradient">
              Informații Legale
            </h4>
            <ul className="space-y-3">
                <li>
                    <Link to="/termeni-si-conditii" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                        Termeni și Condiții
                    </Link>
                </li>
                 <li>
                    <Link to="/politica-de-confidentialitate" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                        Politică de Confidențialitate
                    </Link>
                </li>
                 <li>
                    <Link to="/politica-de-cookies" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                        Politică de Cookies
                    </Link>
                </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg mb-6 text-gold-gradient">
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:0731758666"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 text-primary" strokeWidth={1.5} />
                  0731 758 666
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/40731758666"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  <MessageCircle className="w-4 h-4 text-primary" strokeWidth={1.5} />
                  WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-primary mt-0.5" strokeWidth={1.5} />
                <span>
                  Str. Dr. între Tarlale 21, 077106 Cățelu <br />
                  <span className="font-semibold text-primary/80">Parc auto rulate Cățelu, Ilfov</span>
                </span>
              </li>
            </ul>
            <div className="mt-6">
                <h5 className="font-display text-lg mb-6 text-gold-gradient">Ne găsiți și pe:</h5>
                <div className="flex flex-col items-start gap-4">
                     <a href="https://www.tiktok.com/@auto.sh.rate.avans.0?_r=1&_t=ZN-93Ru6FYY01e" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-primary transition-colors flex items-center gap-3 text-lg font-medium">
                        <FaTiktok className="w-6 h-6" />
                        <span>Stefan Auto GVR</span>
                    </a>
                    <a href="https://www.facebook.com/share/18K1aijRxX/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-primary transition-colors flex items-center gap-3 text-lg font-medium">
                        <FaFacebook className="w-6 h-6" />
                        <span>Stefan Auto GVR</span>
                    </a>
                </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs text-center md:text-left">
            © {new Date().getFullYear()} STEFAN AUTO GVR SRL. Toate drepturile rezervate.
          </p>
          <div className="flex items-center gap-4">
             <a href="https://anpc.ro/" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              ANPC
            </a>
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              SOL
            </a>
          </div>
        </div>
        
        {/* Credits Line */}
        <div className="mt-10 text-center">
            <p className="text-lg text-gold-gradient">
                Construit și proiectat de Francesco Maxim | <a href="tel:+40758990675" className="hover:underline">+40758990675</a>
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
