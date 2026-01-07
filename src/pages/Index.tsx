import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturedCars from "@/components/FeaturedCars";
import ServicesGrid from "@/components/ServicesGrid";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedCars />
        <ServicesGrid />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
