import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import logo from "@/assets/Stefan.png";

const Footer = () => {
  return (
    <footer className="bg-navy-light border-t border-primary/10">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <img
              src={logo}
              alt="STEFAN AUTO GVR SRL Logo"
              className="h-20 w-auto mb-6"
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

          {/* Services */}
          <div>
            <h4 className="font-display text-lg mb-6 text-gold-gradient">
              Servicii
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>Finanțare Auto</li>
              <li>Mașini la Comandă</li>
              <li>Buy-Back Auto</li>
              <li>Livrare în Țară</li>
              <li>Numere Roșii</li>
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
                  href="tel:+40731758666"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 text-primary" strokeWidth={1.5} />
                  +40 731 758 666
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
                <span>Str. Cireșului 16 C, Dobroești 077086</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <Clock className="w-4 h-4 text-primary mt-0.5" strokeWidth={1.5} />
                <span>Luni - Sâmbătă: 09:00 - 19:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} STEFAN AUTO GVR SRL. Toate drepturile rezervate.
          </p>
          <p className="text-muted-foreground text-xs">
            Autoturisme rulate de calitate premium
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
