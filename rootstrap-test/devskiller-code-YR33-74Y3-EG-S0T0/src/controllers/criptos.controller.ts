import { GetTheLatestCurrencies } from '../services/cripto.service';

const getCripto = async (req: any, res: any) => {
  try {
    const currencies = await GetTheLatestCurrencies();
    res.status(200).json({ total: currencies.length, currencies });
  } catch (error: any) {
    res.status(error.statusCode).json({ error: error.message });
  }
  }


export default {getCripto}
  