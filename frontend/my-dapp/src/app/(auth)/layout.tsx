import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

//async to monitor the current user session
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest(); //Tells us if there's a valid session(from proper login)

  if (user) redirect("/");

  return <>{children}</>;
}
