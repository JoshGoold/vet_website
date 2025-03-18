"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-4 text-sm sm:text-base">
      <Link
        className={`hover:text-blue-400 ${pathname === "/" ? "underline" : "hover:underline"}`}
        href="/"
      >
        Home
      </Link>
      <Link
        className={`hover:text-blue-400 ${pathname === "/database" ? "underline" : "hover:underline"}`}
        href="/database"
      >
        Database
      </Link>
      <Link
        className={`hover:text-blue-400 ${pathname === "/completed-stories" ? "underline" : "hover:underline"}`}
        href="/completed-stories"
      >
        Completed Stories
      </Link>
      <Link
        className={`hover:text-blue-400 ${pathname === "/news" ? "underline" : "hover:underline"}`}
        href="/news"
      >
        News
      </Link>
      <Link
        className={`hover:text-blue-400 ${pathname === "/lesson-plans" ? "underline" : "hover:underline"}`}
        href="/lesson-plans"
      >
        Lesson Plans
      </Link>
      <Link
        className={`hover:text-blue-400 ${pathname === "/research-guide" ? "underline" : "hover:underline"}`}
        href="/research-guide"
      >
        Research Guide
      </Link>
      <Link
        className={`hover:text-blue-400 ${pathname === "/about-us" ? "underline" : "hover:underline"}`}
        href="/about-us"
      >
        About Us
      </Link>
    </nav>
  );
}