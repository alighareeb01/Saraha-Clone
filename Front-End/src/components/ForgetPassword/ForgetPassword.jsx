import axios from "axios";
import React, { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

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
      nav("/resetpassword");
    } catch (err) {
      setMsg("Something went wrong");
      console.log(err.response?.data || err.message);
    }
  }
  return (
    <div className="mt-52 home-hero">
      <form onSubmit={sendEmail}>
        <label htmlFor="email">
          enter your email
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-amber-500"
          />
          {empty && <p>cant be empty</p>}
          {msg && <p className="text-red-500">{msg}</p>}
        </label>
        <button type="submit">send</button>
      </form>
    </div>
  );
}
