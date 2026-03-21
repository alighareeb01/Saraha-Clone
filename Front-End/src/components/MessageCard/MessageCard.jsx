import React from "react";

export default function MessageCard({ msg, onDelete }) {
  return (
    <article className="message-card">
      <h5 className="message-card-title">Message</h5>
      <p className="message-card-body">{msg.content}</p>
      <button
        className="message-card-action"
        type="button"
        onClick={() => {
          onDelete(msg._id);
        }}
      >
        Delete message
      </button>
    </article>
  );
}
