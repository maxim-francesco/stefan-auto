
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, MessageCircle, Facebook } from "lucide-react";
import logo from "@/assets/Stefan.png";

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
                  Str. Cireșului 16 C, Dobroești 077086 <br />
                  <span className="font-semibold text-primary/80">Parc auto rulate Dobroești, Ilfov</span>
                </span>
              </li>
            </ul>
            <div className="mt-6">
                <h5 className="font-display text-base mb-4 text-gold-gradient">Ne găsiți și pe:</h5>
                <div className="flex flex-col items-start gap-3">
                     <a href="https://www.tiktok.com/@auto.sh.rate.avans.0?_r=1&_t=ZN-93Ru6FYY01e" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.85-.38-6.75-1.9-1.42-1.13-2.2-2.7-2.4-4.35-.02-.24-.03-.48-.03-.73v-5.04c.25 0 .5 0 .74 0 1.13 0 2.25-.01 3.38-.02 1.5-.01 2.99-.01 4.49-.01.02-3.46.02-6.92.01-10.38z"></path></svg>
                        <span>auto.sh.rate.avans.0</span>
                    </a>
                    <a href="https://www.facebook.com/share/18K1aijRxX/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm">
                        <Facebook className="w-5 h-5" />
                        <span>Stefan auto-gvr</span>
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
