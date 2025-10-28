// Character component to be used in the adventures.
import { db } from "@/utils/dbConnections";
import { currentUser } from "@clerk/nextjs/server";

export default async function CharacterComponent() {
  const user = await currentUser();
  const clerkId = user.id;

  // Fetch active character
  let activeCharacter = null;
  if (user) {
    const { rows } = await db.query(
      `SELECT id, name, avatar, age, race, class FROM characters WHERE user_id = $1 AND is_active = true LIMIT 1`,
      [clerkId]
    );

    activeCharacter = rows[0];
  }

  return { activeCharacter };
}
