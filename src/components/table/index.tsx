import type { Bulletin, SaturdayRow, SundayRow, WednesdayRow } from "@/constants";
import { SundayTable } from "./sunday";
import { WednesdayTable } from "./wednesday";
import { SaturdayTable } from "./saturday";

type TableProps<T extends keyof Bulletin['days']> = {
  kind: T;
  rows: Bulletin['days'][T];
}

export function Table<T extends keyof Bulletin['days']>({ kind, rows }: TableProps<T>) {
  switch (kind) {
    case "sunday": return <SundayTable rows={rows as SundayRow[]} />;
    case "wednesday": return <WednesdayTable rows={rows as WednesdayRow[]} />
    case "saturday": return <SaturdayTable rows={rows as SaturdayRow[]} />
  }
}
