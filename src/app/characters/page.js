import { getClerkDetails } from "@/components/GetClerkDetails";
import { db } from "@/utils/dbConnections";

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

  // :white_check_mark: Define valid options (must match your SQL CHECK constraints)
  const raceOptions = ["Human", "Pigeon", "Elf", "Gnome", "Goblin", "Werewolf"];
  const classOptions = ["Bard", "Hunter", "sorcerer", "Explorer", "Barbarian"];

  // :brain: Define server action
  async function createCharacter(formData) {
    "use server";

    const name = formData.get("name");
    const race = formData.get("race");
    const charClass = formData.get("class");
    const age = formData.get("age");
    const gender = formData.get("gender");
    const avatar = formData.get("avatar");
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
    console.log(":white_check_mark: Character created:", result.rows[0]);
  }

  // :receipt: Form UI
  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow mt-8">
      <h1 className="text-2xl font-bold mb-4 text-emerald-700">
        Create New Character
      </h1>

      <form action={createCharacter} className="space-y-4">
        {/* Name */}
        <input
          name="name"
          placeholder="Character Name"
          required
          className="border p-2 w-full rounded"
        />

        {/* Race dropdown */}
        <select name="race" required className="border p-2 w-full rounded">
          <option value="">Select Race</option>
          {raceOptions.map((race) => (
            <option key={race} value={race}>
              {race}
            </option>
          ))}
        </select>

        {/* Class dropdown */}
        <select name="class" required className="border p-2 w-full rounded">
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
          className="border p-2 w-full rounded"
        />

        {/* Gender */}
        <input
          name="gender"
          placeholder="Gender"
          className="border p-2 w-full rounded"
        />

        {/* Avatar URL */}
        <input
          name="avatar"
          placeholder="Avatar URL"
          className="border p-2 w-full rounded"
        />

        {/* Background */}
        <textarea
          name="background"
          placeholder="Character Background"
          className="border p-2 w-full rounded"
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
        >
          Save Character
        </button>
      </form>
    </div>
  );
}
