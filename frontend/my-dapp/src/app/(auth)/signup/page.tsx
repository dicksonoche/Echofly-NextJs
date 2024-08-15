import UserSignUpForm from "@/app/(auth)/forms/UserSignUpForm";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
};

const Page = () => {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w[496px]">
          <Image
            src="/assets/icons/logo.png"
            height={1000}
            width={1000}
            alt="user"
            className="h-12 w-fit"
          />
          <UserSignUpForm />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="text-dark-600 justify-items-end xl:text-left">
              © 2024 My dApp
            </p>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/bg-image.jpg"
        height={1000}
        width={1000}
        alt="user"
        className="side-img max-w-[50%]"
      />
    </div>
  );
};
export default Page;
