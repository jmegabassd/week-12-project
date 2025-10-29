// Sign in page
import signin from "@/styles/sign-in.module.css";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div
      className={`${signin.maincontainer} bg-linear-to-b from-slate-900 to-slate-800`}
    >
      <SignIn />
    </div>
  );
}
