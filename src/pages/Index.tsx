
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AppNavigationWidget from "@/components/home/AppNavigationWidget";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <AppNavigationWidget />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
