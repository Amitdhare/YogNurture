const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function getAIText(issue) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
User problem: ${issue}
Explain the issue briefly and suggest general yoga precautions.
Keep it safe and simple.
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

module.exports = { getAIText };
