import Payment from "./components/Payment";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

function page() {
  return (
    <section>
      <Header />
      <main className="flex flex-col justify-between items-start gap-6 px-3 py-3 md:px-10">
        <div className="flex flex-col justify-between items-start gap-3">
          <h3 className="text-2xl font-bold text-primary">Payment method</h3>
          <p className="w-[90%]">
            Select a payment method below. Tripma processes your payment
            securely with end-to-end encryption.
          </p>
        </div>

        <Payment />
      </main>
      <Footer />
    </section>
  );
}

export default page;
