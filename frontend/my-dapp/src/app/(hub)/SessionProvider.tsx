"use client";

import { Session, User } from "lucia";
import { createContext, useContext } from "react";

interface SessionContext {
  user: User;
  session: Session;
}

const SessionContext = createContext<SessionContext | null>(null); //Initialize with null(creating the context outside thee component), although we do not allow null values

export default function SessionProvider({
  children,
  value,
}: React.PropsWithChildren<{ value: SessionContext }>) {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("SessionProvider must contain useSession");
  }
  return context;
}

// On the layout.tsx
//1. Fetch the session in the hub layout
//2. Check if the user is logged in, if not redirect to the login page
//3. Then, take the session and make it available to the client component

// On the SessionProvider.tsx(a client component)
// The children of the SessionProvider can still be server components; wrapping server components in client components(Next js), via the children prop
// Based on the last custom hook, when we call useSession, we get a defined non-nullable context object