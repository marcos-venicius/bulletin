import { ALL_MONTHS } from "@/constants";

export function getMonthString(month: number) {
  return ALL_MONTHS.find(e => e.value === month)?.name ?? null;
}
