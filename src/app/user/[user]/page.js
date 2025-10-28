import { db } from "@/utils/dbConnections";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

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
  const characterQuery = `SELECT id, name, race, class, age, gender, avatar, background, created_at FROM characters WHERE user_id = $1 ORDER BY created_at DESC;`;
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
  }

  return (
    <div>
      {/* User card */}
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
        <div className="flex items-center space-x-4">
          <div>
            <Image
              alt="User profile picture."
              src={user.image_url}
              width={150}
              height={150}
            ></Image>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{user.username}</h2>
          </div>

          <div>
            <h2>Bio:</h2>
            <p>{user.bio}</p>
          </div>
        </div>
      </div>

      {/* User's Characters */}
      <div className="col-start-2 col-end-3 row-start-2 row-end-3">
        <h2>{user.username}&apos;s Characters</h2>

        {characters.length === 0 ? (
          <p>You haven&apos;t created any characters yet.</p>
        ) : (
          <div className="border-black">
            {characters.map((character) => (
              <div key={character.id}>
                {character.avatar && (
                  <Image
                    src={character.avatar}
                    alt={character.name}
                    width={100}
                    height={100}
                  />
                )}
                <h3>{character.name}</h3>
                <p>
                  Ancestry: {character.race}{" "}
                  {character.age && `• Age: ${character.age}`}
                </p>
                {character.gender && <p>{character.gender}</p>}
                {character.class && <p>{character.class}</p>}
                {character.background && <p>{character.background}</p>}

                {character.created_at && (
                  <p>
                    {new Date(character.created_at).toLocaleDateString("en-GB")}
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
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition cursor-pointer"
                  >
                    Make Active
                  </button>
                </form>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
