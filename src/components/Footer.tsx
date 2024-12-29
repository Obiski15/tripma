import { Apple } from "lucide-react";
import Image from "next/image";

import Logo from "./Logo";
import { connection } from "next/server";

async function Footer() {
  await connection();

  return (
    <footer className="flex flex-col justify-start items-start gap-4 py-4">
      <div className="w-full px-3 py-6 flex flex-col justify-between items-start gap-6 sm:flex-row lg:px-[120px] lg:pt-[60px] md:px-10">
        <div className="md:py-4">
          <Logo />
        </div>

        <div className="flex flex-col justify-start items-start pr-4 gap-1 md:py-4">
          <p className="font-bold text-lg">About</p>
          <p className="hover:underline cursor-pointer">About Tripma</p>
          <p className="hover:underline cursor-pointer">How it works</p>
          <p className="hover:underline cursor-pointer">Careers</p>
          <p className="hover:underline cursor-pointer">Press</p>
          <p className="hover:underline cursor-pointer">Blog</p>
          <p className="hover:underline cursor-pointer">Forum</p>
        </div>

        <div className="flex flex-col justify-start items-start pr-4 gap-1 md:py-4">
          <p className="font-bold text-lg">Partner with us</p>
          <p className="hover:underline cursor-pointer">Partnership Programs</p>
          <p className="hover:underline cursor-pointer">Affiliate Program</p>
          <p className="hover:underline cursor-pointer">
            Connectivity Partners
          </p>
          <p className="hover:underline cursor-pointer">
            Promotions and Events
          </p>
          <p className="hover:underline cursor-pointer">Integrations</p>
          <p className="hover:underline cursor-pointer">Community</p>
          <p className="hover:underline cursor-pointer">Loyalty Programs</p>
        </div>

        <div className="flex flex-col justify-start items-start pr-4 gap-1 md:py-4">
          <p className="font-bold text-lg">Support</p>
          <p className="hover:underline cursor-pointer">Help Center</p>
          <p className="hover:underline cursor-pointer">Contact Us</p>
          <p className="hover:underline cursor-pointer">Privacy Policy</p>
          <p className="hover:underline cursor-pointer">Terms of Service</p>
          <p className="hover:underline cursor-pointer">Trust and Safety</p>
          <p className="hover:underline cursor-pointer">Accessibility</p>
        </div>

        <div className="flex flex-col justify-start items-start pr-4 gap-1 md:py-4">
          <p className="font-bold text-lg">Get the app</p>
          <p className="hover:underline cursor-pointer">Tripma for Andriod</p>
          <p className="hover:underline cursor-pointer">Tripma for IOS</p>
          <div className="flex items-center justify-start gap-2 hover:underline cursor-pointer p-2 bg-[#000000] text-background rounded-md w-full overflow-x-scroll no-scrollbar">
            <Apple />
            <div className="flex flex-col justify-between items-start">
              <p>Get it on</p>
              <p>App Store</p>
            </div>
          </div>
          <div className="flex items-center justify-start gap-2 hover:underline cursor-pointer p-2 bg-[#000000] text-background rounded-md w-full overflow-x-scroll no-scrollbar">
            <Image
              width={24}
              height={24}
              alt="playstore"
              src="/icons/playstore.svg"
            />
            <div className="flex flex-col justify-between items-start">
              <p>Download on</p>
              <p>Google Play</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-row justify-between items-center px-3 md:px-10 lg:px-[120px] py-3">
        <div className="flex justify-start items-center p-2 gap-5">
          <Image
            width={24}
            height={24}
            alt="twitter"
            src="/icons/twitter.svg"
          />
          <Image
            width={24}
            height={24}
            alt="twitter"
            src="/icons/instagram.svg"
          />
          <Image
            width={24}
            height={24}
            alt="twitter"
            src="/icons/facebook.svg"
          />
        </div>

        <p>&copy; {new Date().getFullYear()} Tripma inc.</p>
      </div>
    </footer>
  );
}

export default Footer;
