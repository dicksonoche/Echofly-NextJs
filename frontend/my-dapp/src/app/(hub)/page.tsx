import CreatePost from "@/components/posts/editor/CreatePost";
import RightSideBar from "@/components/RightSideBar";
import FYP from "./FYP";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FollowingPage from "./FollowingPage";

export default function Home() {
  return (
    <div className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <CreatePost />
        <Tabs defaultValue="user-feed">
          <TabsList>
            <TabsTrigger value="user-feed">For you page</TabsTrigger>
            <TabsTrigger value="following">Following page</TabsTrigger>
          </TabsList>
          <TabsContent value="user-feed">
            <FYP />
          </TabsContent>
          <TabsContent value="following">
            <FollowingPage />
          </TabsContent>
        </Tabs>
      </div>
      <RightSideBar />
    </div>
  );
}
