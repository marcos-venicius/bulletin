import type { Bulletin, SaturdayRow, SundayRow, WednesdayRow } from "@/constants";
import { SundayTable } from "./sunday";
import { WednesdayTable } from "./wednesday";
import { SaturdayTable } from "./saturday";

type TableProps<T extends keyof Bulletin['days']> = {
  kind: T;
  rows: Bulletin['days'][T];
  viewMode: boolean;
}

export function Table<T extends keyof Bulletin['days']>({ kind, rows, viewMode }: TableProps<T>) {
  switch (kind) {
    case "sunday": return <SundayTable viewMode={viewMode} rows={rows as SundayRow[]} />;
    case "wednesday": return <WednesdayTable viewMode={viewMode} rows={rows as WednesdayRow[]} />
    case "saturday": return <SaturdayTable viewMode={viewMode} rows={rows as SaturdayRow[]} />
  }
}
