import FlightDeals from "./components/FlightDeals";
import Reviews from "./components/Reviews";
import Hotels from "./components/Hotels";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <FlightDeals />
      <Hotels />

      <Reviews />
    </>
  );
}
