"use client";

import { useSession } from "@/app/(hub)/SessionProvider";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface UserButtonProps {
  className?: string;
}

const UserButton = ({ className }: UserButtonProps) => {
  const {user} = useSession();//Containing the user and the sessio9n both guaranteed to not be null. A client component, so we can't call validate request
  return <DropdownMenu>
    <DropdownMenuTrigger asChild>
        <button className="">

        </button>
    </DropdownMenuTrigger>
  </DropdownMenu>
};

export default UserButton;
