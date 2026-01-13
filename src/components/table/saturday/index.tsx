import type { Bulletin, KeysOfUnion, SaturdayRow } from "@/constants"
import { formatDay } from "@/utils/format-day";
import { useContext } from "react";
import { TableContext } from "../provider";

type Props = {
  rows: SaturdayRow[];
}

export function SaturdayTable({ rows }: Props) {
  const { changeCategoryField } = useContext(TableContext);

  function changeField(day: number, field: KeysOfUnion<Bulletin['days']['saturday'][0]>) {
    return (e: React.ChangeEvent<HTMLInputElement>) => changeCategoryField('saturday', field, day, e.target.value);
  }

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
          <tr key={row.day} className="relative">
            <td data-align="center">{formatDay(row.day)}</td>
            <td>
              <input
                placeholder="digite aqui..."
                className="w-full h-full min-w-[0px]"
                defaultValue={row.facilitator}
                onChange={changeField(row.day, "facilitator")}
              />
            </td>
            <td>
              <input
                placeholder="digite aqui..."
                className="w-full h-full min-w-[0px]"
                defaultValue={row.theme}
                onChange={changeField(row.day, "theme")}
              />
            </td>
            <td>
              <input
                placeholder="digite aqui..."
                className="w-full h-full min-w-[0px]"
                defaultValue={row.divineCult}
                onChange={changeField(row.day, "divineCult")}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
