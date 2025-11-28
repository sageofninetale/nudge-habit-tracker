const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/coach", async (req, res) => {
  try {
    const { habits, completionRate, maxStreak } = req.body;

    const prompt = `
You are a warm, concise habit coach. The user is tracking these habits (JSON):

${JSON.stringify(habits, null, 2)}

Completion rate today: ${completionRate}%.
Longest streak: ${maxStreak} day(s).

Give ONE short paragraph of encouragement + 1 practical tip.
Keep it under 80 words. No emojis.
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini", // or gpt-4o-mini depending on your account
        messages: [{ role: "user", content: prompt }],
        max_tokens: 120,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenAI error:", errText);
      return res.status(500).json({ message: "AI provider error" });
    }

    const data = await response.json();
    const message =
      data.choices?.[0]?.message?.content?.trim() ??
      "I don't have any advice right now.";

    res.json({ message });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`AI coach server listening on http://localhost:${PORT}`);
});