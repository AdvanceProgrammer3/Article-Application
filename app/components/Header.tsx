"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  // console.log(user);

  return (
    <header className="flex justify-between max-w-7xl mx-auto bg-black p-8 text-white">
      <Link href="/">Our Article Community</Link>

      <div className="flex space-x-6 items-center">
        <Link
          href="/article"
          className="text-blue-400 hover:text-blue-800 font-bold"
        >
          Article
        </Link>
        {user ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <div>
            <Link href="/sign-in">Login</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
