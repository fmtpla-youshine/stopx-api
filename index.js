const express = require('express');
const sendConversionEvent = require('./sendEvent');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/api/send-event', async (req, res) => {
    const { eventName, userData } = req.body;

    if (!eventName || !userData || !userData.amount) {
        return res.status(400).json({ error: "Missing required fields: eventName, userData, or userData.amount" });
    }

    try {
        const result = await sendConversionEvent(eventName, userData);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.response.data });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
});
