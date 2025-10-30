// Avatar previewer to be used in the create new character page

"use client";

import { useState } from "react";

export default function AvatarPreview({
  raceOptions = [],
  characterAvatars = {},
}) {
  const [selectedRace, setSelectedRace] = useState("");

  const src = selectedRace ? characterAvatars[selectedRace] || "" : "";

  return (
    <div>
      <div className="flex items-center justify-center mb-4">
        {src ? (
          <img
            src={src}
            alt={`${selectedRace} avatar`}
            className="w-28 h-28 object-cover rounded-full shadow"
          />
        ) : (
          <div className="w-28 h-28 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
            No avatar
          </div>
        )}
      </div>

      <select
        name="race"
        value={selectedRace}
        onChange={(e) => setSelectedRace(e.target.value)}
        required
        className="border border-red-500 text-white bg-slate-800 p-2 w-full rounded placeholder-gray-400"
      >
        <option value="">Select Race</option>
        {raceOptions.map((race) => (
          <option key={race} value={race}>
            {race}
          </option>
        ))}
      </select>
    </div>
  );
}
