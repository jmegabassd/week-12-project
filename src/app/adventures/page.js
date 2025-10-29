import Link from "next/link";
import CharacterComponent from "@/components/Character";

export const metadata = {
  title: "Adventure Page - No-Name RPG",
  description: "RPG - Text Adventure Game",
};

export default function AdventurePage() {
  const activeCharacter = CharacterComponent();
  return (
    <div className="bg-slate-800 min-h-screen w-full">
      <div>
        <h1>Choose your adventure</h1>
        <Link href={"/adventures/adventure1"}>Adventure1</Link>
        <p>{activeCharacter.name}</p>
      </div>
    </div>
  );
}
