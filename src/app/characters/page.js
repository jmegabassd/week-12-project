"use client";

import ClerkDetails from "@/components/GetClerkDetails";
import { useState } from "react";

export default function NewCharacterPage() {
  const userId = ClerkDetails.id;
  console.log(userId);
  const [form, setForm] = useState({
    name: "",
    race: "",
    class: "",
    age: "",
    gender: "",
    avatar: "",
    background: "",
  });
  const [message, setMessage] = useState("");

  // Dropdown options
  const raceOptions = ["Human", "Pigeon", "Elf", "Gnome", "Goblin", "Werewolf"];
  const classOptions = ["Bard", "Hunter", "sorcerer", "Explorer", "Barbarian"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setMessage("You must be logged in to create a character.");
      return;
    }

    const res = await fetch("/api/characters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, userId }),
    });

    if (res.ok) {
      setMessage("Character created!");
      setForm({
        name: "",
        race: "",
        class: "",
        age: "",
        gender: "",
        avatar: "",
        background: "",
      });
    } else {
      const err = await res.json();
      setMessage(`Error: ${err.error}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-4 text-emerald-700">
        Create Character
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="border p-2 w-full rounded"
        />

        {/* Race dropdown */}
        <select
          name="race"
          value={form.race}
          onChange={handleChange}
          required
          className="border p-2 w-full rounded"
        >
          <option value="">Select Race</option>
          {raceOptions.map((race) => (
            <option key={race} value={race}>
              {race}
            </option>
          ))}
        </select>

        {/* Class dropdown */}
        <select
          name="class"
          value={form.class}
          onChange={handleChange}
          required
          className="border p-2 w-full rounded"
        >
          <option value="">Select Class</option>
          {classOptions.map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>

        <input
          name="age"
          type="number"
          value={form.age}
          onChange={handleChange}
          placeholder="Age"
          className="border p-2 w-full rounded"
        />
        <input
          name="gender"
          value={form.gender}
          onChange={handleChange}
          placeholder="Gender"
          className="border p-2 w-full rounded"
        />
        <input
          name="avatar"
          value={form.avatar}
          onChange={handleChange}
          placeholder="Avatar URL"
          className="border p-2 w-full rounded"
        />
        <textarea
          name="background"
          value={form.background}
          onChange={handleChange}
          placeholder="Background"
          className="border p-2 w-full rounded"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
        >
          Save Character
        </button>
      </form>

      {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
    </div>
  );
}
