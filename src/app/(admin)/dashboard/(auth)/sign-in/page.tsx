import SignInForm from "./_components/form";

export default function SignInPage() {
  return (
    <div className="w-full h-screen overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <SignInForm />
      </div>
    </div>
  );
}
