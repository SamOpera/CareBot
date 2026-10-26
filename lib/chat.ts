// The order of decisions for every message, kept free of HTTP details so it can be tested.

import { checkEmergency } from "./emergency"
import { askGemini, type ChatMessage } from "./gemini"
import { offlineAnswer } from "./offline"

export type Reply = {
  reply: string
  source: "emergency" | "gemini" | "offline"
  emergency?: "medical" | "crisis"
}

export const MAX_MESSAGES = 12
export const MAX_CHARS = 1000

export function parseMessages(input: unknown): ChatMessage[] | null {
  if (!Array.isArray(input) || input.length === 0) return null
  const messages = input.slice(-MAX_MESSAGES)
  for (const m of messages) {
    if (!m || (m.role !== "user" && m.role !== "assistant") || typeof m.content !== "string") return null
    if (!m.content.trim() || m.content.length > MAX_CHARS) return null
  }
  if (messages[messages.length - 1].role !== "user") return null
  return messages.map((m) => ({ role: m.role, content: m.content.trim() }))
}

export async function respond(
  messages: ChatMessage[],
  env: { apiKey?: string; model?: string },
  ask: typeof askGemini = askGemini
): Promise<Reply> {
  const latest = messages[messages.length - 1].content

  // 1. Emergencies first, by rule, with no AI involved.
  const emergency = checkEmergency(latest)
  if (emergency) return { reply: emergency.reply, source: "emergency", emergency: emergency.kind }

  // 2. The AI, when a key is configured.
  if (env.apiKey) {
    try {
      return { reply: await ask(messages, env.apiKey, env.model || undefined), source: "gemini" }
    } catch (error) {
      console.error(error)
    }
  }

  // 3. Reviewed offline answers, so the app never just fails.
  return { reply: offlineAnswer(latest), source: "offline" }
}
