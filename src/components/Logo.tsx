"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

function Logo() {
  const router = useRouter();

  return (
    <Image
      width={107}
      height={30}
      src="/icons/logo.svg"
      alt="logo"
      onClick={() => router.push("/")}
    />
  );
}

export default Logo;
