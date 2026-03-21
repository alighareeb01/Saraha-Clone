import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useURL } from "../Layout/Layout";
import api from "../../api/axios";

export default function Dashboard() {
  const token = localStorage.getItem("accessToken");
  const savedRole = localStorage.getItem("currentRole") || "user";
  const authRole = savedRole === "admin" ? "admin" : "user";

  let [userName, setUserName] = useState("");
  // let [URL, setURL] = useState("");
  let { URL, setURL } = useURL();
  // const x = useURL();
  // console.log("conterxt");

  async function getUserName() {
    console.log(token, "token");

    try {
      let data = await api.get("/user/profile", {
        headers: {
          authentication: `${authRole} ${token}`,
        },
      });
      // console.log("here", data.data.user);
      setUserName(data.data.user.userName);
    } catch (err) {
      console.error(" error:", err.response?.data || err.message);
    }
  }

  async function getUSerURL() {
    try {
      let data = await api.get("/user/url", {
        headers: {
          authentication: `${authRole} ${token}`,
        },
      });

      // Construct dynamic URL based on current deployment
      const baseURL = window.location.origin;

      const x = data.data.profileURL.split("/")[4];
      console.log(x);
      const profileURL = `${baseURL}/user/${x}`;

      setURL(profileURL);
      console.log("Dashboard URL set:", profileURL);
    } catch (err) {
      console.error(" error:", err.response?.data || err.message);
    }
  }

  useEffect(() => {
    getUserName();
    getUSerURL();
  }, []);
  return (
    <div className="auth-page">
      <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-xl shadow-lg auth-card">
        <h1 className="text-center text-2@dashxl font-semibold text-white mb-6 auth-title">
          Welcome {userName}
        </h1>

        <p className="text-center text-body mb-6">Here is your public URL</p>

        <div className="mb-6 text-center">
          <a
            href={URL}
            target="_blank"
            rel="noreferrer"
            className="text-white underline"
          >
            {URL}
          </a>
        </div>

        <button
          className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none auth-button"
          onClick={() => navigator.clipboard.writeText(URL)}
        >
          Copy Link
        </button>
      </div>
    </div>
  );
}
