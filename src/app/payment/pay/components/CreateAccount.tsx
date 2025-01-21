import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function CreateAccount() {
  return (
    <div className="flex flex-col justify-start items-start gap-3">
      <div className="w-full flex flex-col justify-start items-start gap-4 md:w-[80%]">
        <h3 className="text-lg font-semibold">Create an account</h3>
        <p>
          Tripma is free to use as a guest, but if you create an account today,
          you can save and view flights, manage your trips, earn rewards, and
          more.
        </p>

        <form
          className="w-full flex flex-col justify-between items-start gap-4 md:w-[70%]"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input placeholder="Email Address or Phone number" />
          <Input placeholder="Password" />
          <Button className="w-full">Create an Account</Button>
        </form>
      </div>

      <div className="w-full flex justify-center items-center gap-1 md:w-[55%] py-5 px-3">
        <p className="flex-1 h-[1px] bg-input"></p>
        <p className="text-lg py-1">or</p>
        <p className="flex-1 h-[1px] bg-input"></p>
      </div>

      <div className="w-full flex flex-col justify-start items-start gap-3 text-lg md:w-[55%]">
        <Button
          className="w-full flex justify-start items-center"
          variant="outline"
        >
          <Image alt="google" src="/icons/google.svg" width={18} height={18} />
          <p className="flex-1">Sign up with Google</p>
        </Button>
        <Button
          className="w-full flex justify-start items-center"
          variant="outline"
        >
          <Image alt="apple" src="/icons/apple.svg" width={18} height={18} />
          <p className="flex-1">Continue with Apple</p>
        </Button>
        <Button
          className="w-full flex justify-start items-center"
          variant="outline"
        >
          <Image
            alt="facebook"
            src="/icons/facebook.svg"
            width={18}
            height={18}
          />
          <p className="flex-1">Continue with Facebook</p>
        </Button>
      </div>
    </div>
  );
}

export default CreateAccount;
