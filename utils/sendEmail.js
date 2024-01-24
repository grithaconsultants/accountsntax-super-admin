
// import msalInstance from './msalConfig';
import msalInstance from './msalConfig';
import process from 'process';

const SendEmail = async () => {
  console.log("Send Email is calling ......", process.env ,msalInstance )
 

    try {
      const accounts = msalInstance.getAllAccounts();

      console.log("this is returned accounts" , accounts)

      if (accounts.length === 0) {
        throw new Error('No account found');
      }

      const result = await msalInstance.acquireTokenSilent({
        scopes: ['https://graph.microsoft.com/mail.send'],
        account: accounts[0],
      });

      console.log("this is returned result from aquire token" , result)
      const response = await fetch('https://graph.microsoft.com/v1.0/me/sendMail', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${result.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: {
            subject: 'Example Subject',
            body: {
              contentType: 'Text',
              content: 'Hello, \n\nThis is the email content.',
            },
            toRecipients: [
              {
                emailAddress: {
                  address: 'raj.chandra.kumawat@gmail.com',
                },
              },
            ],
          },
        }),
      });

      console.log("this is returned response from APi " , response)

      if (response.ok) {
        console.log('Email sent successfully');
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  
};

export default SendEmail;
