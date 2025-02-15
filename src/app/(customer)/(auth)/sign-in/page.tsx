"use client";

import { ActionResult } from "@/types";
import { useFormState, useFormStatus } from "react-dom";
import { signIn } from "../lib/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import SubmitButton from "../_components/SubmitButton";
import Link from "next/link";

const initialState: ActionResult = {
  error: "",
};

const SignInPage = () => {
  const [state, formAction] = useFormState(signIn, initialState);

  return (
    <div
      id="signin"
      className="bg-[#EFF3FA] min-h-screen pt-[30px] pb-[50px] flex flex-col"
    >
      <div className="container max-w-[1130px] mx-auto flex flex-1 items-center justify-center py-5">
        <form
          action={formAction}
          className="w-[500px] bg-white p-[50px_30px] flex flex-col gap-5 rounded-3xl border border-[#E5E5E5]"
        >
          <div className="flex justify-center">
            <img src="assets/logos/logo-black.svg" alt="logo" />
          </div>
          <h1 className="font-bold text-2xl leading-[34px]">Sign In</h1>
          {state.error !== "" && (
            <Alert variant="destructive" className="bg-red-500 text-white">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}
          <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
            <div className="flex shrink-0">
              <img src="assets/icons/sms.svg" alt="icon" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
              placeholder="Write your email address"
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
              <div className="flex shrink-0">
                <img src="assets/icons/lock.svg" alt="icon" />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
                placeholder="Write your password"
              />
              <button type="submit" className="reveal-password flex shrink-0">
                <img src="assets/icons/eye.svg" alt="icon" />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <SubmitButton>Sign In to My Account</SubmitButton>
            <Link
              href="/sign-up"
              className="p-[12px_24px] bg-white rounded-full text-center font-semibold border border-[#E5E5E5] hover:opacity-70"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
