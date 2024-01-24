const axios = require('axios');

const clientId = process.env.AZURE_AD_CLIENT_ID;
const clientSecret = process.env.AZURE_AD_CLIENT_SECRET;
const redirectUri = process.env.AZURE_AD_REDIRECT_URI;
const tenantId = process.env.AZURE_AD_TENANT_ID ;
const tenantName = process.env.AZURE_AD_TENANT_NAME ;
const authorizationCode = 'authorization_code';

async function getAccessToken() {
  try {
    const tokenEndpoint = `https://login.microsoftonline.com/${tenantName}/oauth2/v2.0/token`; // Replace {tenant} with your Azure AD tenant ID or domain name
    const requestBody = {
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      code: authorizationCode,
      grant_type: 'authorization_code',
      scope: 'openid profile offline_access Mail.Send', // Add any other required scopes
    };

    const response = await axios.post(tokenEndpoint, requestBody);
    const accessToken = response.data.access_token;

    return accessToken;
  } catch (error) {
    console.error('Error obtaining access token:', error.message);
    throw error;
  }
}

// Usage:
getAccessToken()
  .then((accessToken) => {
    console.log('Access token:', accessToken);
    // Use the access token to make requests to the Microsoft Graph API
  })
  .catch((error) => {
    // Handle error
  });

  export {getAccessToken}