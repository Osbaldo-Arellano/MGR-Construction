import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "contact@example.com";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MIN_SUBMIT_MS = 2500;

const rateMap = new Map<string, { count: number; resetAt: number }>();

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = getIp(req);

  if (!checkRateLimit(ip)) {
    return new Response("Too many requests. Please try again later.", {
      status: 429,
    });
  }

  const body = await req.json();
  const { firstName, lastName, email, phone, services, message, source, _hp, loadedAt } = body;

  // Honeypot
  if (_hp) {
    return Response.json({ ok: true });
  }

  // Minimum time-to-submit
  const elapsed = Date.now() - Number(loadedAt ?? 0);
  if (!loadedAt || elapsed < MIN_SUBMIT_MS) {
    return Response.json({ ok: true });
  }

  // Required fields
  if (!firstName || !email || !phone) {
    return new Response("Missing required fields", { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const fullName = [firstName, lastName].filter(Boolean).join(" ");
  const servicesList =
    Array.isArray(services) && services.length > 0
      ? services.join(", ")
      : "Not specified";
  const label = source === "quote" ? "Quote Request" : "Contact Form";

  const text = [
    `New ${label} from ${fullName}`,
    "",
    `Name:     ${fullName}`,
    `Email:    ${email}`,
    `Phone:    ${phone || "Not provided"}`,
    `Services: ${servicesList}`,
    "",
    `Message:`,
    message || "(none)",
  ].join("\n");

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: CONTACT_EMAIL,
    replyTo: email,
    subject: `New ${label}: ${fullName}`,
    text,
  });

  return Response.json({ ok: true });
}
