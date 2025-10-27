// Sign up page
import signup from "@/styles/sign-up.module.css";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className={signup.maincontainer}>
      <SignUp />
    </div>
  );
}
