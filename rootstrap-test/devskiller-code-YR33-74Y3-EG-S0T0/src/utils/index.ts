import axios from 'axios';
import { Currency, Exchange } from '../model/currency.model';
import { COINMARKET_API_KEY, COINMARKET_API_URL, COINMARKET_TOTAL_CURRENCIES } from '../config';

export async function GetTheLatestCurrencies(): Promise<any[]> {
  let bitcoin_api_url = COINMARKET_API_URL + 'cryptocurrency/listings/latest?limit=' + COINMARKET_TOTAL_CURRENCIES;
  let result: Currency[] = [];
  try {
    let { data: { data } } = await axios
      .get(bitcoin_api_url, {
        headers: {
          'X-CMC_PRO_API_KEY': COINMARKET_API_KEY
        },
      });

    result = data.map((c: any) => {
      return new Currency(c.id, c.name, c.symbol, c.total_supply, c.last_updated)
    });

  } catch (error: any) {
    console.error(error)
  };

  return result;
}

/* export async function GetTheExchangesList(): Promise<any[]> {
  let bitcoin_api_url = COINMARKET_API_URL + 'exchange/info';
  let result: Exchange[] = [];
  try {
    let { data: { data } } = await axios
      .get(bitcoin_api_url, {
        headers: {
          'X-CMC_PRO_API_KEY': COINMARKET_API_KEY
        },
      });

    result = data.map((c: any) => {
      return new Exchange(c.id, c.name)
    });

  } catch (error: any) {
    console.error(error)
  };

  return result;
} */
