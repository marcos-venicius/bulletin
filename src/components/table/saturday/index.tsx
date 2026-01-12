import type { SaturdayRow } from "@/constants"
import { formatDay } from "@/utils/format-day";

type Props = {
  rows: SaturdayRow[];
}

export function SaturdayTable({ rows }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th colSpan={4} data-kind="header">
            SÁBADO - ESCOLA BÍBLICA ÀS 09:00H
          </th>
        </tr>
        <tr>
          <th>DIA</th>
          <th>FACILITADOR</th>
          <th>TEMA</th>
          <th>CULTO DIVINO</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.day}>
            <td data-align="center">{formatDay(row.day)}</td>
            <td>
              <input placeholder="digite aqui..." className="w-full h-full min-w-[0px]" />
            </td>
            <td>
              <input placeholder="digite aqui..." className="w-full h-full min-w-[0px]" />
            </td>
            <td>
              <input placeholder="digite aqui..." className="w-full h-full min-w-[0px]" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
