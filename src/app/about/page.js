// About page

import about from "@/styles/about.module.css";

export default function AboutPage() {
  return (
    <div className={`${about.maincontainer} bg-slate-800 min-h-screen w-full`}>
      About our site.
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center text-red-500">
          Welcome to No Name RPG
        </h1>

        <p className="text-lg text-gray-300 leading-relaxed text-center">
          NNRPG is a storytelling platform where imagination meets adventure.
          Whether you&apos;re crafting characters, exploring new lands, or
          building your own fantasy world, this is your space to bring it all to
          life.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              🎭 Characters
            </h2>
            <p className="text-gray-300">
              Create rich, dynamic characters with unique backgrounds,
              ancestries, and classes. Your heroes (or villains) are the heart
              of your journey.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-green-400 mb-2">
              🗺️ Adventures
            </h2>
            <p className="text-gray-300">
              Dive into quests, explore magical lands, and shape your own
              narrative. Adventures are crafted to challenge, inspire, and
              surprise.
            </p>
          </div>
        </div>

        <div className="text-center mt-10">
          <p className="text-sm text-gray-400">
            We love RPG ourselves, so you can rest assured this site is made
            from a passionate team!
          </p>
        </div>
      </div>
    </div>
  );
}
