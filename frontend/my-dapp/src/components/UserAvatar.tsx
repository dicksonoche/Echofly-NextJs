import Image from "next/image";
import aviPlaceholder from "@/assets/avatar-placeholder.png";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  className?: string;
  size?: number;
  avatarUrl: string | null | undefined;
}

const UserAvatar = ({ className, size, avatarUrl }: UserAvatarProps) => {
  return (
    <Image
      src={avatarUrl || aviPlaceholder}
      alt="User avatar"
      width={size ?? 50}
      height={size ?? 50}
      className={cn(
        "bg-slate-900 aspect-square h-fit flex-none rounded-full",
        className,
      )}
    />
  );
};

export default UserAvatar;
