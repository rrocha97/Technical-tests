import * as dotenv from 'dotenv';

dotenv.config({ path: `.env` });

export const {
  COINMARKET_API_KEY,
  COINMARKET_API_URL,
  COINMARKET_TOTAL_CURRENCIES,
  PORT,
  BITCOIN_API_URL=`${COINMARKET_API_URL}cryptocurrency/listings/latest?limit=${COINMARKET_TOTAL_CURRENCIES}`
} = process.env;
