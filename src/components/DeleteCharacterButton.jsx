// Button to delete a character (to be used in the profile page)

"use client";

export default function DeleteCharacterButton({ characterId, action }) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm("Are you sure you want to delete this character?")) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="characterId" value={characterId} />
      <button
        type="submit"
        className="mt-2 bg-red-700 hover:bg-red-800 text-white text-sm font-semibold px-4 py-2 rounded transition"
      >
        Delete
      </button>
    </form>
  );
}
