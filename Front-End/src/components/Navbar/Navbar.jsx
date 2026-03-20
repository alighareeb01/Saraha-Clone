import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-black text-amber-50 fixed top-0 w-full px-6 py-3 app-nav">
      <ul className="flex justify-between items-center w-full app-nav-list">
        <li className="app-brand">Saraha Clone</li>

        <li className="flex gap-6 app-nav-links">
          <a className="app-nav-link" href="/">
            Home
          </a>
          <a className="app-nav-link" href="/login">
            Login
          </a>
          <a className="app-nav-link" href="/register">
            Register
          </a>
        </li>
      </ul>
    </div>
  );
}
