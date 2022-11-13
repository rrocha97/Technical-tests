
import { getCurrencies } from '../repositories/cripto.repository';

export async function GetTheLatestCurrencies(): Promise<any[]> {
  let concurrencies = await getCurrencies()
  return concurrencies;
}


