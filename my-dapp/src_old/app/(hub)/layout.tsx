import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import SessionProvider from "./SessionProvider";
import Navbar from "./Navbar";
import LeftSideBar from "../../../components/LeftSideBar";

//async to monitor the current user session
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest(); //Tells us if there's a valid session(from proper login)

  if (!session.user) redirect("/login"); //When the user's session is undefined, retun back to login screen if we try opening other pages

  return (
    <SessionProvider value={session}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="mx-auto flex w-full max-w-7xl grow gap-5 p-5">
          <LeftSideBar className="bg-card sticky top-[5rem] hidden h-fit flex-none space-y-3 rounded-2xl px-3 py-5 shadow-sm sm:block lg:px-5 xl:w-80" />
          {children}
        </div>
        <LeftSideBar className="bg-card sticky bottom-0 flex w-full justify-center gap-5 border-t p-3 sm:hidden" />
      </div>
    </SessionProvider>
  );
}
