//
import Link from "next/link";
import header from "@/styles/header.module.css";

export default function HeaderPage() {
  return (
    <header className={header.maincontainer}>
      {/* Logo */}
      <div id="logo"></div>

      {/* Navigation */}
      <nav className={header.nav}>
        <Link href={"/"}>Home</Link>
        <Link href={"/adventures"}>Adventures</Link>
        <Link href={"/characters"}>Characters</Link>
        <Link href={"/about"}>About</Link>
      </nav>
    </header>
  );
}
