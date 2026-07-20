import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { CONTACT } from "@/lib/data/site";

const MAX_LENGTHS = { name: 120, email: 200, project: 200, message: 5000 };

function esc(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function POST(request: Request) {
  let body: { name?: unknown; email?: unknown; project?: unknown; message?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const project = typeof body.project === "string" ? body.project.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !message) {
    return NextResponse.json(
      { error: "Name and project description are required" },
      { status: 400 }
    );
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "That email doesn't look right" }, { status: 400 });
  }
  if (
    name.length > MAX_LENGTHS.name ||
    email.length > MAX_LENGTHS.email ||
    project.length > MAX_LENGTHS.project ||
    message.length > MAX_LENGTHS.message
  ) {
    return NextResponse.json({ error: "Message too long" }, { status: 400 });
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    console.error(
      "[inquiries] GMAIL_USER / GMAIL_APP_PASSWORD not set — inquiry NOT sent:",
      { name, email, project, message }
    );
    return NextResponse.json(
      { error: "Mail is not configured on the server yet — please email me directly." },
      { status: 503 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio — Start a Project" <${user}>`,
      to: CONTACT.email,
      replyTo: email || undefined,
      subject: project
        ? `斬 Project inquiry: ${project} — from ${name}`
        : `斬 New project inquiry — ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email || "(not provided)"}`,
        `Project: ${project || "(not provided)"}`,
        "",
        "Description:",
        message,
      ].join("\n"),
      html: `
        <div style="background:#0a080e;color:#f5f4f7;padding:32px;font-family:'Segoe UI',system-ui,sans-serif;border:1px solid #2a2832;border-radius:12px;max-width:640px">
          <p style="margin:0 0 4px;font-size:11px;letter-spacing:3px;color:#c8372d;">斬 PORTFOLIO INQUIRY</p>
          <h2 style="margin:0 0 24px;font-size:22px;color:#ffffff;">New project inquiry</h2>
          <table style="border-collapse:collapse;width:100%;font-size:14px;">
            <tr>
              <td style="padding:8px 16px 8px 0;color:#a8a5b0;white-space:nowrap;vertical-align:top;">NAME</td>
              <td style="padding:8px 0;color:#ffffff;">${esc(name)}</td>
            </tr>
            <tr>
              <td style="padding:8px 16px 8px 0;color:#a8a5b0;white-space:nowrap;vertical-align:top;">EMAIL</td>
              <td style="padding:8px 0;color:#ffffff;">${email ? esc(email) : "(not provided)"}</td>
            </tr>
            <tr>
              <td style="padding:8px 16px 8px 0;color:#a8a5b0;white-space:nowrap;vertical-align:top;">PROJECT</td>
              <td style="padding:8px 0;color:#ffffff;">${project ? esc(project) : "(not provided)"}</td>
            </tr>
            <tr>
              <td style="padding:8px 16px 8px 0;color:#a8a5b0;white-space:nowrap;vertical-align:top;">BRIEF</td>
              <td style="padding:8px 0;color:#ffffff;white-space:pre-wrap;">${esc(message)}</td>
            </tr>
          </table>
        </div>
      `,
    });
  } catch (err) {
    console.error("[inquiries] sendMail failed:", err);
    return NextResponse.json(
      { error: "Could not send the message — please email me directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
