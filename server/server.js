const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 3003;

app.use(express.json());

app.post('/send-email', async (req, res) => {
  try {
    const { recipient, subject, body } = req.body;

    const accessToken = await getAccessToken();

    const response = await axios.post(
      'https://graph.microsoft.com/v1.0/me/sendMail',
      {
        message: {
          subject: subject,
          body: {
            contentType: 'Text',
            content: body,
          },
          toRecipients: [
            {
              emailAddress: {
                address: recipient,
              },
            },
          ],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 202) {
      res.status(200).json({ message: 'Email sent successfully' });
    } else {
      res.status(500).json({ message: 'Failed to send email' });
    }
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

const getAccessToken = async () => {
  try {
    const response = await axios.post(
      'https://login.microsoftonline.com/common/oauth2/v2.0/token',
      new URLSearchParams({
        client_id: 'c5ab04fa-241f-46dd-9550-6b8bd8fb863b',
        client_secret: 'U3W8Q~7FE_q7wfe0R3WqMtZCoguCIGgB7FtT0bS9' ,
        scope: 'https://graph.microsoft.com/.default',
        grant_type: 'client_credentials',
      })
    );

    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw new Error('Failed to get access token');
  }
};

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
