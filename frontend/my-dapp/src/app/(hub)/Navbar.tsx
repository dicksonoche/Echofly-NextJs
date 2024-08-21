import SearchField from "@/components/SearchField";
import UserButton from "@/components/UserButton";
import Image from "next/image";
import Link from "next/link";

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
        <p className="text-primary text-2xl font-bold">Social Media App</p>
        <SearchField />
        <UserButton className="sm:ms-auto" />
      </div>
    </div>
  );
};

export default Navbar;
