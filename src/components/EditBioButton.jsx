// Edit bio to be used in the user profile page

"use client";

import { useState } from "react";

export default function EditBioButton({ initialBio, userId }) {
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState(initialBio || "");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/update-bio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bio, userId }),
    });

    setEditing(false);
    setLoading(false);
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-200">Bio:</h3>
      {!editing ? (
        <>
          <p className="text-gray-300">{bio || "No bio yet."}</p>
          <button
            onClick={() => setEditing(true)}
            className="font-bold bg-yellow-600 hover:bg-yellow-700 hover:cursor-pointer text-white text-sm px-4 py-2 rounded"
          >
            Edit Bio
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="w-full p-2 rounded bg-slate-700 text-white"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 hover:cursor-pointer text-white text-sm px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="bg-red-600 hover:bg-red-700 hover:cursor-pointer text-white text-sm px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
