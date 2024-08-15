import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="bg-card sticky top-0 z-10 shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-5 px-5 py-3">
        <Link href="/">
          <Image
            src="/assets/icons/logo.png"
            height={1000}
            width={1000}
            alt="user"
            className="h-12 w-fit"
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
