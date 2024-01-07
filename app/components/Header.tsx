"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  // console.log(user);

  return (
    <header className="flex flex-col max-w-7xl mx-auto bg-black p-8 text-white space-y-4">
      <div className="flex space-x-6 items-center justify-between">
        <Link href="/" className="text-sm font-bold text-pink-600">
          Article App
        </Link>
        {user ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <div>
            <Link href="/sign-in">Login</Link>
          </div>
        )}
      </div>

      <div className="flex space-x-4">
        <Link
          href="/article"
          className="text-blue-400 hover:text-blue-800 font-bold"
        >
          Article
        </Link>

        <Link
          href="/about"
          className="text-blue-400 hover:text-blue-800 font-bold"
        >
          About
        </Link>
      </div>
    </header>
  );
};

export default Header;
