import axios from 'axios';
import process from 'process';

const sendMessage = async (moNumber) => {
  console.log(process , process.env)
  const url = 'https://graph.facebook.com/v17.0/106566122505895/messages';
  const accessToken = 'EAASbiyIR44wBAKvkZCDRaXi0peLoHqk6gXVO7N6l4xWqlZBhds31rTF43DkZBbyQWjnUqJ0JhZBDYFH2Na0RBIszb33FdrUYR65cP0LNZAv605LOMMlg6almMSPJObgnXWAqz72jqtTkiPjp7fZBbmoskYVfwXgGaNh4OSXMAatZAcHBtSX8NDZA';

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