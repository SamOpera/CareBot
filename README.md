# CareBot – Your AI Health Assistant 🤖❤️

**Live Site:** [care-bot-fk6o.vercel.app](https://care-bot-fk6o.vercel.app)

CareBot is an intelligent, conversational health assistant built to provide preliminary symptom guidance, health awareness, and access to curated medical knowledge. It leverages cutting-edge AI capabilities to offer a user-friendly experience for basic health assistance, symptom clarification, and condition awareness — especially in communities with limited access to professional healthcare.

---

## 🌍 Vision & Purpose

Access to reliable health information remains a challenge in many underserved regions. **CareBot** was created to:

* Help users better understand common symptoms and conditions.
* Empower people to make informed decisions before reaching a doctor.
* Serve as a virtual health assistant that promotes preventive care awareness.

> ⚠️ **Disclaimer:** CareBot is not a diagnostic or emergency tool. Always consult a licensed physician for medical advice or emergencies.

---

## ✨ Features

* 🤖 **Conversational Interface**: Chat with a friendly assistant that asks relevant questions (name, age, gender, symptoms).
* 🔍 **Symptom Parsing**: Uses AI to interpret symptom descriptions.
* 📚 **Health Knowledgebase**: Includes fallback answers for common conditions like malaria, typhoid, asthma, etc.
* ⏳ **Usage Throttling**: Limits excessive use to prevent spam; supports per-hour usage tracking.
* 💬 **Natural Language Interaction**: Designed to feel intuitive and human-like.
* 🧠 **Powered by AI APIs**: Can integrate with tools like Infermedica, OpenAI, or DeepSeek (depending on available keys and usage).

---

## 🔧 Tech Stack

* **Frontend**: HTML, CSS, Vanilla JavaScript with React via Babel (no build tools)
* **Backend (Optional APIs)**:

  * [Infermedica API](https://developer.infermedica.com/) – for symptom parsing and health triage (free trial available)
  * [DeepSeek](https://deepseek.com/) or [OpenAI](https://platform.openai.com/) – for language-based responses (paid)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/SamOpera/CareBot.git
cd CareBot
```

### 2. Set Up the Environment

You can run the app locally by opening `index.html` in a browser. No build tools needed.

For more complex integrations (like APIs):

* Set your API keys inside `app.js`:

```js
const API_KEY = "your_api_key_here";
```

### 3. Deploy

Deploy easily on:

* [Vercel](https://vercel.com/)
* GitHub Pages
* Netlify
  Just drag and drop the `index.html` and scripts.

---

## 🧠 How It Works

1. **Greets the user** and gathers:

   * Name
   * Age
   * Gender
   * Symptom description
2. **Parses symptom input** using AI APIs or predefined logic.
3. **Returns condition insights** or fallback messages based on known health issues.
4. **Tracks usage** to avoid overuse, with a cooldown mechanism (e.g., 1-hour window).

---

## 🛡️ Security & Privacy

* No personal health data is stored.
* Sessions are tracked using `localStorage` only.
* You are responsible for managing your API keys securely.

---

## 📦 Future Improvements

* ✅ Multi-language support
* ✅ Better symptom-to-condition matching
* ⏳ Referral to real clinics or hospitals based on location
* ⏳ Integration with WhatsApp or Telegram for field use
* ⏳ Offline-first PWA capabilities for rural areas

---

## 🤝 Contributing

Want to help improve CareBot?

1. Fork this repo
2. Create a new branch (`git checkout -b feature-xyz`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature-xyz`)
5. Create a Pull Request

---

## 👨‍💻 Author

Built with ❤️ by [SamOpera](https://github.com/SamOpera)
Project for health innovation and digital humanitarianism.

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

