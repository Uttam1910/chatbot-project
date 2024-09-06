// models/chatbotModel.js
const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateCompletion = async (message, retries = 3) => {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });
    return completion.choices[0].message.content;
  } catch (error) {
    if (error.response && error.response.status === 429 && retries > 0) {
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 1000 * (4 - retries))); // Exponential backoff
      return generateCompletion(message, retries - 1);
    }
    throw new Error('Failed to generate completion: ' + error.message);
  }
};

module.exports = { generateCompletion };
