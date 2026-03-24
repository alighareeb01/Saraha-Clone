import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Profile() {
  const token = localStorage.getItem("accessToken");
  const savedRole = localStorage.getItem("currentRole") || "user";
  const authRole = savedRole === "admin" ? "admin" : "user";

  const nav = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getProfile() {
      try {
        const res = await api.get("/user/profile", {
          headers: {
            authentication: `${authRole} ${token}`,
          },
        });

        setUser(res.data.user);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.response?.data?.Message ||
            err.message,
        );
      }
    }

    getProfile();
  }, [authRole, token]);

  async function deleteUser() {
    try {
      const res = await api.delete("/user/delete", {
        headers: {
          authentication: `${authRole} ${token}`,
        },
      });

      if (res.data.Message == "deleted successfully") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("currentRole");
        localStorage.removeItem("canResetPassword");
        localStorage.removeItem("refreshToken");

        setTimeout(() => {
          nav("/");
        }, 3000);
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  }

  function confirmDelete() {
    toast((t) => (
      <div className="flex flex-col gap-3 rounded-[1.15rem] border border-[rgba(252,165,165,0.28)] bg-[rgba(8,15,29,0.96)] p-4 text-[var(--text-main)] shadow-[0_24px_48px_rgba(2,6,23,0.34)]">
        <p className="text-sm font-semibold">Delete your account permanently?</p>
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
              await deleteUser();
            }}
          >
            Yes
          </button>
        </div>
      </div>
    ));
  }

  function updateUser() {
    nav("/updateaccount");
  }

  return (
    <div className="auth-page">
      <Toaster position="top-center" toastOptions={{ duration: 6000 }} />
      <div className="w-full max-w-2xl mx-auto bg-gray-900 p-8 rounded-xl shadow-lg auth-card">
        <div className="flex flex-col gap-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(125,211,252,0.18)] bg-[rgba(56,189,248,0.12)] text-[var(--accent)] shadow-[0_18px_34px_rgba(2,6,23,0.2)]">
                <svg
                  className="h-8 w-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <div>
                <p className="mb-2 inline-flex items-center rounded-full border border-[rgba(125,211,252,0.2)] bg-[rgba(56,189,248,0.08)] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
                  Profile Overview
                </p>
                <h2 className="font-['Sora'] text-3xl font-bold tracking-[-0.04em] text-[var(--text-main)]">
                  {user?.name || "Loading profile"}
                </h2>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  @{user?.userName || "username"}
                </p>
              </div>
            </div>

            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${
                user?.isVerified
                  ? "border-[rgba(125,211,252,0.22)] bg-[rgba(56,189,248,0.12)] text-[var(--accent)]"
                  : "border-[rgba(251,191,36,0.22)] bg-[rgba(251,191,36,0.12)] text-[var(--accent-warm)]"
              }`}
            >
              {user?.isVerified ? "Verified" : "Not Verified"}
            </span>
          </div>

          {error && (
            <div className="rounded-[1.15rem] border border-[rgba(252,165,165,0.28)] bg-[rgba(248,113,113,0.1)] px-4 py-3 text-sm font-semibold text-[var(--danger)]">
              {error}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.25rem] border border-[rgba(148,163,184,0.16)] bg-[rgba(9,18,31,0.75)] p-4 shadow-[0_18px_34px_rgba(2,6,23,0.18)]">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                Name
              </p>
              <p className="text-base font-semibold text-[var(--text-main)] break-words">
                {user?.name || "-"}
              </p>
            </div>

            <div className="rounded-[1.25rem] border border-[rgba(148,163,184,0.16)] bg-[rgba(9,18,31,0.75)] p-4 shadow-[0_18px_34px_rgba(2,6,23,0.18)]">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                Username
              </p>
              <p className="text-base font-semibold text-[var(--text-main)] break-words">
                {user?.userName || "-"}
              </p>
            </div>

            <div className="rounded-[1.25rem] border border-[rgba(148,163,184,0.16)] bg-[rgba(9,18,31,0.75)] p-4 shadow-[0_18px_34px_rgba(2,6,23,0.18)] sm:col-span-2">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                Email
              </p>
              <p className="text-base font-semibold text-[var(--text-main)] break-words">
                {user?.email || "-"}
              </p>
            </div>

            <div className="rounded-[1.25rem] border border-[rgba(148,163,184,0.16)] bg-[rgba(9,18,31,0.75)] p-4 shadow-[0_18px_34px_rgba(2,6,23,0.18)] sm:col-span-2">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                Verification Status
              </p>
              <p className="text-base font-semibold text-[var(--text-main)]">
                {user?.isVerified
                  ? "Account is verified"
                  : "Account is not verified yet"}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none auth-button"
              onClick={updateUser}
            >
              Update account
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center self-start w-full sm:w-auto text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
              onClick={confirmDelete}
            >
              Delete account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
