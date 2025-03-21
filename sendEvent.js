const axios = require('axios');
require('dotenv').config();

async function sendConversionEvent(eventName, userData) {
    const payload = {
        data: [{
            event_name: eventName,
            event_time: Math.floor(Date.now() / 1000),
            user_data: userData,
            custom_data: {
                value: userData.amount,
                currency: "USD",
            }
        }],
        access_token: process.env.FACEBOOK_ACCESS_TOKEN
    };

    try {
        const response = await axios.post(`https://graph.facebook.com/v13.0/${process.env.FACEBOOK_PIXEL_ID}/events`, payload);
        return response.data;
    } catch (error) {
        console.error('Error sending conversion event:', error.response.data);
        throw error;
    }
}

module.exports = sendConversionEvent;
