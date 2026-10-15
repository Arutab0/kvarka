import fs from "fs/promises";
import path from "path";

export type LeadType = "subscription" | "order" | "question";

export type LeadUtm = {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
  referrer?: string;
};

export type StoredLead = {
  timestamp: string;
  name: string;
  phone: string;
  type: LeadType;
  comment?: string;
  utm?: LeadUtm;
};

const LEADS_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(LEADS_DIR, "leads.json");

export async function appendLead(lead: StoredLead): Promise<void> {
  await fs.mkdir(LEADS_DIR, { recursive: true });

  let leads: StoredLead[] = [];
  try {
    const raw = await fs.readFile(LEADS_FILE, "utf-8");
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      leads = parsed as StoredLead[];
    }
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code !== "ENOENT") {
      throw error;
    }
  }

  leads.push(lead);
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
}
