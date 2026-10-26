// Danger signs are caught by plain rules before any AI is called, so an emergency
// never depends on the model, an API key, or a network call.

/** Nigeria's national emergency number. Change for other countries. */
export const EMERGENCY_NUMBER = "112"

export type Emergency = { kind: "medical" | "crisis"; reply: string }

const MEDICAL: RegExp[] = [
  /chest (pain|tightness|pressure)|pain in (my|the) chest/,
  /(can'?t|cannot|can not|hard to|difficulty|trouble|struggling to) breath/,
  /short(ness)? of breath|not breathing|stopped breathing|choking/,
  /face (is )?droop|slurred speech|one side of (my|his|her|the) (body|face)/,
  /(fainted|passed out|unconscious|unresponsive|won'?t wake up)/,
  /seizure|convulsion|fitting/,
  /(heavy|severe|won'?t stop|uncontrolled) bleeding|bleeding (a lot|heavily)|vomiting blood|coughing (up )?blood/,
  /(throat|tongue|lips?) (is |are )?(swelling|swollen|closing)|anaphyla/,
  /overdose|swallowed (poison|bleach|kerosene|chemicals?)|poisoned/,
  /(snake ?bite|bitten by a snake)/,
  /(pregnant|pregnancy).{0,40}(bleeding|severe pain)|(bleeding|severe pain).{0,40}pregnan/,
  /stiff neck.{0,40}fever|fever.{0,40}stiff neck/,
  /worst headache (of|in) my life|sudden (severe|worst) headache/,
]

const CRISIS: RegExp[] = [
  /(kill|hurt|harm) (myself|my self)|suicid|end (my|it all)|don'?t want to (live|be alive)|self[- ]?harm/,
]

function normalise(text: string): string {
  return text.toLowerCase().replace(/[’`]/g, "'").replace(/\s+/g, " ")
}

export function checkEmergency(text: string): Emergency | null {
  const t = normalise(text)

  if (CRISIS.some((re) => re.test(t))) {
    return {
      kind: "crisis",
      reply:
        `I'm really sorry you're going through this, and I'm glad you said something. ` +
        `Please talk to someone right now: call ${EMERGENCY_NUMBER}, go to the nearest hospital emergency department, ` +
        `or reach a person you trust and tell them how you're feeling. If you are in immediate danger, ` +
        `call ${EMERGENCY_NUMBER} now. You don't have to deal with this alone.`,
    }
  }

  if (MEDICAL.some((re) => re.test(t))) {
    return {
      kind: "medical",
      reply:
        `What you describe can be a medical emergency. Please call ${EMERGENCY_NUMBER} or go to the ` +
        `nearest hospital emergency department now. Don't wait to see if it gets better, and don't ` +
        `drive yourself if you feel unwell. If someone is with you, ask them to help.`,
    }
  }

  return null
}
