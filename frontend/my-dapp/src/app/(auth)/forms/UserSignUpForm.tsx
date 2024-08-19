"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/ui/CustomFormField";
import SubmitButton from "@/components/ui/SubmitButton";
import { useState, useTransition } from "react";
import { signUpSchema, SignUpValues } from "@/lib/validation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUp } from "../signup/actions";
import LoadingButton from "@/components/LoadingButton";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  PASSWORD_INPUT = "passwordInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
} //enum for error handling and parsing the data to the customformfield

const UserSignUpForm = () => {
  const router = useRouter;
  const [error, setError] = useState<string>();

  const [isPending, startTransition] = useTransition();

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  }); //The form receives a type of formSchema which accepts different params for validation

  async function onSubmit(data: SignUpValues) {
    setError(undefined);
    startTransition(async () => {
      const { error } = await signUp(data);
      if (error) setError(error);
    });

    try {
      const { email, username, password } = data;
      //const user = await createUser(userData);
      //if(user) router.push('/users/${user.$id}/register')
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 space-y-6"
        >
          <section className="mb-12 space-y-4">
            <h1 className="header">Heyyyy</h1>
            <p className="text-dark-700">Welcome to my dApp social platform</p>
          </section>
          {error && <p className="text-red-400">{error}</p>}
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="youremail@domain.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="username"
            label="Username"
            placeholder="johndoe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />
          <CustomFormField
            fieldType={FormFieldType.PASSWORD_INPUT}
            control={form.control}
            name="password"
            label="Password"
            placeholder="Password"
          />
          <LoadingButton loading={isPending} type="submit">
            Create an account
          </LoadingButton>
        </form>
      </Form>
      <div>
        <Link href="/login">
          <p className="text-dark-700 block hover:underline">
            Already have an account? Log in
          </p>
        </Link>
      </div>
    </>
  );
};

export default UserSignUpForm;
