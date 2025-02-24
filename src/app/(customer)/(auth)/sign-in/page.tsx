import { Metadata } from "next";
import SignInForm from "./_components/SignInForm";

export const metadata: Metadata = {
  title: "Sign In",
};

const SignInPage = () => {
  return (
    <div
      id="signin"
      className="bg-[#EFF3FA] min-h-screen pt-[30px] pb-[50px] flex flex-col"
    >
      <div className="container max-w-[1130px] mx-auto flex flex-1 items-center justify-center py-5">
        <SignInForm />
      </div>
    </div>
  );
};

export default SignInPage;
