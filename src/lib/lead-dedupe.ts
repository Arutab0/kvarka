import { getRedis } from "@/lib/redis";

const WINDOW_MS = 10 * 60 * 1000;
const memory = new Map<string, number>();

function sweep(now: number): void {
  for (const [key, time] of memory) {
    if (now - time >= WINDOW_MS) memory.delete(key);
  }
}

/** true — номер новый, слот занят нами; false — дубль в течение 10 минут.
 *  В Redis это один атомарный запрос (SET NX EX), поэтому защита работает
 *  между разными экземплярами serverless-функции. Без Redis (локально) —
 *  запасной вариант на Map. */
export async function reserveSubmissionSlot(phoneKey: string): Promise<boolean> {
  const redis = getRedis();
  if (redis) {
    try {
      const res = await redis.set(`lead:dedupe:${phoneKey}`, "1", {
        nx: true,
        ex: WINDOW_MS / 1000,
      });
      return res === "OK";
    } catch (error) {
      console.error("Redis dedupe failed, using in-memory fallback:", error);
    }
  }
  const now = Date.now();
  sweep(now);
  const last = memory.get(phoneKey);
  if (last !== undefined && now - last < WINDOW_MS) return false;
  memory.set(phoneKey, now);
  return true;
}

export async function releaseSubmissionSlot(phoneKey: string): Promise<void> {
  memory.delete(phoneKey);
  const redis = getRedis();
  if (!redis) return;
  try {
    await redis.del(`lead:dedupe:${phoneKey}`);
  } catch (error) {
    console.error("Redis release failed:", error);
  }
}
