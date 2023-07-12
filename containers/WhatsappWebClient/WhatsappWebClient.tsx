import qrcode from 'qrcode-terminal';
import { Client  , ClientSession, Message} from 'whatsapp-web.js';


const client = new Client() ;


client.on('ready', () => {
  console.log('WhatsApp Client is ready!');
});


client.on('qr', (qrCode :string) => {
  qrcode.generate(qrCode, { small: true });
});


client.on('authenticated', (session :ClientSession) => {
  console.log('WhatsApp Client is authenticated!');
});

client.initialize();

async function sendWhatsAppMessage(number :string, message :string): Promise<void>  {
  try {
    const chat = await client.getChatById(number);
    await chat.sendMessage(message);
    console.log('WhatsApp message sent!');
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
  }
}


export { sendWhatsAppMessage, client };
