// Sign up page
import signup from "@/styles/sign-up.module.css";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div
      className={`${signup.maincontainer} bg-linear-to-b from-slate-900 to-slate-800`}
    >
      <SignUp />
    </div>
  );
}
