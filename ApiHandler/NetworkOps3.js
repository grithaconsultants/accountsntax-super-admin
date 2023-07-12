import axios from 'axios';

const sendMessage = async (moNumber) => {
  const url = 'https://graph.facebook.com/v17.0/106566122505895/messages';
  const accessToken = 'EAASbiyIR44wBAAOQhzDNMxkMsd67HIzBoXJC1UP1QwDTG2HCKEbFfaCfAZB5cfZAr0vWUhqpE4rVYwfSyUse97fmRtIEAHZB14sZCNlGZBsGmLkeEL9szZApr9F7CCQ6ZAXfYiZCNGkZB98vVZC6efgM5O5TsNwpFzDaVZAq62ZAnKGZCv4tEj3PqBg5rqRNZCUBTYz63S1S461Eu7DwZDZD';

  const message = {
    messaging_product: "whatsapp",
    to: moNumber,
    type: "template",
    template: {
        name: "hello_world",
        language: {
            code: "en_US"
        }
    }
}
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await axios.post(`${url}?access_token=${accessToken}`, message, config);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export default {
	sendMessage
};