"use client";
import homepage from "@/styles/homepage.module.css";
import { useState } from "react";

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div
      className={`${
        homepage.maincontainer
      } min-h-screen transition-colors duration-500 ${
        darkMode ? "bg-slate-800 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Dark Mode Toggle Button */}
      <div className="flex justify-end p-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-4 py-2 rounded-lg font-semibold shadow-md transition ${
            darkMode
              ? "bg-yellow-400 text-slate-900 hover:bg-yellow-300"
              : "bg-slate-800 text-white hover:bg-slate-700"
          }`}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Hero Section */}
      <section
        className={`relative py-20 px-6 text-center transition-colors duration-500 ${
          darkMode
            ? "bg-linear-to-b from-slate-900 to-slate-800"
            : "bg-linear-to-b from-gray-200 to-gray-100"
        }`}
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <h1
            className={`text-5xl md:text-6xl font-extrabold drop-shadow-lg ${
              darkMode ? "text-red-500" : "text-red-700"
            }`}
          >
            Welcome to No Name RPG
          </h1>
          <p
            className={`text-lg md:text-xl max-w-2xl mx-auto ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Forge your legend. Create characters, embark on adventures, and
            shape your own fantasy world.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="/create-character"
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition transform hover:scale-105"
            >
              Create Your Character
            </a>
            <a
              href="/adventures"
              className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition transform hover:scale-105"
            >
              Go On Adventures
            </a>
          </div>
        </div>
        <div
          className={`absolute bottom-0 left-0 right-0 h-16 ${
            darkMode
              ? "bg-linear-to-t from-slate-800 to-transparent"
              : "bg-linear-to-t from-gray-100 to-transparent"
          }`}
        />
      </section>

      {/* Features Section */}
      <section
        className={`py-16 px-6 transition-colors duration-500 ${
          darkMode ? "bg-slate-900" : "bg-gray-200"
        }`}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          <div
            className={`p-6 rounded-lg shadow-md hover:shadow-xl transition ${
              darkMode ? "bg-slate-800" : "bg-white"
            }`}
          >
            <h3 className="text-xl font-bold text-red-400 mb-2">
              🧙 Character Builder
            </h3>
            <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
              Craft detailed characters with unique races, classes, and
              backstories. Your imagination is the limit.
            </p>
          </div>
          <div
            className={`p-6 rounded-lg shadow-md hover:shadow-xl transition ${
              darkMode ? "bg-slate-800" : "bg-white"
            }`}
          >
            <h3 className="text-xl font-bold text-green-400 mb-2">
              🗺️ Dynamic Adventures
            </h3>
            <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
              Dive into rich, evolving storylines. Choose your path, face
              challenges, and shape your destiny.
            </p>
          </div>
          <div
            className={`p-6 rounded-lg shadow-md hover:shadow-xl transition ${
              darkMode ? "bg-slate-800" : "bg-white"
            }`}
          >
            <h3 className="text-xl font-bold text-yellow-400 mb-2">
              📜 Lore & Worldbuilding
            </h3>
            <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
              Discover a living world filled with magic, mystery, and myth. Or
              build your own from scratch.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
