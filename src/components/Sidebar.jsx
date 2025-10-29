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
      className={`${sidebar.maincontainer} bg-blue-900 text-white  min-h-screen p-6 flex flex-col gap-6 shadow-lg`}
    >
      <SignedIn>
        <div className="flex items-center justify-between">
          <UserButton />
          {user?.username && (
            <Link
              href={`/user/${user.username}`}
              className="bg-red-600 text-white px-3 py-1 rounded-md shadow-md"
            >
              {user.username}
            </Link>
          )}
        </div>

        {activeCharacter && (
          <div className="bg-slate-900 p-4 rounded-lg shadow-inner">
            <h3 className="text-lg font-bold mb-2">Active Character:</h3>
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
              <p>Age: {activeCharacter.age}</p>
              <p>
                {activeCharacter.race} - {activeCharacter.class}
              </p>
            </div>
          </div>
        )}
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
