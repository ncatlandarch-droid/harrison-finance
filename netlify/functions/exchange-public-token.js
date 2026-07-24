const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID || '6a63edaf00a3b9000d8114e4';
const PLAID_SECRET = process.env.PLAID_SECRET || 'f55a7107f90ae5b48c3e853f6c7eb4';
const PLAID_ENV = process.env.PLAID_ENV || 'sandbox';

const configuration = new Configuration({
  basePath: PlaidEnvironments[PLAID_ENV] || PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
      'PLAID-SECRET': PLAID_SECRET,
    },
  },
});

const client = new PlaidApi(configuration);

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { public_token } = JSON.parse(event.body);

    const tokenResponse = await client.itemPublicTokenExchange({
      public_token: public_token,
    });

    const accessToken = tokenResponse.data.access_token;
    const itemId = tokenResponse.data.item_id;

    const accountsResponse = await client.accountsGet({
      access_token: accessToken,
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_token: accessToken,
        item_id: itemId,
        accounts: accountsResponse.data.accounts
      })
    };
  } catch (error) {
    console.error('Error exchanging public token:', error.response ? error.response.data : error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
