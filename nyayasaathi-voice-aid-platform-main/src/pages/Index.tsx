import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { ProblemsWeSolve } from "@/components/ProblemsWeSolve";
import { About } from "@/components/About";
import { GetInvolved } from "@/components/GetInvolved";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <div id="problems-we-solve">
        <ProblemsWeSolve />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="contact">
        <GetInvolved />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
