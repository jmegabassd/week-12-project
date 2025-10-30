import Link from "next/link";
import CharacterComponent from "@/components/Character";
import Adventurescss from "@/styles/adventures.module.css";
import MotionPage from "@/components/motion";


export const metadata = {
  title: "Adventure Page - No-Name RPG",
  description: "RPG - Text Adventure Game",
};

export default function AdventurePage() {
  const activeCharacter = CharacterComponent();
  return (
    <div className="bg-slate-800">

        <h1 className="text-white text-2xl mt-6 ml-4">Choose your adventure</h1>

        <div className=" flex flex-row gap-4 mt-6 ml-4">

      <div className="w-64 border-2 border-red h-24 text-white p-4 font-bold text-center bg-red-600">
        
        <Link  href={"/adventures/adventure1"}>Adventure1</Link>
        <p>{activeCharacter.name}</p>
      </div>
      <div className="w-64 border-2 border-red h-24 text-white p-4 font-bold text-center bg-red-600">
        <button className={Adventurescss.adventureBtn}><Link   href={"/adventures/adventure2"} >Adventure2</Link></button>
        <p>{activeCharacter.name}</p>
      </div>
    </div>
    <div className={Adventurescss.loader}><MotionPage  /></div>
    
    </div>

  );
}
