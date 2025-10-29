import homepage from "@/styles/homepage.module.css";

export default function HomePage() {
  return (
    <div className={`${homepage.maincontainer} bg-slate-800 text-white`}>
      {/* Hero Section */}
      <section className="relative bg-linear-to-b from-slate-900 to-slate-800 py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-red-500 drop-shadow-lg">
            Welcome to No Name RPG
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
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

        {/* Decorative gradient element */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-slate-800 to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          <div className="bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-red-400 mb-2">
              🧙 Character Builder
            </h3>
            <p className="text-gray-300">
              Craft detailed characters with unique races, classes, and
              backstories. Your imagination is the limit.
            </p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-green-400 mb-2">
              🗺️ Dynamic Adventures
            </h3>
            <p className="text-gray-300">
              Dive into rich, evolving storylines. Choose your path, face
              challenges, and shape your destiny.
            </p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-yellow-400 mb-2">
              📜 Lore & Worldbuilding
            </h3>
            <p className="text-gray-300">
              Discover a living world filled with magic, mystery, and myth. Or
              build your own from scratch.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
