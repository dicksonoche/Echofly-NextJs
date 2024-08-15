import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import SessionProvider from "./SessionProvider";
import Navbar from "./Navbar";

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
        <div className="mx-auto max-w-7xl p-5">{children}</div>
      </div>
    </SessionProvider>
  );
}
