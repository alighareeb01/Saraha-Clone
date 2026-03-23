import React, { useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  let [email, setEmail] = useState("");
  let [otp, setOtp] = useState("");
  let [password, setPassword] = useState("");
  let [confrimPassword, setConfrimPassword] = useState("");
  let [msg, setMsg] = useState("");
  let [ok, setOk] = useState(false);

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
    } catch (error) {
      setOk(true);
      console.log(error.response?.data || error.message);
      console.log(error);
    }
  }
  async function resenedOTP() {
    const res = await api.put("/authentication/forget-password", {
      email: email,
    });
    console.log(res);
  }

  return (
    <div>
      <form onSubmit={resetPass}>
        <div className="mt-52 home-hero">reset password</div>
        <label htmlFor="email">enter your email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="bg-black block"
        />

        <label htmlFor="otp">enter your otp</label>
        <input
          type="text"
          name="otp"
          id="otp"
          value={otp}
          onChange={(e) => {
            setOtp(e.target.value);
          }}
          className="bg-black block"
        />
        <label htmlFor="Password">enter your password</label>
        <input
          type="Password"
          name="Password"
          id="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="bg-black block"
        />
        <label htmlFor="confrimPassword">enter your confirm password</label>
        <input
          type="password"
          name="confrimPassword"
          id="confrimPassword"
          value={confrimPassword}
          onChange={(e) => {
            setConfrimPassword(e.target.value);
          }}
          className="bg-black block"
        />
        {msg && <p className={ok ? "text-green-500" : "text-red-500"}>{msg}</p>}

        <div>
          <button type="button" onClick={resenedOTP}>
            resend otp
          </button>
        </div>
        <button type="submit">send</button>
      </form>
    </div>
  );
}
