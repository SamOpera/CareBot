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
/** The limit on what a person types. */
export const MAX_CHARS = 1000
/** CareBot's own earlier answers can be longer; anything past this is trimmed, not refused. */
export const MAX_ASSISTANT_CHARS = 6000

export function parseMessages(input: unknown): ChatMessage[] | null {
  if (!Array.isArray(input) || input.length === 0) return null
  const messages = input.slice(-MAX_MESSAGES)
  for (const m of messages) {
    if (!m || (m.role !== "user" && m.role !== "assistant") || typeof m.content !== "string") return null
    if (!m.content.trim()) return null
    if (m.role === "user" && m.content.length > MAX_CHARS) return null
  }
  if (messages[messages.length - 1].role !== "user") return null

  // Messages sent in a row (for example after a network error) become one turn,
  // so the conversation always alternates between the person and CareBot.
  const turns: ChatMessage[] = []
  for (const m of messages) {
    const content = m.role === "assistant" ? m.content.trim().slice(0, MAX_ASSISTANT_CHARS) : m.content.trim()
    const last = turns[turns.length - 1]
    if (last && last.role === m.role) last.content += "\n" + content
    else turns.push({ role: m.role, content })
  }
  return turns
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
