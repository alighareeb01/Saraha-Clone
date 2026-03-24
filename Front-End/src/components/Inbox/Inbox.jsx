import React, { useEffect, useState } from "react";
import MessageCard from "../MessageCard/MessageCard";
import api from "../../api/axios";
import toast, { Toaster } from "react-hot-toast";

export default function Inbox() {
  const token = localStorage.getItem("accessToken");
  const savedRole = localStorage.getItem("currentRole") || "user";
  const authRole = savedRole === "admin" ? "admin" : "user";

  const [messages, setMessages] = useState([]);

  async function getMessages() {
    try {
      const res = await api.get("/message/all", {
        headers: {
          authentication: `${authRole} ${token}`,
        },
      });

      setMessages(res.data.Message);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  }

  async function deleltMessage(id) {
    try {
      await api.delete(`/message/delete/${id}`, {
        headers: {
          authentication: `${authRole} ${token}`,
        },
      });

      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  function confirmDeleteMessage(id) {
    toast((t) => (
      <div className="flex flex-col gap-3 rounded-[1.15rem] border border-[rgba(252,165,165,0.28)] bg-[rgba(8,15,29,0.96)] p-4 text-[var(--text-main)] shadow-[0_24px_48px_rgba(2,6,23,0.34)]">
        <p className="text-sm font-semibold">Delete this message?</p>
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-[rgba(148,163,184,0.22)] bg-[rgba(148,163,184,0.08)] px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--text-soft)] transition hover:bg-[rgba(148,163,184,0.16)]"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-[rgba(252,165,165,0.32)] bg-[rgba(248,113,113,0.14)] px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--danger)] transition hover:bg-[rgba(248,113,113,0.22)]"
            onClick={async () => {
              toast.dismiss(t.id);
              await deleltMessage(id);
            }}
          >
            Yes
          </button>
        </div>
      </div>
    ));
  }

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <section className="inbox-page">
      <Toaster position="top-center" toastOptions={{ duration: 6000 }} />
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
                    onDelete={confirmDeleteMessage}
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
