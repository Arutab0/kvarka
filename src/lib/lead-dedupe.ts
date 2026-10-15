const DEDUPE_WINDOW_MS = 10 * 60 * 1000;

const lastSubmissionByPhone = new Map<string, number>();

export function checkDuplicateSubmission(phoneKey: string): boolean {
  const last = lastSubmissionByPhone.get(phoneKey);
  if (last === undefined) {
    return false;
  }
  return Date.now() - last < DEDUPE_WINDOW_MS;
}

export function reserveSubmissionSlot(phoneKey: string): void {
  lastSubmissionByPhone.set(phoneKey, Date.now());
}

export function releaseSubmissionSlot(phoneKey: string): void {
  lastSubmissionByPhone.delete(phoneKey);
}
