const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID || '6a63edaf00a3b9000d8114e4';
const PLAID_SECRET = process.env.PLAID_SECRET || '0df407f5dafe42da809d45ece1f468';
const PLAID_ENV = process.env.PLAID_ENV || 'production';

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

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { public_token } = JSON.parse(event.body);

    // Exchange public token for permanent access token
    const response = await client.itemPublicTokenExchange({
      public_token: public_token,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    // Fetch account balances immediately
    const accountsResponse = await client.accountsGet({
      access_token: accessToken,
    });

    // Fetch last 30 days of transactions including pending transactions
    const now = new Date();
    const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30)).toISOString().split('T')[0];
    const todayStr = new Date().toISOString().split('T')[0];

    let transactions = [];
    try {
      const txnsResponse = await client.transactionsGet({
        access_token: accessToken,
        start_date: thirtyDaysAgo,
        end_date: todayStr,
        options: {
          include_original_description: true,
          include_personal_finance_category: true
        }
      });
      transactions = txnsResponse.data.transactions;
    } catch (txnError) {
      console.log('Transactions initial fetch warning:', txnError.message);
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        access_token: accessToken,
        item_id: itemId,
        accounts: accountsResponse.data.accounts,
        transactions: transactions,
      }),
    };
  } catch (error) {
    console.error('Error exchanging public token:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
};
