const { useState, useEffect } = React;

const DAILY_LIMIT = 20;

// Your local knowledge base with 30 example Q&A pairs
const knowledgeBase = [
   { question: "thank you", answer: "I am glad to help you, please come back later if you need more health related questions." },
   { question: "Hi", answer: "Hello there, ask me any health related questions like, how to treat malaria?." },
  { question: "hi", answer: "Hello there, ask me any health related questions like, how to treat malaria?." },
  { question: "what is malaria", answer: "Malaria is a mosquito-borne infectious disease caused by Plasmodium parasites." },
  { question: "how to treat malaria", answer: "Malaria treatment usually involves antimalarial medications like chloroquine or artemisinin-based therapies." },
  { question: "what is typhoid", answer: "Typhoid is a bacterial infection caused by Salmonella Typhi, spread through contaminated food and water." },
  { question: "symptoms of typhoid", answer: "Common symptoms include prolonged fever, weakness, stomach pain, headache, and loss of appetite." },
  { question: "how to prevent typhoid", answer: "Prevention includes vaccination, drinking clean water, and practicing good hygiene." },
  { question: "what causes fever", answer: "Fever is caused by your body fighting infections, inflammation, or other illnesses." },
  { question: "how to reduce fever", answer: "Drink plenty of fluids, rest, and take fever-reducing medications like paracetamol or ibuprofen." },
  { question: "what is diabetes", answer: "Diabetes is a chronic condition that affects how your body processes blood sugar (glucose)." },
  { question: "symptoms of diabetes", answer: "Increased thirst, frequent urination, hunger, fatigue, and blurred vision are common symptoms." },
  { question: "how to manage diabetes", answer: "Managing diabetes includes healthy diet, exercise, medication, and regular blood sugar monitoring." },
  { question: "what is hypertension", answer: "Hypertension is high blood pressure that increases risk of heart disease and stroke." },
  { question: "how to lower blood pressure", answer: "Lifestyle changes like diet, exercise, reducing salt intake, and medication help lower blood pressure." },
  { question: "what causes cough", answer: "Coughing is caused by irritation in the throat or airways from infections, allergies, or pollutants." },
  { question: "how to treat cough", answer: "Treatment depends on cause, but staying hydrated and using cough suppressants can help." },
  { question: "what is asthma", answer: "Asthma is a lung condition that causes difficulty breathing due to inflamed airways." },
  { question: "how to manage asthma", answer: "Asthma is managed with inhalers, avoiding triggers, and following your doctor's advice." },
  { question: "what is cancer", answer: "Cancer is uncontrolled growth of abnormal cells that can spread to other parts of the body." },
  { question: "symptoms of cancer", answer: "Symptoms vary but may include lumps, unexplained weight loss, fatigue, and pain." },
  { question: "how to prevent cancer", answer: "Avoid tobacco, eat healthy, exercise, protect from sun, and get regular screenings." },
  { question: "what is HIV", answer: "HIV is a virus that attacks the immune system and can lead to AIDS if untreated." },
  { question: "how is HIV transmitted", answer: "HIV spreads through blood, sexual contact, and from mother to child during childbirth or breastfeeding." },
  { question: "how to prevent HIV", answer: "Use protection during sex, avoid sharing needles, and get tested regularly." },
  { question: "what is depression", answer: "Depression is a mood disorder causing persistent feelings of sadness and loss of interest." },
  { question: "symptoms of depression", answer: "Symptoms include low mood, fatigue, changes in appetite, and difficulty concentrating." },
  { question: "how to treat depression", answer: "Treatment includes therapy, medication, and lifestyle changes." },
  { question: "what is flu", answer: "Flu is a contagious respiratory illness caused by influenza viruses." },
  { question: "symptoms of flu", answer: "Fever, chills, cough, sore throat, body aches, and fatigue are common flu symptoms." },
  { question: "how to prevent flu", answer: "Get vaccinated annually, wash hands frequently, and avoid close contact with sick people." },
  { question: "what is COVID-19", answer: "COVID-19 is a respiratory illness caused by the SARS-CoV-2 virus." },
  { question: "how to prevent COVID-19", answer: "Wear masks, maintain social distance, wash hands, and get vaccinated." },
  { question: "symptoms of COVID-19", answer: "Fever, cough, difficulty breathing, loss of taste or smell, and fatigue." },
  { question: "what is headache", answer: "A headache is pain or discomfort in the head or scalp area." },
  { question: "causes of headache", answer: "Headaches can be caused by stress, dehydration, tension, migraine, or illness." },
  { question: "how to relieve headache", answer: "Rest, hydration, over-the-counter painkillers, and avoiding triggers can help." },
  { question: "what is anemia", answer: "Anemia is a condition where you have fewer red blood cells or less hemoglobin than normal." },
  { question: "symptoms of anemia", answer: "Fatigue, weakness, pale skin, and shortness of breath are common symptoms." },
  { question: "how to treat anemia", answer: "Treatment depends on cause but often includes iron supplements and dietary changes." },
  { question: "what is pneumonia", answer: "Pneumonia is an infection that inflames air sacs in one or both lungs." },
  { question: "symptoms of pneumonia", answer: "Cough, fever, chills, and difficulty breathing are common symptoms." },
  { question: "how to treat pneumonia", answer: "Treatment includes antibiotics for bacterial pneumonia and supportive care." },
  { question: "what is arthritis", answer: "Arthritis causes inflammation and pain in the joints." },
  { question: "symptoms of arthritis", answer: "Joint pain, stiffness, swelling, and decreased range of motion." },
  { question: "how to manage arthritis", answer: "Exercise, medication, and physical therapy help manage symptoms." },
  { question: "what is stroke", answer: "Stroke occurs when blood flow to part of the brain is interrupted or reduced." },
  { question: "symptoms of stroke", answer: "Sudden weakness, confusion, trouble speaking, and loss of balance." },
  { question: "how to prevent stroke", answer: "Control blood pressure, avoid smoking, maintain healthy weight, and exercise." },
  { question: "what is allergy", answer: "An allergy is an immune system reaction to a foreign substance." },
  { question: "common allergies", answer: "Pollen, dust mites, pet dander, food, and insect stings are common allergens." },
  { question: "symptoms of allergy", answer: "Sneezing, itching, rash, swelling, and difficulty breathing." },
  { question: "how to treat allergy", answer: "Avoid allergens, take antihistamines, and use allergy shots if prescribed." },
  { question: "what is eczema", answer: "Eczema is a condition causing inflamed, itchy, cracked, and rough skin." },
  { question: "how to treat eczema", answer: "Moisturizers, corticosteroid creams, and avoiding irritants." },
  { question: "what is obesity", answer: "Obesity is having excess body fat that may impair health." },
  { question: "health risks of obesity", answer: "Increased risk of diabetes, heart disease, stroke, and certain cancers." },
  { question: "how to manage obesity", answer: "Healthy diet, regular exercise, behavior changes, and sometimes medication or surgery." },
  { question: "what is chronic kidney disease", answer: "A gradual loss of kidney function over time." },
  { question: "symptoms of kidney disease", answer: "Fatigue, swollen ankles, frequent urination, and nausea." },
  { question: "how to prevent kidney disease", answer: "Control blood pressure, diabetes, avoid smoking, and maintain healthy weight." },
  { question: "what is hepatitis", answer: "Hepatitis is inflammation of the liver caused by viruses or other factors." },
  { question: "types of hepatitis", answer: "Hepatitis A, B, C, D, and E are the most common types." },
  { question: "how is hepatitis spread", answer: "Through contaminated food, blood, or sexual contact depending on type." },
  { question: "how to prevent hepatitis", answer: "Vaccination, safe food and water, and safe sex practices." },
  { question: "what is influenza vaccine", answer: "A vaccine to protect against seasonal flu viruses." },
  { question: "who should get flu vaccine", answer: "Everyone older than 6 months, especially high-risk groups." },
  { question: "what is tuberculosis", answer: "TB is a bacterial infection that mainly affects the lungs." },
  { question: "symptoms of TB", answer: "Persistent cough, weight loss, night sweats, and fever." },
  { question: "how to treat TB", answer: "A long course of multiple antibiotics prescribed by a doctor." },
  { question: "what is heart attack", answer: "A heart attack happens when blood flow to the heart is blocked." },
  { question: "symptoms of heart attack", answer: "Chest pain, shortness of breath, sweating, nausea." },
  { question: "how to prevent heart attack", answer: "Healthy lifestyle, controlling blood pressure and cholesterol, no smoking." },
  { question: "what is insomnia", answer: "Difficulty falling or staying asleep." },
  { question: "causes of insomnia", answer: "Stress, anxiety, medications, caffeine, or poor sleep habits." },
  { question: "how to improve sleep", answer: "Maintain a routine, avoid caffeine, create a comfortable environment." },
  { question: "what is stroke rehabilitation", answer: "Therapy to help stroke survivors regain skills and independence." },
  { question: "what is glaucoma", answer: "Glaucoma is an eye condition causing damage to the optic nerve." },
  { question: "symptoms of glaucoma", answer: "Often none early; later, loss of peripheral vision." },
  { question: "how to prevent glaucoma", answer: "Regular eye exams and managing eye pressure." },
  { question: "what is osteoporosis", answer: "A condition where bones become weak and brittle." },
  { question: "how to prevent osteoporosis", answer: "Calcium, vitamin D, exercise, and avoiding smoking." },
  { question: "what is food poisoning", answer: "Illness caused by eating contaminated food." },
  { question: "symptoms of food poisoning", answer: "Nausea, vomiting, diarrhea, stomach cramps." },
  { question: "how to prevent food poisoning", answer: "Proper food handling, cooking, and hygiene." },
  { question: "what is dehydration", answer: "Loss of more water than you take in." },
  { question: "symptoms of dehydration", answer: "Thirst, dry mouth, dizziness, dark urine." },
  { question: "how to treat dehydration", answer: "Drink plenty of fluids and electrolyte solutions." },
  { question: "what is influenza", answer: "Another term for the flu." },
  { question: "what is bronchitis", answer: "Inflammation of the lining of bronchial tubes." },
  { question: "symptoms of bronchitis", answer: "Cough, mucus production, fatigue, shortness of breath." },
  { question: "how to treat bronchitis", answer: "Rest, fluids, and sometimes inhalers or antibiotics." },
  { question: "what is gout", answer: "A form of arthritis caused by excess uric acid." },
  { question: "symptoms of gout", answer: "Sudden, severe joint pain, redness, and swelling." },
  { question: "how to manage gout", answer: "Medication, diet changes, and hydration." },
  { question: "what is measles", answer: "A highly contagious viral disease." },
  { question: "symptoms of measles", answer: "Fever, cough, runny nose, rash." },
  { question: "how to prevent measles", answer: "Vaccination." },
  { question: "what is chickenpox", answer: "A contagious viral infection causing itchy rash." },
  { question: "how to treat chickenpox", answer: "Relieve itching and prevent infection; usually resolves on its own." },
  { question: "what is eczema treatment", answer: "Moisturizers, steroid creams, and avoiding irritants." },
  { question: "what is psoriasis", answer: "An autoimmune disease causing red, scaly skin patches." },
  { question: "how to manage psoriasis", answer: "Topical treatments, light therapy, and medications." },
  { question: "what is food allergy", answer: "An immune reaction to certain foods." },
  { question: "common food allergies", answer: "Peanuts, tree nuts, milk, eggs, shellfish." },
  { question: "how to treat food allergy", answer: "Avoid allergen and carry epinephrine if severe." },
  { question: "what is dehydration treatment", answer: "Rehydration with fluids and electrolytes." },
  { question: "what is cataract", answer: "Clouding of the eye lens causing vision loss." },
  { question: "how to treat cataract", answer: "Surgery to replace the lens." },
];


