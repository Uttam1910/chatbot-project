const axios = require('axios');

// Replace with your Google Chat API webhook URL
const GOOGLE_CHAT_WEBHOOK_URL = 'https://chat.googleapis.com/v1/spaces/{space}/messages?key={key}&token={token}';

exports.sendMessage = async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post(GOOGLE_CHAT_WEBHOOK_URL, {
            text: message
        });

        res.status(200).json({ message: 'Message sent successfully', data: response.data });
    } catch (error) {
        console.error('Error sending message:', error.response?.data || error.message);
        res.status(500).json({ error: `Failed to send message: ${error.response?.data.error || error.message}` });
    }
};
