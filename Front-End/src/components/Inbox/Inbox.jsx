import axios from "axios";
import React, { useEffect, useState } from "react";
import MessageCard from "../MessageCard/MessageCard";

export default function Inbox() {
  const token = localStorage.getItem("accessToken");
  const savedRole = localStorage.getItem("currentRole") || "user";
  const authRole = savedRole === "admin" ? "admin" : "user";

  const [messages, setMessages] = useState([]);

  async function getMessages() {
    try {
      const res = await axios.get("/api/message/all", {
        headers: {
          authentication: `${authRole} ${token}`,
        },
      });

      console.log(res.data.Message);
      setMessages(res.data.Message);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  }

  async function deleltMessage(id) {
    console.log(id);

    try {
      let data = await axios.delete(`/api/message/delete/${id}`, {
        headers: {
          authentication: `${authRole} ${token}`,
        },
      });
      console.log(data);
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <section className="inbox-page">
      <div className="inbox-shell">
        <header className="inbox-header">
          <p className="inbox-kicker">Private messages</p>
          <h1 className="inbox-title">Inbox</h1>
        </header>

        <div className="inbox-card">
          <div className="inbox-card-header">
            <span className="inbox-card-title">Messages</span>
            <span className="inbox-card-meta">
              {messages?.length || 0} total
            </span>
          </div>
          <div className="inbox-card-body">
            {messages.length === 0 ? (
              <p>no messages yet</p>
            ) : (
              <div className="inbox-grid">
                {messages?.map((msg, index) => (
                  <MessageCard
                    key={msg._id || index}
                    msg={msg}
                    onDelete={deleltMessage}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
