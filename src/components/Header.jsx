//
import Link from "next/link";

export default function HeaderPage() {
  return (
    <div>
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
