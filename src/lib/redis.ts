import { Redis } from "@upstash/redis";

let client: Redis | null | undefined;

/** Возвращает клиент Redis или null (локально, если Redis не подключён).
 *  Интеграция Vercel ↔ Upstash в разных версиях кладёт переменные под
 *  именами UPSTASH_REDIS_REST_* или KV_REST_API_*, поэтому читаем оба варианта. */
export function getRedis(): Redis | null {
  if (client !== undefined) return client;
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  client = url && token ? new Redis({ url, token }) : null;
  return client;
}
