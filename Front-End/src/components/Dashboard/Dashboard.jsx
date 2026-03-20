import axios from "axios";
import React from "react";

export default function Dashboard() {
  function getUserName() {
    let loginToken = localStorage.getItem("loginToken");
    console.log(loginToken);

    let data = axios.get;
  }
  return (
    <div>
      <h1>dashboard</h1>
    </div>
  );
}
