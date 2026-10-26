"use client"

import { useEffect, useRef, useState } from "react"

type Message = {
  role: "user" | "assistant"
  content: string
  emergency?: "medical" | "crisis"
}

const SUGGESTIONS = [
  "I've had a fever and headache for 2 days",
  "How do I know if it's malaria or typhoid?",
  "My child has diarrhoea, what should I do?",
  "What are the signs of high blood pressure?",
]

const GREETING: Message = {
  role: "assistant",
  content:
    "Hi, I'm CareBot. Tell me what you're feeling, for how long, and the age of the person who is unwell. I'll explain what it could be and when to see a doctor.",
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([GREETING])
  const [input, setInput] = useState("")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  const end = useRef<HTMLDivElement>(null)

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [messages, busy])

  async function send(text: string) {
    const question = text.trim()
    if (!question || busy) return
    setError("")
    setInput("")
    const next: Message[] = [...messages, { role: "user", content: question }]
    setMessages(next)
    setBusy(true)
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        // The greeting is UI only, so it isn't sent to the server.
        body: JSON.stringify({
          messages: next.slice(1).map(({ role, content }) => ({ role, content })),
        }),
      })
      const data = await response.json().catch(() => null)
      if (!response.ok || !data?.reply) {
        setError(data?.error ?? "Something went wrong. Please try again.")
        return
      }
      setMessages((m) => [...m, { role: "assistant", content: data.reply, emergency: data.emergency }])
    } catch {
      setError("Couldn't reach CareBot. Check your connection and try again.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="chat" aria-label="Chat with CareBot">
      <div className="chat__log" role="log" aria-live="polite">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`bubble bubble--${m.role}${m.emergency ? " bubble--emergency" : ""}`}
          >
            {m.emergency && (
              <strong className="bubble__alert">
                {m.emergency === "crisis" ? "Please reach out now" : "This may be an emergency"}
              </strong>
            )}
            {m.content.split(/\n+/).map((line, j) => (
              <p key={j}>{line}</p>
            ))}
          </div>
        ))}
        {busy && (
          <div className="bubble bubble--assistant bubble--typing" aria-label="CareBot is typing">
            <span />
            <span />
            <span />
          </div>
        )}
        <div ref={end} />
      </div>

      {messages.length === 1 && (
        <div className="chips">
          {SUGGESTIONS.map((s) => (
            <button key={s} type="button" className="chip" onClick={() => send(s)}>
              {s}
            </button>
          ))}
        </div>
      )}

      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}

      <form
        className="composer"
        onSubmit={(e) => {
          e.preventDefault()
          send(input)
        }}
      >
        <label htmlFor="q" className="sr-only">
          Your health question
        </label>
        <textarea
          id="q"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              send(input)
            }
          }}
          rows={1}
          maxLength={1000}
          placeholder="Describe your symptoms..."
          disabled={busy}
        />
        <button type="submit" disabled={busy || !input.trim()}>
          Send
        </button>
      </form>
    </section>
  )
}
