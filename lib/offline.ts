// Short, reviewed answers used when no AI key is set or the AI is unavailable,
// so the app still helps instead of failing.

type Entry = { keywords: string[]; answer: string }

const SEE_DOCTOR = "If it lasts more than two or three days, gets worse, or you are worried, see a doctor."

const ENTRIES: Entry[] = [
  {
    keywords: ["malaria"],
    answer:
      "Malaria is caused by a parasite spread by mosquito bites. Common signs are fever, chills, headache, body aches and tiredness. Get a malaria test (RDT or blood film) before taking treatment, and take the full course a health worker prescribes. Sleeping under a treated net helps prevent it. Go to a clinic quickly for a child, a pregnant woman, or anyone very weak, confused or vomiting everything.",
  },
  {
    keywords: ["typhoid"],
    answer:
      "Typhoid is a bacterial infection spread through contaminated food and water. It often causes a fever that rises over several days, weakness, stomach pain, headache and loss of appetite. It needs a proper test and treatment from a health worker, so please see a doctor rather than self-treating. Clean drinking water and hand washing help prevent it.",
  },
  {
    keywords: ["fever", "temperature", "hot body"],
    answer: `A fever is usually your body fighting an infection. Rest, drink plenty of fluids and wear light clothing. In Nigeria, a fever can be malaria, so getting tested is a good idea. ${SEE_DOCTOR} Go sooner for a baby, a very high fever, a stiff neck, confusion or a rash.`,
  },
  {
    keywords: ["diarrh", "stooling", "watery stool"],
    answer:
      "For diarrhoea, the main danger is losing too much water. Drink oral rehydration salts (ORS) or plenty of clean fluids, and keep eating light food. See a doctor if there is blood in the stool, it lasts more than two days, or there are signs of dehydration such as very little urine, dizziness or a dry mouth. Babies and older people should be seen sooner.",
  },
  {
    keywords: ["headache"],
    answer: `Most headaches come from tiredness, stress, dehydration or not eating. Rest, drink water and eat something. ${SEE_DOCTOR} Get urgent help for a sudden, very severe headache, or a headache with fever and a stiff neck, weakness, confusion or vision changes.`,
  },
  {
    keywords: ["cough", "catarrh", "cold", "sore throat"],
    answer: `Coughs and colds are usually caused by viruses and get better on their own in about a week. Rest, drink warm fluids and use honey for a sore throat (not for babies under one). ${SEE_DOCTOR} See a doctor sooner if you cough up blood, have trouble breathing, or have had a cough for more than three weeks.`,
  },
  {
    keywords: ["blood pressure", "hypertension", "bp"],
    answer:
      "High blood pressure often has no symptoms, so the only way to know is to have it checked. Less salt, regular exercise, a healthy weight and not smoking all help. If you have been prescribed medicine, keep taking it as directed and check your pressure regularly.",
  },
  {
    keywords: ["diabetes", "sugar level", "blood sugar"],
    answer:
      "Common signs of diabetes are being very thirsty, passing urine often, tiredness and blurred vision. A simple blood sugar test can check for it. If you have these signs, please see a doctor. With treatment, diet and exercise, diabetes can be well controlled.",
  },
]

export function offlineAnswer(question: string): string {
  const q = question.toLowerCase()
  const match = ENTRIES.find((e) => e.keywords.some((k) => q.includes(k)))
  if (match) return match.answer
  return "I can share general information about common symptoms like fever, malaria, typhoid, headache, cough or diarrhoea. Tell me what you're feeling and for how long. For anything serious or lasting, please see a doctor."
}
