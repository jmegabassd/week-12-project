import Link from "next/link";

export default function AdventurePage(){
    return(
        <div>
            <h1>Choose your adventure</h1>
            <Link href={"/adventures/adventure1"}>Adventure1</Link>
        </div>
    )
}