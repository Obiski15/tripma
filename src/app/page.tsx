import FlightDeals from "./components/FlightDeals";
import Reviews from "./components/Reviews";
import Hotels from "./components/Hotels";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "./components/hero/Hero";

export default function Home() {
  return (
    <section>
      <Header />
      <Hero />
      <FlightDeals />
      <Hotels />

      <Reviews />
      <Footer />
    </section>
  );
}
