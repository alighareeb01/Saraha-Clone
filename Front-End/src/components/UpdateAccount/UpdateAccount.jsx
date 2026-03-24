import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function UpdateAccount() {
  let [name, setName] = useState("");
  let [userName, setUserName] = useState("");
  let [password, setPassword] = useState("");
  let [oldPassword, setOldPassword] = useState("");
  let [msg, setMsg] = useState("");
  let [ok, setOk] = useState(false);
  const token = localStorage.getItem("accessToken");
  const savedRole = localStorage.getItem("currentRole") || "user";
  const authRole = savedRole === "admin" ? "admin" : "user";

  const nav = useNavigate();
  async function updateUser(e) {
    e.preventDefault();

    try {
      const payload = {
        name: name,
        userName: userName,
        password: password,
        oldPassword: oldPassword,
      };

      let res = await api.put("/user/update", payload, {
        headers: {
          authentication: `${authRole} ${token}`,
        },
      });

      setMsg(res.data.msg);
      setOk(false);
      setTimeout(() => {
        nav("/profile");
      }, 4000);
    } catch (error) {
      setOk(true);
      const message =
        error.response?.data?.msg ||
        error.response?.data?.Message ||
        error.response?.data ||
        error.message;
      setMsg(message);
    }
  }

  return (
    <div className="mt-52 auth-page">
      <form
        onSubmit={updateUser}
        className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-xl shadow-lg mt-12 auth-card reset-card"
      >
        <h1 className="text-center text-2xl font-semibold text-white mb-8 auth-title">
          update user
        </h1>

        {msg && (
          <div
            className={`mb-4 rounded-md border p-3 ${
              ok
                ? "bg-red-600/20 border-red-500 text-red-400"
                : "bg-green-600/20 border-green-500 text-green-400"
            }`}
          >
            {msg}
          </div>
        )}

        <div className="relative z-0 w-full mb-5 group auth-field">
          <input
            type="text"
            name="name"
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer auth-input"
            placeholder=" "
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label
            htmlFor="name"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto auth-label"
          >
            name
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group auth-field">
          <input
            type="text"
            name="userName"
            id="userName"
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer auth-input"
            placeholder=" "
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <label
            htmlFor="userName"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto auth-label"
          >
            User Name
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group auth-field">
          <input
            type="password"
            name="Password"
            id="Password"
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer auth-input"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label
            htmlFor="Password"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto auth-label"
          >
            New password
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group auth-field">
          <input
            type="password"
            name="oldPassword"
            id="oldPassword"
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer auth-input"
            placeholder=" "
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
          <label
            htmlFor="Password"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto auth-label"
          >
            old password
          </label>
        </div>

        <button
          type="submit"
          className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none auth-button"
        >
          Send
        </button>
      </form>
    </div>
  );
}
