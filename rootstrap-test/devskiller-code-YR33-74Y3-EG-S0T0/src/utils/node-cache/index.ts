import { CacheContainer } from 'node-ts-cache'
import { MemoryStorage } from 'node-ts-cache-storage-memory'
import { TTL } from '../../config'


const myCache = new CacheContainer(new MemoryStorage())

export const getCache = async(key:string): Promise<any[]|undefined> =>{
        const result = await myCache.getItem<any[]|undefined>(key)
            return result
    }

export const setCache = async(key:string, data:any)  =>{
    await myCache.setItem(key, data, {ttl: <number>TTL})
}
