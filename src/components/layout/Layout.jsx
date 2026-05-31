import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Chatbot } from "@/features/chatbot";
import { ConsentBanner } from "@/components/ui/ConsentBanner";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { NeuralNetwork3D } from "@/components/ui/NeuralNetwork3D";

export default function Layout() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NeuralNetwork3D variant="ambient" className="fixed inset-0 z-0" />
      <div className="relative z-[1] min-h-screen">
        <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
        <Chatbot />
        <WhatsAppButton />
        <ConsentBanner />
      </div>
    </div>
  );
}
