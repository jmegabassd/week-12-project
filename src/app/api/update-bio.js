import { db } from "@/utils/dbConnections";
import { currentUser } from "@clerk/nextjs/server";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const user = await currentUser();
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  const { bio, userId } = req.body;

  try {
    await db.query(`UPDATE users SET bio = $1 WHERE clerk_id = $2`, [
      bio,
      user.id,
    ]);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error updating bio:", err);
    res.status(500).json({ error: "Failed to update bio" });
  }
}
