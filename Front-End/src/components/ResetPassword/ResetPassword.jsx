import React, { useState } from "react";
import api from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  let [email, setEmail] = useState("");
  let [otp, setOtp] = useState("");
  let [password, setPassword] = useState("");
  let [confrimPassword, setConfrimPassword] = useState("");
  let [msg, setMsg] = useState("");
  let [ok, setOk] = useState(false);

  const nav = useNavigate();
  async function resetPass(e) {
    e.preventDefault();
    // console.log(e.target.email.value);
    // console.log(e.target.otp.value);
    // console.log(e.target.Password.value);
    // console.log(e.target.confrimPassword.value);

    try {
      const payload = {
        email: email,
        otp: otp,
        password: password,
        confrimPassword: confrimPassword,
      };

      let res = await api.put("/authentication/reset-password", payload);
      console.log(res.data.msg);
      setMsg(res.data.msg);
      setOk(false);
      localStorage.removeItem("canResetPassword");
      nav("/dashboard");
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
  async function resenedOTP() {
    const res = await api.put("/authentication/forget-password", {
      email: email,
    });
    console.log(res);
  }

  return (
    <div className="mt-52 auth-page">
      <form
        onSubmit={resetPass}
        className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-xl shadow-lg mt-12 auth-card reset-card"
      >
        <h1 className="text-center text-2xl font-semibold text-white mb-8 auth-title">
          Reset Password
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
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer auth-input"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label
            htmlFor="email"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto auth-label"
          >
            Email address
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group auth-field">
          <input
            type="text"
            name="otp"
            id="otp"
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer auth-input"
            placeholder=" "
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <label
            htmlFor="otp"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto auth-label"
          >
            OTP
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

        <div className="relative z-0 w-full mb-6 group auth-field">
          <input
            type="password"
            name="confrimPassword"
            id="confrimPassword"
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer auth-input"
            placeholder=" "
            value={confrimPassword}
            onChange={(e) => setConfrimPassword(e.target.value)}
            required
          />
          <label
            htmlFor="confrimPassword"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto auth-label"
          >
            Confirm password
          </label>
        </div>

        <div className="flex items-center justify-between gap-4 mb-4">
          <button
            type="button"
            onClick={resenedOTP}
            className="text-sm text-blue-400 underline decoration-solid hover:underline"
          >
            Resend OTP
          </button>
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
