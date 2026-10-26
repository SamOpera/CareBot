import { parseMessages, respond } from "@/lib/chat"
import { allow } from "@/lib/rateLimit"

export async function POST(request: Request) {
  const visitor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local"
  if (!allow(visitor)) {
    return Response.json(
      { error: "You've sent a lot of questions. Please wait a while and try again." },
      { status: 429 }
    )
  }

  const body = await request.json().catch(() => null)
  const messages = parseMessages(body?.messages)
  if (!messages) {
    return Response.json({ error: "Please type a question (up to 1,000 characters)." }, { status: 400 })
  }

  const reply = await respond(messages, {
    apiKey: process.env.GEMINI_API_KEY,
    model: process.env.GEMINI_MODEL,
  })
  return Response.json(reply)
}
