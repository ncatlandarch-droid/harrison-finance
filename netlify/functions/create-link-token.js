const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID || '6a63edaf00a3b9000d8114e4';
const PLAID_SECRET = process.env.PLAID_SECRET || '0df407f5dafe42da809d45ece1f468';
const PLAID_ENV = process.env.PLAID_ENV || 'production';

const configuration = new Configuration({
  basePath: PlaidEnvironments[PLAID_ENV] || PlaidEnvironments.production,
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
      user: { client_user_id: 'harrison_family_' + Date.now() },
      client_name: 'Harrison Finance',
      products: ['auth', 'transactions'],
      country_codes: ['US'],
      language: 'en',
    });

    return {
      statusCode: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' 
      },
      body: JSON.stringify({ link_token: response.data.link_token })
    };
  } catch (error) {
    const errorDetails = error.response && error.response.data ? error.response.data : error.message;
    console.error('Error creating Plaid production link token:', JSON.stringify(errorDetails));
    
    // Fallback attempt to development environment if production fails
    try {
      const devConfig = new Configuration({
        basePath: PlaidEnvironments.development || PlaidEnvironments.sandbox,
        baseOptions: {
          headers: {
            'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
            'PLAID-SECRET': PLAID_SECRET,
          },
        },
      });
      const devClient = new PlaidApi(devConfig);
      const devResponse = await devClient.linkTokenCreate({
        user: { client_user_id: 'harrison_family_' + Date.now() },
        client_name: 'Harrison Finance',
        products: ['auth', 'transactions'],
        country_codes: ['US'],
        language: 'en',
      });
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ link_token: devResponse.data.link_token })
      };
    } catch (e) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Plaid Token Error', details: errorDetails })
      };
    }
  }
};
