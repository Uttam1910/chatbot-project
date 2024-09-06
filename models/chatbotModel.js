// models/chatbotModel.js
const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateCompletion = async (message) => {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: message }],
    });
    return completion.choices[0].message.content;
  } catch (error) {
    throw new Error('Failed to generate completion: ' + error.message);
  }
};

module.exports = { generateCompletion };
