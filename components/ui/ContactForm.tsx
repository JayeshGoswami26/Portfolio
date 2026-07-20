"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const STATUS_TEXT: Record<Exclude<Status, "idle" | "error">, string> = {
  sending: "送 — SENDING THE SCROLL…",
  sent: "開 — SCROLL RECEIVED. I'LL REPLY WITHIN 24 HOURS.",
};

/** "Commission a blade" form — posts to /api/inquiries. */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          project: data.get("project"),
          message: data.get("description"),
        }),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        const body = await res.json().catch(() => null);
        setStatus("error");
        setErrorMsg(body?.error ?? "Something went wrong — please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error — please try again.");
    }
  }

  return (
    <form className="kform" onSubmit={handleSubmit}>
      <div className="kfield">
        <label htmlFor="f-name">
          YOUR NAME <span className="req">●</span>
        </label>
        <input
          id="f-name"
          name="name"
          type="text"
          required
          maxLength={120}
          placeholder="Miyamoto Musashi"
        />
      </div>
      <div className="kfield">
        <label htmlFor="f-email">
          YOUR EMAIL <span className="req">●</span>
        </label>
        <input
          id="f-email"
          name="email"
          type="email"
          required
          maxLength={200}
          placeholder="you@company.com"
        />
      </div>
      <div className="kfield">
        <label htmlFor="f-project">
          PROJECT NAME <span className="req">●</span>
        </label>
        <input
          id="f-project"
          name="project"
          type="text"
          required
          maxLength={200}
          placeholder="e.g. OTT platform, HR system, SaaS MVP…"
        />
      </div>
      <div className="kfield">
        <label htmlFor="f-desc">
          DESCRIPTION <span className="req">●</span>
        </label>
        <textarea
          id="f-desc"
          name="description"
          rows={6}
          required
          maxLength={5000}
          placeholder="What are we building? Scope, timeline, links — anything that helps me sharpen the first estimate."
        />
      </div>
      <div className="kform-status" role="status">
        {status === "error" ? (
          <span className="err">✕ {errorMsg.toUpperCase()}</span>
        ) : status !== "idle" ? (
          STATUS_TEXT[status]
        ) : null}
      </div>
      <button type="submit" className="contact-cta" disabled={status === "sending"}>
        <span>{status === "sending" ? "SENDING…" : "SEND THE SCROLL"}</span>
        <span className="arrow" />
      </button>
    </form>
  );
}
