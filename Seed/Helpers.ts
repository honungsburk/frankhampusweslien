import { Timestamp } from "firebase/firestore";

export function timestampAt(d: string): Timestamp {
  return Timestamp.fromDate(new Date(d));
}
