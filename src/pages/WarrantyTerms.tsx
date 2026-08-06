import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WARRANTY_META, WARRANTY_SECTIONS } from "@/content/warranty";

const WarrantyTerms = () => {
  const renderParagraphWithLinks = (text: string) => {
    const email = WARRANTY_META.contactEmail;
    const phone = WARRANTY_META.contactPhoneDisplay;

    let parts: (string | JSX.Element)[] = [text];

    const emailIndex = text.indexOf(email);
    if (emailIndex !== -1) {
      const before = text.substring(0, emailIndex);
      const after = text.substring(emailIndex + email.length);
      parts = [
        before,
        <a
          key="email"
          href={`mailto:${WARRANTY_META.contactEmail}`}
          className="text-primary hover:underline"
        >
          {email}
        </a>,
        after,
      ];
    }

    const finalParts: (string | JSX.Element)[] = [];
    parts.forEach((part) => {
      if (typeof part === "string") {
        const phoneIndex = part.indexOf(phone);
        if (phoneIndex !== -1) {
          const before = part.substring(0, phoneIndex);
          const after = part.substring(phoneIndex + phone.length);
          finalParts.push(before);
          finalParts.push(
            <a
              key="phone"
              href={`tel:${WARRANTY_META.contactPhone}`}
              className="text-primary hover:underline"
            >
              {phone}
            </a>
          );
          finalParts.push(after);
        } else {
          finalParts.push(part);
        }
      } else {
        finalParts.push(part);
      }
    });

    return <>{finalParts}</>;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl mt-2 mb-4 text-gold-gradient">
                Termeni și condiții acordare garanție
              </h1>
              <p className="text-muted-foreground">
                Ultima actualizare: {WARRANTY_META.lastUpdated}
              </p>
            </div>

            <div className="glass rounded-2xl p-6 md:p-8 mb-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-muted-foreground text-xs uppercase tracking-widest mb-1">
                  Durată
                </div>
                <div className="font-display text-2xl text-gold-gradient">
                  {WARRANTY_META.durationMonths} luni
                </div>
              </div>
              <div>
                <div className="text-muted-foreground text-xs uppercase tracking-widest mb-1">
                  Sau kilometraj
                </div>
                <div className="font-display text-2xl text-gold-gradient">
                  {WARRANTY_META.durationKm.toLocaleString("ro-RO")} km
                </div>
              </div>
              <div>
                <div className="text-muted-foreground text-xs uppercase tracking-widest mb-1">
                  Limită despăgubire
                </div>
                <div className="font-display text-2xl text-gold-gradient">
                  {WARRANTY_META.coverageLimitRon.toLocaleString("ro-RO")} EUR
                </div>
              </div>
              <div className="col-span-1 sm:col-span-3 text-sm text-muted-foreground mt-2">
                Se aplică prima condiție atinsă.
              </div>
            </div>

            <nav className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {WARRANTY_SECTIONS.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {section.title}
                </a>
              ))}
            </nav>

            <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed space-y-8">
              {WARRANTY_SECTIONS.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28 space-y-4"
                >
                  <h2 className="text-xl font-display text-foreground">
                    {section.title}
                  </h2>
                  {section.highlight ? (
                    <div className="glass rounded-xl p-6 border-l-2 border-primary space-y-4">
                      {section.paragraphs?.map((p, idx) => (
                        <p key={idx} className="last:mb-0">
                          {renderParagraphWithLinks(p)}
                        </p>
                      ))}
                      {section.list && (
                        <ul className="list-disc pl-5 space-y-2 last:mb-0">
                          {section.list.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      )}
                      {section.listAfter?.map((p, idx) => (
                        <p key={idx} className="last:mb-0">
                          {renderParagraphWithLinks(p)}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {section.paragraphs?.map((p, idx) => (
                        <p key={idx}>{renderParagraphWithLinks(p)}</p>
                      ))}
                      {section.list && (
                        <ul className="list-disc pl-5 space-y-2">
                          {section.list.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      )}
                      {section.listAfter?.map((p, idx) => (
                        <p key={idx}>{renderParagraphWithLinks(p)}</p>
                      ))}
                    </div>
                  )}
                </section>
              ))}

              <p className="text-sm pt-8 border-t border-border/50">
                STEFAN AUTO GVR SRL, CUI 47133950, Nr. Reg. Com. J23/7668/2022.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WarrantyTerms;
