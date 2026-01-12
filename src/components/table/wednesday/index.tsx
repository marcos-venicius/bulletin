import type { WednesdayRow } from "@/constants";
import { formatDay } from "@/utils/format-day";

type Props = {
  rows: WednesdayRow[];
}

export function WednesdayTable({ rows }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th colSpan={5} data-kind="header">
            QUARTA FEIRA - CULTO DE ENSINO ÀS 19:00H
          </th>
        </tr>
        <tr>
          <th>DIA</th>
          <th>DIREÇÃO</th>
          <th>MINISTRANTE</th>
          <th>TEMA</th>
          <th>RECEPÇÃO</th>
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
            <td>
              <input placeholder="digite aqui..." className="w-full h-full min-w-[0px]" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
