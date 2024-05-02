"use client";
import React from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
function Navbar() {
  const user = useUser();
  return (
    <div className="navbar bg-slate-400 ">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href={"/"}>
          Zaplock
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {user.user ? (
            <li>
              <a href="/api/auth/logout">
                <button className="btn btn-error m-0">
                  Logout
                </button>
              </a>
            </li>
          ) : (
            <li>
              <Link href={"/login"}>Login/SignUp</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
