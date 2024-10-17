import { PostPayload } from "@/lib/types";
import { useState } from "react";
import DeletePostPop from "./DeletePostPop";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal, Trash2 } from "lucide-react";


interface PostMenuButtonProps {
  post: PostPayload;
  className?: string;
}

const PostMenuButton = ({ post, className }: PostMenuButtonProps) => {
  const [showDeletePop, setShowDeletePop] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost" className={className}>
            <MoreHorizontal className="text-muted-foreground size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setShowDeletePop(true)}>
            <span className="text-destructive flex items-center gap-3">
              <Trash2 className="'size-4" />
              Delete
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeletePostPop
        post={post}
        open={showDeletePop}
        onClose={() => setShowDeletePop(false)}
      />
    </>
  );
};

export default PostMenuButton;
