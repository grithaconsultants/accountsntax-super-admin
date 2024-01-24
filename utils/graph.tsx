import { Client } from '@microsoft/microsoft-graph-client';

const getAuthenticatedClient = (accessToken: string) => {
  const client = Client.init({
    authProvider: (done :any) => {
      done(null, accessToken);
    }
  });

  return client;
};

const sendMail = async (accessToken: string, message: any) => {
  const client = getAuthenticatedClient(accessToken);

  const response = await client
    .api('/me/sendMail')
    .post({ message });

  return response;
};


export {getAuthenticatedClient ,sendMail}