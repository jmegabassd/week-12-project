//
import sidebar from "@/styles/sidebar.module.css";

import {
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";

//this auth property contains the user's data object (you can check this in you clerk application > Users > Click on a user > Show JSON)
import { currentUser } from "@clerk/nextjs/server";

export default async function SidebarPage() {
  //auth is async
  // we can use it to destructure the userId that clerk creates on sign-up
  const user = await currentUser();

  return (
    <div className={sidebar.maincontainer}>
      {/* we are conditionally rendering these buttons depending on the user being authenticated or not */}
      <SignedIn>
        <UserButton />
        {/* this is sensitive data, just for the demo */}
        <p>{user?.username}</p>
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <button>Sign in here</button>
        </SignInButton>
        <SignUpButton>
          <button>Sign up here</button>
        </SignUpButton>
      </SignedOut>
    </div>
  );
}
