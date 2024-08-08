import Link from "next/link";
import UserForm from "../components/forms/UserForm";
import { Button } from "../components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      {/* TODO: OTP verification */}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w[496px]">
          <Image
            src="/assets/icons/logo.png"
            height={1000}
            width={1000}
            alt="user"
            className="mb-12 h-12 w-fit"
          />
          <UserForm />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 My dApp
            </p>
            <Link href="/?admin=true" className="text-green-500"/>
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
}
