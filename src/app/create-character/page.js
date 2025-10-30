import { getClerkDetails } from "@/components/GetClerkDetails";
import { db } from "@/utils/dbConnections";
import AvatarPreview from "@/components/AvatarPreview";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function NewCharacterPage() {
  const user = await getClerkDetails();

  if (!user) {
    return (
      <p className="text-center mt-10 text-red-600">
        You must be logged in to create a character.
      </p>
    );
  }

  // Options for character race and class
  const raceOptions = ["Human", "Pigeon", "Elf", "Gnome", "Goblin", "Werewolf"];
  const classOptions = ["Bard", "Hunter", "Sorcerer", "Explorer", "Barbarian"];

  // Options for character avatars
  const characterAvatars = {
    Human: "/images/avatars/human-avatar.png",
    Pigeon: "/images/avatars/pigeon-avatar.png",
    Elf: "/images/avatars/elf-avatar.png",
    Gnome: "/images/avatars/gnome-avatar.png",
    Goblin: "/images/avatars/goblin-avatar.png",
    Werewolf: "/images/avatars/werewolf-avatar.png",
  };

  // Server action for creating new character form
  async function createCharacter(formData) {
    "use server";

    const name = formData.get("name");
    const race = formData.get("race");
    const charClass = formData.get("class");
    const age = formData.get("age");
    const gender = formData.get("gender");
    const avatar = characterAvatars[race] || "";
    const background = formData.get("background");

    const query = `
      INSERT INTO characters (user_id, name, race, class, age, gender, avatar, background)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id, name, race, class, age, gender, avatar, background, created_at;
    `;

    const values = [
      user.id,
      name,
      race,
      charClass,
      age,
      gender,
      avatar,
      background,
    ];

    const result = await db.query(query, values);
    console.log("Character created:", result.rows[0]);

    redirect(`/user/${user.username}`);
  }

  // Form
  return (
    <div className="bg-slate-800 overflow-auto">
      <div className="max-w-xl mx-auto p-6 bg-slate-900 rounded-2xl shadow mt-8">
        <h1 className="text-2xl font-bold mb-4 text-red-500">
          Create New Character
        </h1>

        <form action={createCharacter} className="space-y-4">
          {/* Name */}
          <input
            name="name"
            placeholder="Character Name"
            required
            className="border border-red-500 text-white bg-slate-800 p-2 w-full rounded placeholder-gray-400"
          />

          {/* Race dropdown and the avatar previeer */}
          <AvatarPreview
            raceOptions={raceOptions}
            characterAvatars={characterAvatars}
          />

          {/* Class dropdown */}
          <select
            name="class"
            required
            className="border border-red-500 text-white bg-slate-800 p-2 w-full rounded placeholder-gray-400"
          >
            <option value="">Select Class</option>
            {classOptions.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>

          {/* Age */}
          <input
            name="age"
            type="number"
            placeholder="Age"
            className="border border-red-500 text-white bg-slate-800 p-2 w-full rounded placeholder-gray-400"
          />

          {/* Gender */}
          <input
            name="gender"
            placeholder="Gender"
            className="border border-red-500 text-white bg-slate-800 p-2 w-full rounded placeholder-gray-400"
          />

          {/* Background */}
          <textarea
            name="background"
            placeholder="Character Background"
            className="border border-red-500 text-white bg-slate-800 p-2 w-full rounded placeholder-gray-400"
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 hover:cursor-pointer"
          >
            Create Character
          </button>
        </form>
      </div>
    </div>
  );
}
