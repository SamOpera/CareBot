// Calls the Gemini API from the server only. The key never reaches the browser.
// Docs: https://ai.google.dev/api/generate-content

import { SYSTEM_PROMPT } from "./prompt"

export type ChatMessage = { role: "user" | "assistant"; content: string }

type Fetch = typeof fetch

const API = "https://generativelanguage.googleapis.com/v1beta/models"

export class GeminiError extends Error {}

export async function askGemini(
  messages: ChatMessage[],
  apiKey: string,
  model = "gemini-2.5-flash",
  fetcher: Fetch = fetch
): Promise<string> {
  const response = await fetcher(`${API}/${encodeURIComponent(model)}:generateContent`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-goog-api-key": apiKey },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
      generationConfig: { temperature: 0.3, maxOutputTokens: 600 },
    }),
    signal: AbortSignal.timeout(25_000),
  })

  const json = await response.json().catch(() => null)
  if (!response.ok) {
    throw new GeminiError(`Gemini request failed (${response.status}): ${json?.error?.message ?? ""}`)
  }
  if (json?.promptFeedback?.blockReason) {
    throw new GeminiError(`Gemini blocked the prompt: ${json.promptFeedback.blockReason}`)
  }

  const parts: { text?: string }[] = json?.candidates?.[0]?.content?.parts ?? []
  const text = parts.map((p) => p.text ?? "").join("").trim()
  if (!text) throw new GeminiError("Gemini returned an empty answer")
  return text
}
