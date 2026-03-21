import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const savedRole = localStorage.getItem("currentRole") || "user";
const authRole = savedRole === "admin" ? "admin" : "user";

export default function PublicProfile() {
  let [id, setID] = useState();
  const [message, setMessage] = useState("");
  const { userName } = useParams();
  const token = localStorage.getItem("accessToken");
  const backendStyleURL = `http://saraha-clone.vercel.app/user/${userName}`;

  useEffect(() => {
    if (!backendStyleURL) return;
    console.log("PublicProfile URL:", backendStyleURL);
    axios
      .post("/api/user/data-from-url", { url: backendStyleURL })
      .then((r) => setID(r.data.user._id))
      .catch((err) =>
        console.log("API Error:", err.response?.data || err.message),
      );
  }, [backendStyleURL, token]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      console.log(id, "from axios");

      const res = await axios.post("/api/message/add", {
        recieverId: id,
        content: message,
      });
      setMessage("");
    } catch (err) {
      console.error(
        "Error sending message:",
        err.response?.data || err.message,
      );
    }
  }

  return (
    <div className="auth-page">
      <form
        className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-xl shadow-lg auth-card"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-2xl font-semibold text-white mb-6 auth-title">
          Send An Anonymous Message to {userName}
        </h1>

        <div className="relative z-0 w-full mb-5 group auth-field">
          <label className="auth-label" htmlFor="public-message">
            Message
          </label>
          <textarea
            id="public-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message"
            rows="6"
            className="auth-input"
          ></textarea>
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
