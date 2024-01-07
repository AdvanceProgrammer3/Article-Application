"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

function Sidebar() {
  const { user } = useUser();

  return (
    <div className="p-4">
      {/* Logo */}
      <Link href="/" className="font-bold text-center text-2xl">
        Aricle App
      </Link>

      {/* Menu */}
      <div className="flex flex-col space-y-6 my-20">
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

      {user ? (
        <div className="flex space-x-12 pt-[34rem] items-center">
          <UserButton afterSignOutUrl="/" />
          <p>{user.fullName}</p>
        </div>
      ) : (
        <div>
          <Link href="/sign-in">Login</Link>
        </div>
      )}
      {/* Profile Pic */}
    </div>
  );
}

export default Sidebar;
