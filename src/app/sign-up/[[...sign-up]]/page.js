// Sign up page
import signup from "@/styles/sign-up.module.css";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className={signup.maincontainer}>
      <h1>Sign up to RPG</h1>
      <SignUp />
    </div>
  );
}
