"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, Phone, ArrowRight, RotateCcw } from "lucide-react";
import { useBrand } from "@/contexts/brand-context";
import { QuoteModal } from "@/components/sections/shared/quote-modal";

// ── Types ─────────────────────────────────────────────────────────────────────
type Flow =
  | "greeting" // initial quick replies
  | "storm" // storm damage path
  | "collect" // name → email → message
  | "submitting"
  | "success"
  | "error";

type CollectStep = "name" | "email" | "message";

interface Message {
  id: number;
  from: "bot" | "user";
  text: string;
}

// ── Quick reply sets ──────────────────────────────────────────────────────────
const GREETING_REPLIES = [
  { label: "Storm damage", value: "storm" },
  { label: "Free inspection", value: "inspection" },
  { label: "Get a quote", value: "quote" },
  { label: "Something else", value: "other" },
] as const;

const STORM_REPLIES = [
  { label: "Call right now", value: "call" },
  { label: "Leave my info", value: "leave_info" },
] as const;

// ── Component ─────────────────────────────────────────────────────────────────
export function RoofChatWidget() {
  const { brand } = useBrand();

  const [open, setOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [flow, setFlow] = useState<Flow>("greeting");
  const [collectStep, setCollectStep] = useState<CollectStep>("name");
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [inputVal, setInputVal] = useState("");
  const [openedAt] = useState(() => Date.now());
  const suppressFocusRef = useRef(false);

  const msgIdRef = useRef(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when entering collect flow — but not on panel open
  useEffect(() => {
    if (flow === "collect") {
      if (suppressFocusRef.current) {
        suppressFocusRef.current = false;
        return;
      }
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [flow, collectStep]);

  const addMsg = useCallback((from: "bot" | "user", text: string) => {
    setMessages((prev) => [...prev, { id: ++msgIdRef.current, from, text }]);
  }, []);

  const botSay = useCallback(
    (text: string, delay = 400) => {
      setTimeout(() => addMsg("bot", text), delay);
    },
    [addMsg],
  );

  // ── Open / close ──────────────────────────────────────────────────────────
  function handleOpen() {
    suppressFocusRef.current = true;
    setOpen(true);

    // Greeting message on first open
    if (messages.length === 0) {
      setTimeout(() => {
        addMsg(
          "bot",
          `Hi there. I'm here to help with any roofing questions. What can I do for you today?`,
        );
      }, 300);
    }
  }

  function handleClose() {
    setOpen(false);
  }

  function handleReset() {
    setMessages([]);
    setFlow("greeting");
    setCollectStep("name");
    setFormData({ name: "", email: "" });
    setInputVal("");
    setTimeout(() => {
      addMsg("bot", `Hi again. What can I help you with?`);
    }, 300);
  }

  // ── Quick replies ─────────────────────────────────────────────────────────
  function handleQuickReply(label: string, value: string) {
    addMsg("user", label);

    switch (value) {
      case "storm":
        setFlow("storm");
        botSay(
          `Storm damage is urgent. We respond same-day. You can call us right now at ${brand.company.phone}, or leave your info and we'll call you back soon.`,
        );
        break;

      case "inspection":
      case "quote":
        setOpen(false);
        setQuoteOpen(true);
        break;

      case "other":
        setFlow("collect");
        setCollectStep("name");
        botSay(`Sure, I'll connect you with our team. What's your name?`);
        break;

      case "leave_info":
        setFlow("collect");
        setCollectStep("name");
        botSay(`Got it. What's your name?`);
        break;
    }
  }

  // ── Collect flow (name → email → message → submit) ────────────────────────
  async function handleSend() {
    const val = inputVal.trim();
    if (!val) return;
    setInputVal("");
    addMsg("user", val);

    if (flow !== "collect") return;

    if (collectStep === "name") {
      const firstName = val.split(" ")[0];
      setFormData((prev) => ({ ...prev, name: val }));
      setCollectStep("email");
      botSay(
        `Nice to meet you, ${firstName}! What's the best email address to reach you?`,
      );
    } else if (collectStep === "email") {
      setFormData((prev) => ({ ...prev, email: val }));
      setCollectStep("message");
      botSay(
        `Perfect. Briefly describe what's going on, or just say "schedule inspection" if you're not sure yet.`,
      );
    } else if (collectStep === "message") {
      const final = { ...formData, message: val };
      setFlow("submitting");
      botSay(`On it. Sending your info to our team now...`, 300);

      try {
        const elapsed = Date.now() - openedAt;
        const loadedAt = Date.now() - Math.max(elapsed, 3000);

        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: final.name.split(" ")[0] || final.name,
            lastName: final.name.split(" ").slice(1).join(" ") || "",
            email: final.email,
            phone: "",
            services: [],
            message: `[Chat Widget]\n${final.message}`,
            source: "contact",
            _hp: "",
            loadedAt,
          }),
        });

        if (!res.ok) throw new Error("non-ok");

        setFlow("success");
        botSay(
          `You're all set, ${final.name.split(" ")[0]}. Our team will reach out to you shortly. You can also call us anytime at ${brand.company.phone}.`,
          500,
        );
      } catch {
        setFlow("error");
        botSay(
          `Something went wrong on our end. Please call us directly at ${brand.company.phone}. We're available 24/7.`,
          500,
        );
      }
    }
  }

  // ── Which quick reply set to show ─────────────────────────────────────────
  const activeReplies =
    flow === "greeting"
      ? GREETING_REPLIES
      : flow === "storm"
        ? STORM_REPLIES
        : [];

  const showInput = flow === "collect";

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Quote modal ────────────────────────────────────────────────── */}
      <QuoteModal open={quoteOpen} onOpenChange={setQuoteOpen} />

      {/* ── Chat panel ─────────────────────────────────────────────────── */}
      {open && (
        <div
          className="fixed right-12 z-[60] w-[calc(100vw-4rem)] max-w-[380px] flex flex-col  border border-border bg-background shadow-2xl overflow-hidden"
          style={{
            top: "50%",
            animation: "chatSlideIn 0.25s cubic-bezier(0.22,1,0.36,1) forwards",
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-primary text-primary-foreground shrink-0">
            <div className="w-9 h-9  bg-white/15 flex items-center justify-center shrink-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  brand.assets.logo.icon ||
                  brand.assets.logo.uploaded ||
                  brand.assets.logo.light
                }
                alt={brand.company.name}
                className="w-7 h-7 object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold leading-none truncate">
                {brand.company.name}
              </p>
              <p className="text-[11px] opacity-70 mt-0.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5  bg-green-400 inline-block shrink-0" />
                We'll get back to you ASAP
              </p>
            </div>
            <div className="flex items-center gap-1">
              {(flow === "success" || flow === "error") && (
                <button
                  onClick={handleReset}
                  className="p-1.5  hover:bg-white/10 transition-colors"
                  aria-label="Start over"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={handleClose}
                className="p-1.5  hover:bg-white/10 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-[180px] max-h-[320px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`
                    max-w-[82%] px-3.5 py-2.5  text-sm leading-relaxed
                    ${
                      msg.from === "bot"
                        ? "bg-muted text-foreground "
                        : "bg-primary text-primary-foreground "
                    }
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          {activeReplies.length > 0 && (
            <div className="px-4 pb-3 flex flex-wrap gap-2 shrink-0">
              {activeReplies.map((r) =>
                r.value === "call" ? (
                  <a
                    key={r.value}
                    href={`tel:${brand.company.phone.replace(/\D/g, "")}`}
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5  border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                  >
                    <Phone className="w-3 h-3" />
                    {brand.company.phone}
                  </a>
                ) : (
                  <button
                    key={r.value}
                    onClick={() => handleQuickReply(r.label, r.value)}
                    className="inline-flex items-center text-xs font-medium px-3 py-1.5  border border-border hover:border-primary hover:text-primary transition-colors duration-200"
                  >
                    {r.label}
                  </button>
                ),
              )}
            </div>
          )}

          {/* Text input (collect flow) */}
          {showInput && (
            <div className="px-3 pb-3 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder={
                    collectStep === "name"
                      ? "Your name..."
                      : collectStep === "email"
                        ? "your@email.com"
                        : "Describe your situation..."
                  }
                  className="flex-1 text-sm bg-muted  px-3.5 py-2.5 outline-none border border-transparent focus:border-primary transition-colors placeholder:text-muted-foreground/60"
                  autoComplete={
                    collectStep === "name"
                      ? "name"
                      : collectStep === "email"
                        ? "email"
                        : "off"
                  }
                />
                <button
                  type="submit"
                  disabled={!inputVal.trim()}
                  className="w-10 h-10  bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 active:scale-95 disabled:opacity-30 transition-all shrink-0"
                  aria-label="Send"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* Success actions */}
          {flow === "success" && (
            <div className="px-4 pb-4 pt-1 flex gap-2 shrink-0">
              <a
                href={`tel:${brand.company.phone.replace(/\D/g, "")}`}
                className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5  border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                Call Now
              </a>
              <button
                onClick={handleClose}
                className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5  bg-muted hover:bg-muted/70 transition-colors"
              >
                Close
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Error action */}
          {flow === "error" && (
            <div className="px-4 pb-4 pt-1 shrink-0">
              <a
                href={`tel:${brand.company.phone.replace(/\D/g, "")}`}
                className="flex w-full items-center justify-center gap-2 text-xs font-semibold py-2.5  bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <Phone className="w-3.5 h-3.5" />
                {brand.company.phone}
              </a>
            </div>
          )}

          {/* Footer */}
          <div className="px-4 py-2 border-t border-border bg-muted/20 text-center shrink-0">
            <p className="text-[10px] text-muted-foreground/50">
              Powered by <span className="font-semibold">BrandSync</span>
            </p>
          </div>
        </div>
      )}

      {/* ── Trigger button ─────────────────────────────────────────────── */}
      <div className="fixed right-0 z-[60] top-[75%]">
        {/* Pulsating rings — only when closed */}
        {!open && (
          <>
            <span
              className="absolute inset-0  bg-primary opacity-25"
              style={{ animation: "roofPulse 2.2s ease-out infinite" }}
            />
            <span
              className="absolute inset-0  bg-primary opacity-15"
              style={{
                animation: "roofPulse 2.2s ease-out infinite",
                animationDelay: "0.55s",
              }}
            />
          </>
        )}

        <button
          onClick={open ? handleClose : handleOpen}
          className="relative w-7 h-12 sm:w-12 sm:h-20 rounded-l-lg  bg-primary text-primary-foreground shadow-xl hover:shadow-primary/40 active:scale-95 transition-all duration-200 flex items-center justify-center"
          aria-label={open ? "Close chat" : "Chat with us"}
        >
          {open ? (
            <X className="w-5 h-5" />
          ) : (
            <span
              className="text-[7px] sm:text-[10px] font-bold uppercase tracking-widest leading-none"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              Question?
            </span>
          )}
        </button>
      </div>

      {/* ── Keyframes ──────────────────────────────────────────────────── */}
      <style>{`
        @keyframes roofPulse {
          0%   { transform: scale(1);    opacity: 0.25; }
          70%  { transform: scale(1.7);  opacity: 0; }
          100% { transform: scale(1.7);  opacity: 0; }
        }
        @keyframes chatSlideIn {
          from { opacity: 0; transform: translateY(-50%) translateX(12px); }
          to   { opacity: 1; transform: translateY(-50%) translateX(0); }
        }
      `}</style>
    </>
  );
}
