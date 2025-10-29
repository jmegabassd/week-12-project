//
"use client";
import Link from "next/link";
import header from "@/styles/header.module.css";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function HeaderPage() {
  const activeLink = usePathname();

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/adventures", label: "ADVENTURES" },
    { href: "/about", label: "ABOUT" },
  ];
  return (
    <header className={`${header.maincontainer} bg-blue-900`}>
      {/* Logo */}
      <div className={header.imagecontainer}>
        <Image
          src="/images/logo/nnrpg-logo.png"
          alt="Site logo."
          className={header.image}
          sizes="100%"
          fill={true}
          priority={true}
        />
      </div>

      {/* Navigation */}
      <nav className="flex space-x-6 text-white font-semibold text-lg">
        {navLinks.map(({ href, label }, index) => (
          <div key={href} className="flex items-center space-x-2">
            <Link
              href={href}
              className={`hover:underline ${
                activeLink === href
                  ? "bg-red-600 text-white px-3 py-1 rounded-md shadow-md"
                  : "hover:bg-red-900 px-3 py-1 rounded-md"
              }`}
            >
              {label}
            </Link>
            {index < navLinks.length - 1 && (
              <span className="text-white">|</span>
            )}
          </div>
        ))}
      </nav>
    </header>
  );
}
