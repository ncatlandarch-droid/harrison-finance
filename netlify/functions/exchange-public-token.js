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
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { public_token } = JSON.parse(event.body);

    // 1. Exchange public token for access token
    const tokenResponse = await client.itemPublicTokenExchange({
      public_token: public_token,
    });

    const accessToken = tokenResponse.data.access_token;
    const itemId = tokenResponse.data.item_id;

    // 2. Fetch real account balances
    const accountsResponse = await client.accountsGet({
      access_token: accessToken,
    });

    // 3. Fetch real transactions (last 30 days)
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    const endDate = new Date();

    let transactions = [];
    try {
      const txnResponse = await client.transactionsGet({
        access_token: accessToken,
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0],
      });
      transactions = txnResponse.data.transactions || [];
    } catch (txnErr) {
      console.warn('Transactions get error (falling back to accounts):', txnErr.message);
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_token: accessToken,
        item_id: itemId,
        accounts: accountsResponse.data.accounts,
        transactions: transactions
      })
    };
  } catch (error) {
    console.error('Error exchanging public token:', error.response ? error.response.data : error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
