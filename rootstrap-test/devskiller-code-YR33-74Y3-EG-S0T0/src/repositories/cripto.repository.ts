import axios from 'axios';
import { Currency } from '../model/currency.model';
import { GetCriptoIssue } from '../model/errors.model';
import { COINMARKET_API_KEY,BITCOIN_API_URL} from '../config';




export async function getCurrencies(): Promise<any[]> {
  let result: Currency[] = [];
  try {
    let { data: { data } } = await axios
      .get(BITCOIN_API_URL, {
        headers: {
          'X-CMC_PRO_API_KEY': COINMARKET_API_KEY
        },
      });

    result = data.map((c: any) => {
      return new Currency(c.id, c.name, c.symbol, c.total_supply, c.last_updated)
    });
  } catch (error: any) {
    console.error(error);
    throw(new GetCriptoIssue ('error triying to get the concurencies'))
  };

  return result;
}
