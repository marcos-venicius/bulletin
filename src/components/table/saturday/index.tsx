import type { Bulletin, KeysOfUnion, SaturdayRow } from "@/constants"
import { formatDay } from "@/utils/format-day";
import { useContext, useEffect, useRef } from "react";
import { TableContext } from "../providers/table-context";
import { Else, If } from "@/utils/If";
import { KeyboardContext } from "../providers/keyboard-context";

type Props = {
  rows: SaturdayRow[];
  viewMode: boolean;
  index: number;
}

type RowProps = {
  row: SaturdayRow;
  viewMode: boolean;
  index: number;
}

function Row({ viewMode, index, row }: RowProps) {
  const { changeCategoryField } = useContext(TableContext);
  const { touchRow } = useContext(KeyboardContext);

  const a = useRef<HTMLInputElement>(null);
  const b = useRef<HTMLInputElement>(null);
  const c = useRef<HTMLInputElement>(null);

  function changeField(day: number, field: KeysOfUnion<Bulletin['days']['saturday'][0]>) {
    return (e: React.ChangeEvent<HTMLInputElement>) => changeCategoryField('saturday', field, day, e.target.value);
  }

  useEffect(() => {
    const refs = [a.current, b.current, c.current]

    if (refs.every(Boolean)) {
      touchRow(index, refs as HTMLInputElement[]);
    }
  }, [index, touchRow])

  return (
    <tr key={row.day} className="relative">
      <td data-align="center" className="text-[#1B3C53] font-bold">{formatDay(row.day)}</td>
      <td>
        <If condition={viewMode}>
          {row.facilitator}

          <Else>
            <input
              ref={a}
              placeholder="digite aqui..."
              className="w-full h-full min-w-[0px]"
              defaultValue={row.facilitator}
              onChange={changeField(row.day, "facilitator")}
            />
          </Else>
        </If>
      </td>
      <td>
        <If condition={viewMode}>
          {row.theme}

          <Else>
            <input
              ref={b}
              placeholder="digite aqui..."
              className="w-full h-full min-w-[0px]"
              defaultValue={row.theme}
              onChange={changeField(row.day, "theme")}
            />
          </Else>
        </If>
      </td>
      <td>
        <If condition={viewMode}>
          {row.divineCult}

          <Else>
            <input
              ref={c}
              placeholder="digite aqui..."
              className="w-full h-full min-w-[0px]"
              defaultValue={row.divineCult}
              onChange={changeField(row.day, "divineCult")}
            />
          </Else>
        </If>
      </td>
    </tr>
  );
}

export function SaturdayTable({ rows, viewMode, index }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th colSpan={4} data-kind="header">
            SÁBADO - ESCOLA BÍBLICA ÀS 09:00H
          </th>
        </tr>
        <tr>
          <th className="w-10">DIA</th>
          <th>FACILITADOR</th>
          <th>TEMA</th>
          <th>CULTO DIVINO</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => <Row key={row.day} index={i + index} viewMode={viewMode} row={row} />)}
      </tbody>
    </table>
  );
}
