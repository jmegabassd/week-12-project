//
import sidebar from "@/styles/sidebar.module.css";
import Link from "next/link";
import { db } from "@/utils/dbConnections";
import Image from "next/image";

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
    <aside
      className={`${sidebar.maincontainer} bg-blue-900 text-white p-2 flex flex-col gap-2 items-center`}
    >
      <SignedIn>
        <div className="flex flex-col gap-2 items-center">
          <UserButton />
          {user?.username && (
            <Link
              href={`/user/${user.username}`}
              className="bg-red-600 text-white rounded-md shadow-md"
            >
              {user.username}
            </Link>
          )}
        </div>

        <div className={sidebar.activechar}>
          <h2 className="text-lg font-bold">Active Character:</h2>

          {activeCharacter && (
            <div className="bg-linear-to-b from-slate-900 to-slate-700 p-2 rounded-lg shadow-inner flex flex-col items-center">
              <div className="flex flex-col items-start gap-1 text-sm">
                {activeCharacter.avatar && (
                  <Image
                    src={activeCharacter.avatar}
                    alt={activeCharacter.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                )}
                <p className="font-semibold">{activeCharacter.name}</p>
              </div>
            </div>
          )}
        </div>
      </SignedIn>

      <SignedOut>
        <div className="flex flex-col gap-2">
          <SignInButton>
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
              Sign in here
            </button>
          </SignInButton>
          <SignUpButton>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Sign up here
            </button>
          </SignUpButton>
        </div>
      </SignedOut>
    </aside>
  );
}
