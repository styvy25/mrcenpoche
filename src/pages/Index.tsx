
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HomeContent from "@/components/home/HomeContent";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HomeContent />
      <Footer />
    </div>
  );
};

export default Index;
