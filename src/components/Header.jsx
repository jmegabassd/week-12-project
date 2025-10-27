//
import Link from "next/link";

import header from "@/styles/header.module.css";

export default function HeaderPage() {
  return (
    <div className={header.maincontainer}>
      <header>
        {/* Logo */}
        <div id="logo"></div>

        {/* Navigation */}
        <nav>
          <Link href={"/"}>Home</Link>
          <Link href={"/adventures"}>Adventures</Link>
          <Link href={"/about"}>About</Link>
        </nav>
      </header>
    </div>
  );
}
