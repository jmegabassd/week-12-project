import { db } from "@/utils/dbConnections";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import DeleteCharacterButton from "@/components/DeleteCharacterButton";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const clerkUser = await currentUser();
  const clerkId = clerkUser.id;

  const { rows } = await db.query(
    "SELECT clerk_id, username, email, image_url, bio, created_at FROM users WHERE clerk_id = $1",
    [clerkId]
  );

  const user = rows[0];

  if (!user) {
    return {
      title: "User not found",
      description: "This user does not exist",
    };
  }

  return {
    title: `${user.username}'s profile`,
    description: `profile page for ${user.username} `,
  };
}

export default async function UserProfile({ params }) {
  const profileId = await params.profileId;

  const clerkUser = await currentUser();
  const clerkId = clerkUser.id;

  const { rows } = await db.query(
    "SELECT clerk_id, username, email, image_url, bio, created_at FROM users WHERE clerk_id = $1",
    [clerkId]
  );

  const user = rows[0];

  console.log(user);

  if (!user) {
    return <div className="text-red-500">User not found.</div>;
  }

  // Fetch characters
  const characterQuery = `SELECT id, name, race, class, age, gender, avatar, background, health, strength, intelligence, speed, created_at FROM characters WHERE user_id = $1 ORDER BY created_at DESC;`;
  const result = await db.query(characterQuery, [clerkId]);
  const characters = result.rows;

  // Make character active button
  async function handleActiveButton(formData) {
    "use server";
    const characterId = formData.get("characterId");
    await db.query(
      `UPDATE characters SET is_active = false WHERE user_id = $1`,
      [clerkId]
    );
    await db.query(`UPDATE characters SET is_active = true WHERE id = $1`, [
      characterId,
    ]);

    revalidatePath(`/user/${user.username}`);
  }

  // Delete a character
  async function handleDeleteCharacterButton(formData) {
    "use server";
    const characterId = formData.get("characterId");
    await db.query(`DELETE FROM characters WHERE id = $1 AND user_id = $2`, [
      characterId,
      clerkId,
    ]);

    revalidatePath(`/user/${user.username}`);
  }

  return (
    <div className="bg-slate-800 overflow-auto">
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
        {/* User Profile Card */}
        <div className="bg-slate-900 rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
          <Image
            alt="User profile picture"
            src={user.image_url}
            width={150}
            height={150}
            className="rounded-l-xl border-gray-500"
          />
          <div className="flex-1 space-y-2">
            <h2 className="text-2xl font-bold text-red-500">{user.username}</h2>
            <p className="text-gray-600">{user.email}</p>
            {user.bio && (
              <div>
                <h3 className="text-sm font-semibold text-gray-200">Bio:</h3>
                <p className="text-gray-300">{user.bio}</p>
              </div>
            )}
            <p className="text-sm text-gray-200">
              Joined: {new Date(user.created_at).toLocaleDateString("en-GB")}
            </p>
          </div>
        </div>

        <Link
          href={"/create-character"}
          className="mt-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded transition"
        >
          Create New Character
        </Link>

        {/* Characters Section */}
        <div>
          <h2 className="text-xl font-bold text-red-500 mb-4">
            {user.username}&apos;s Characters
          </h2>

          {characters.length === 0 ? (
            <p className="text-gray-500">
              You haven&apos;t created any characters yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {characters.map((character) => (
                <div
                  key={character.id}
                  className="bg-slate-900 rounded-lg shadow-md p-4 space-y-3"
                >
                  <div className="flex items-center gap-4">
                    {character.avatar && (
                      <Image
                        src={character.avatar}
                        alt={character.name}
                        width={80}
                        height={80}
                        className="rounded-full border"
                      />
                    )}
                    <div>
                      <h3 className="text-lg font-bold text-gray-100">
                        {character.name}
                      </h3>
                      <p className="text-sm text-gray-200">
                        {character.race}
                        {character.age && ` • Age: ${character.age}`}
                      </p>
                      {character.gender && (
                        <p className="text-sm text-gray-300">
                          {character.gender}
                        </p>
                      )}
                      {character.class && (
                        <p className="text-sm text-gray-300">
                          {character.class}
                        </p>
                      )}
                    </div>
                  </div>

                  {character.background && (
                    <p className="text-sm text-gray-400">
                      {character.background}
                    </p>
                  )}

                  {/* Stats Section */}
                  <div className="bg-slate-800 p-2 rounded-md space-y-1">
                    <h4 className="text-sm font-semibold text-gray-200">
                      Stats:
                    </h4>
                    <p className="text-xs text-gray-300">
                      Health: {character.health}
                    </p>
                    <p className="text-xs text-gray-300">
                      Strength: {character.strength}
                    </p>
                    <p className="text-xs text-gray-300">
                      Intelligence: {character.intelligence}
                    </p>
                    <p className="text-xs text-gray-300">
                      Speed: {character.speed}
                    </p>
                  </div>

                  {character.created_at && (
                    <p className="text-xs text-gray-200">
                      Created:{" "}
                      {new Date(character.created_at).toLocaleDateString(
                        "en-GB"
                      )}
                    </p>
                  )}

                  <form action={handleActiveButton}>
                    <input
                      type="hidden"
                      name="characterId"
                      value={character.id}
                    />
                    <button
                      type="submit"
                      className="mt-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded transition"
                    >
                      Make Active
                    </button>
                  </form>

                  <DeleteCharacterButton
                    characterId={character.id}
                    action={handleDeleteCharacterButton}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
