const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID || '0df407f5dafe42da809d45ece1f468';
const PLAID_SECRET = process.env.PLAID_SECRET || 'f55a7107f90ae5b48c3e853f6c7eb4';
const PLAID_ENV = process.env.PLAID_ENV || 'sandbox';

const configuration = new Configuration({
  basePath: PlaidEnvironments[PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
      'PLAID-SECRET': PLAID_SECRET,
    },
  },
});

const client = new PlaidApi(configuration);

exports.handler = async function(event, context) {
  try {
    const response = await client.linkTokenCreate({
      user: { client_user_id: 'harrison_family_user' },
      client_name: 'Harrison Finance',
      products: ['auth', 'transactions'],
      country_codes: ['US'],
      language: 'en',
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ link_token: response.data.link_token })
    };
  } catch (error) {
    console.error('Error creating Plaid link token:', error.response ? error.response.data : error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
