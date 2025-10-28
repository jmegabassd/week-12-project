//
import sidebar from "@/styles/sidebar.module.css";
import Link from "next/link";
import { db } from "@/utils/dbConnections";

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

  let activeCharacter = null;

  if (user) {
    const clerkId = user.id;

    const { rows } = await db.query(
      `SELECT id, name, avatar, age, race, class FROM characters WHERE user_id = $1 AND is_active = true LIMIT 1`,
      [clerkId]
    );

    activeCharacter = rows[0];
  }

  return (
    <div className={sidebar.maincontainer}>
      {/* we are conditionally rendering these buttons depending on the user being authenticated or not */}
      <SignedIn>
        <UserButton />
        {/* this is sensitive data, just for the demo */}
        {user?.username && (
          <p>
            <Link href={`/user/${user.username}`}>{user.username}</Link>
          </p>
        )}

        {activeCharacter && (
          <div className={sidebar.characterCard}>
            <h3>Active Character:</h3>

            <div className={sidebar.characterInfo}>
              {activeCharacter.avatar && (
                <Image
                  src={activeCharacter.avatar}
                  alt={activeCharacter.name}
                  width={50}
                  height={50}
                />
              )}
              <p>{activeCharacter.name}</p>
              <p>{activeCharacter.age}</p>
              <p>
                {activeCharacter.race} - {activeCharacter.class}
              </p>
            </div>
          </div>
        )}
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
