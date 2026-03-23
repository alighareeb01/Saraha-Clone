import axios from "axios";
import React, { useState } from "react";
import api from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function ForgetPassword() {
  let [empty, setEmpty] = useState(false);
  const nav = useNavigate();
  let [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  async function sendEmail(e) {
    e.preventDefault();

    try {
      if (e.target.email.value == "") {
        setEmpty(true);
        setMsg("");
        return;
      }
      setEmpty(false);

      // console.log(e.target.email.value);
      console.log(email);

      let data = await api.put("/authentication/forget-password", {
        email: email,
      });
      if (data.data.message === "email not found") {
        setMsg("Email not found");
        return;
      }
      setMsg("");
      localStorage.setItem("canResetPassword", "true");
       const res = await api.put("/authentication/forget-password", {
         email: email,
       });
      nav("/resetpassword");

    } catch (err) {
      setMsg("Something went wrong");
      console.log(err.response?.data || err.message);
    }
  }
  return (
    <div className="mt-52 auth-page">
      <form
        onSubmit={sendEmail}
        className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-xl shadow-lg mt-12 auth-card forget-card"
      >
        <h1 className="text-center text-2xl font-semibold text-white mb-8 auth-title">
          Forget Password
        </h1>

        {msg && (
          <div className="mb-4 rounded-md bg-red-600/20 border border-red-500 p-3 text-red-400">
            {msg}
          </div>
        )}

        <div className="relative z-0 w-full mb-6 group auth-field">
          <input
            type="email"
            name="email"
            id="forget_email"
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer auth-input"
            placeholder=" "
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          {empty && (
            <p className="text-red-500 text-sm auth-error">cant be empty</p>
          )}
          <label
            htmlFor="forget_email"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto auth-label"
          >
            Email address
          </label>
        </div>

        <div className="flex items-center justify-between gap-4 mb-4">
          <Link
            to="/login"
            className="text-sm text-blue-400 underline decoration-solid hover:underline"
          >
            Back to login
          </Link>
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
