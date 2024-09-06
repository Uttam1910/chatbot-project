// controllers/chatController.js
const { generateCompletion } = require('../models/chatbotModel');

const handleChat = async (req, res) => {
  const { message } = req.body;

  try {
    const response = await generateCompletion(message);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { handleChat };
