import { db } from "@/utils/dbConnections";
import { currentUser } from "@clerk/nextjs/server";
import AdventureClient from "./AdventureClient";

export default async function Adventure1Page() {
  const user = await currentUser();
  if (!user) {
    return (
      <p className="text-center mt-10 text-red-600">
        Please sign in to play an adventure.
      </p>
    );
  }

  const { rows } = await db.query(
    "SELECT * FROM characters WHERE user_id = $1 AND is_active = true LIMIT 1",
    [user.id]
  );
  const activeCharacter = rows[0];

  if (!activeCharacter) {
    return (
      <p className="text-center mt-10 text-gray-700">
        You don&apos;t have an active character yet.
      </p>
    );
  }

  return <AdventureClient activeCharacter={activeCharacter} />;
}
