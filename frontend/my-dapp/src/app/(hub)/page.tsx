import CreatePost from "@/components/posts/editor/CreatePost";
import RightSideBar from "@/components/RightSideBar";
import FYP from "./FYP";

export default function Home() {
  return (
    <div className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <CreatePost />
        <FYP />
      </div>
      <RightSideBar />
    </div>
  );
}