// Helper: simple text similarity (lowercase includes) + Levenshtein distance for fallback
function levenshtein(a, b) {
  const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b[i - 1] === a[j - 1]) matrix[i][j] = matrix[i - 1][j - 1];
      else matrix[i][j] = 1 + Math.min(matrix[i - 1][j], matrix[i][j - 1], matrix[i - 1][j - 1]);
    }
  }
  return matrix[b.length][a.length];
}

function findBestMatch(question) {
  const q = question.toLowerCase().trim();

  // First try direct includes
  for (const item of knowledgeBase) {
    if (q.includes(item.question) || item.question.includes(q)) {
      return item.answer;
    }
  }

  // Otherwise, fallback to closest by Levenshtein distance
  let bestMatch = null;
  let bestDistance = Infinity;

  for (const item of knowledgeBase) {
    const dist = levenshtein(q, item.question);
    if (dist < bestDistance) {
      bestDistance = dist;
      bestMatch = item.answer;
    }
  }

  // Return answer only if similarity is reasonable (distance less than threshold)
  // Threshold is about half the length of user question
  if (bestDistance <= q.length / 2) {
    return bestMatch;
  }

  return null;
}

function ChatInput({ onSend, disabled }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() !== "" && !disabled) {
      onSend(input);
      setInput("");
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Ask a health question..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        disabled={disabled}
        style={{
          padding: "10px",
          width: "70%",
          marginRight: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <button
        onClick={handleSend}
        disabled={disabled}
        style={{
          padding: "10px 15px",
          backgroundColor: disabled ? "#ccc" : "#28a745",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        Send
      </button>
    </div>
  );
}

function ChatMessage({ message, sender }) {
  return (
    <div
      className={`chat-message ${sender}`}
      style={{
        margin: "10px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: sender === "user" ? "flex-end" : "flex-start",
      }}
    >
      {sender === "robot" && (
        <img
          src="https://img.icons8.com/ios-filled/50/robot-2.png"
          alt="robot"
          style={{ width: "30px", marginRight: "10px" }}
        />
      )}
      <div
        style={{
          backgroundColor: sender === "user" ? "#dcf8c6" : "#eee",
          padding: "10px",
          borderRadius: "10px",
          maxWidth: "70%",
        }}
      >
        {message}
      </div>
      {sender === "user" && (
        <img
          src="https://img.icons8.com/ios-filled/50/user.png"
          alt="user"
          style={{ width: "30px", marginLeft: "10px" }}
        />
      )}
    </div>
  );
}

function App() {
  const [messages, setMessages] = useState([
    { message: "Hello! Ask me any health question.", sender: "robot" },
  ]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const storedCount = localStorage.getItem("dailyCount");
    const storedDate = localStorage.getItem("date");
    const today = new Date().toISOString().slice(0, 10);

    if (storedDate === today && storedCount) {
      setCount(Number(storedCount));
    } else {
      localStorage.setItem("dailyCount", "0");
      localStorage.setItem("date", today);
      setCount(0);
    }
  }, []);

  const updateCount = () => {
    const newCount = count + 1;
    setCount(newCount);
    localStorage.setItem("dailyCount", String(newCount));
  };

  const handleSend = (input) => {
    if (count >= DAILY_LIMIT) {
      setMessages((msgs) => [
        ...msgs,
        {
          message: `Daily question limit reached (${DAILY_LIMIT}). Try again tomorrow.`,
          sender: "robot",
        },
      ]);
      return;
    }

    setMessages((msgs) => [...msgs, { message: input, sender: "user" }]);
    updateCount();

    const answer = findBestMatch(input);

    if (answer) {
      setMessages((msgs) => [...msgs, { message: answer, sender: "robot" }]);
    } else {
      setMessages((msgs) => [
        ...msgs,
        {
          message:
            "Sorry, I don't have an answer to that. Please try asking something else.",
          sender: "robot",
        },
      ]);
    }
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "0 auto",
        padding: 20,
        backgroundColor: "white",
        borderRadius: 8,
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      <ChatInput onSend={handleSend} disabled={count >= DAILY_LIMIT} />
      <div style={{ marginBottom: 10, fontWeight: "bold" }}>
        Questions left today: {DAILY_LIMIT - count}
      </div>
      {messages.map((msg, idx) => (
        <ChatMessage key={idx} message={msg.message} sender={msg.sender} />
      ))}
    </div>
  );
}

const root = document.getElementById("root");
ReactDOM.createRoot(root).render(<App />);    