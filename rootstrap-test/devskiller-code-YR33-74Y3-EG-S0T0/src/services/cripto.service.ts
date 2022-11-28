
import { getCurrencies } from '../repositories/cripto.repository';
import {CRIPTO_CACHE_KEY} from '../config'
import {getCache, setCache} from '../utils/node-cache'
export async function GetTheLatestCurrencies(): Promise<any[]> {
  let concurrencies = await getCache(CRIPTO_CACHE_KEY)
  if (!concurrencies) {
    concurrencies = await getCurrencies()
    await setCache(CRIPTO_CACHE_KEY,concurrencies)
  }
  
  return concurrencies;
}


