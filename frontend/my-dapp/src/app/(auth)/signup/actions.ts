"use server";

import { generateIdFromEntropySize } from "lucia";
import { signUpSchema, SignUpValues } from "@/lib/validation";
import { hash } from "@node-rs/argon2";
import prisma from "@/lib/prisma";
import { lucia } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function signUp(
  credentials: SignUpValues,
): Promise<{ error: string }> {
  try {
    const { username, email, password } = signUpSchema.parse(credentials);
    //To hash the password
    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    const userId = generateIdFromEntropySize(10);

    //To check if the user already exists
    const existingUsername = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive", //Does not discriminate between upper and lower case
        },
      },
    });

    if (existingUsername) {
      return {
        error: "Username already exists",
      };
    }

    const existingEmail = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    if (existingEmail) {
        return {
            error: "Email address already registered"
        }
    }

    //if there is no existing username or email, we can then create a new user in the db
    await prisma.user.create({
        data: {
            id: userId,
            username,
            displayName: username,
            email,
            passwordHash
        }
    })

    //When the user signs up, it immediately redirects them from the signup page to the homepage
    const session = await lucia.createSession(userId, {})
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    ); //creates the session cookie so the user is authenticated immediately after sign up(automatic login)

    return redirect("/")
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return {
      error: "Something went wrong. Please, try again", //Generic errorn which  should only happen when the server is down
    };
  }
} //Calling the sub actions on the frontend doesn't mean we can catch them on the frontend
//This is because the error message would be removed when sent to the frontend;
//seeing a generic error message without knowing what went wrong
