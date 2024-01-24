import { PublicClientApplication } from '@azure/msal-browser';

const msalConfig = {
  auth: {
    clientId: 'c5ab04fa-241f-46dd-9550-6b8bd8fb863b',
    redirectUri: 'http://localhost:3002/clients',
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
};

const msalInstance = new PublicClientApplication(msalConfig);
console.log("this is returned msalInstance" , msalInstance)

export default msalInstance;
