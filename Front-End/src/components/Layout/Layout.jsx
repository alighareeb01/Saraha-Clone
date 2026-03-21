import React, { createContext, useContext, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

const URLContext = createContext();

export const useURL = () => useContext(URLContext);

export default function Layout() {
  const [URL, setURL] = useState("");

  return (
    <URLContext.Provider value={{ URL, setURL }}>
      <div className="layout-shell">
        <Navbar />
        <Outlet />
      </div>
    </URLContext.Provider>
  );
}
