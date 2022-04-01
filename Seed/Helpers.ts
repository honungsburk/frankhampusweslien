import { Timestamp } from "firebase/firestore";

export function timestampAt(d: string): Timestamp {
  return Timestamp.fromDate(new Date(d));
}

export function adaToLovelace(d: string): string {
  return d + "000000";
}

export type TokenID = { policyID: string; tokenName: string };
