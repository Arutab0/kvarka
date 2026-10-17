import { appendLead, type StoredLead } from "@/lib/leads-file";
import { getRedis } from "@/lib/redis";

/** На проде (Vercel) заявки пишутся в Redis: файловая система там только
 *  для чтения. Локально, без Redis, остаётся запись в файл. */
export async function saveLead(lead: StoredLead): Promise<void> {
  const redis = getRedis();
  if (redis) {
    await redis.lpush("leads", JSON.stringify(lead));
    return;
  }
  await appendLead(lead);
}
