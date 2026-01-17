import type { Bulletin, KeysOfUnion, SundayRow } from "@/constants";
import { cn } from "@/lib/utils";
import { formatDay } from "@/utils/format-day";
import { Else, If } from "@/utils/If";
import { RotateCw, Sparkles } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { TableContext } from "../providers/table-context";
import { useEvents } from "../hooks";
import { KeyboardContext } from "../providers/keyboard-context";

type Props = {
  rows: SundayRow[];
  viewMode: boolean;
  index: number;
}

type RowProps = {
  row: SundayRow;
  viewMode: boolean;
  index: number;
}

function Row({ row, viewMode, index }: RowProps) {
  const { swapSpecialDay, changeCategoryField } = useContext(TableContext);

  const { touchRow } = useContext(KeyboardContext);

  const [isSpecial, setIsSpecial] = useState(false);

  const a = useRef<HTMLInputElement>(null);
  const b = useRef<HTMLInputElement>(null);
  const c = useRef<HTMLInputElement>(null);
  const d = useRef<HTMLInputElement>(null);

  const { hoverController, blurController, escapeEventController, isFocused, isHovering } = useEvents();

  function changeField(day: number, field: KeysOfUnion<Bulletin['days']['sunday'][0]>) {
    return (e: React.ChangeEvent<HTMLInputElement>) => changeCategoryField('sunday', field, day, e.target.value);
  }

  function swapSpecial(day: number) {
    swapSpecialDay("sunday", day);

    setIsSpecial(curr => !curr);
  }

  useEffect(() => {
    const refs = [a.current, b.current, c.current, d.current]

    if (refs.every(Boolean)) {
      touchRow(index, refs as HTMLInputElement[]);
    }
  }, [index, touchRow, isSpecial])

  return (
    <tr key={row.day} {...hoverController(row.day)} className="relative">
      <td data-align="center" className="font-bold text-[#1B3C53]">{formatDay(row.day)}</td>
      <td>
        <If condition={viewMode}>
          {row.direction}

          <Else>
            <input
              autoFocus={index === 0}
              ref={a}
              defaultValue={row.direction}
              placeholder="digite aqui..."
              onChange={changeField(row.day, "direction")}
              className="w-full h-full min-w-[0px]"
            />
          </Else>
        </If>
      </td>
      <td>
        <If condition={viewMode}>
          {row.preacher}

          <Else>
            <input
              ref={b}
              defaultValue={row.preacher}
              placeholder="digite aqui..."
              onChange={changeField(row.day, "preacher")}
              className="w-full h-full min-w-[0px]"
            />
          </Else>
        </If>
      </td>
      <td>
        <If condition={viewMode}>
          {row.special ? <span>{row.warn}</span> : row.singers}

          <Else>
            <div className="w-full h-full relative">
              {row.special ? (
                <input
                  ref={c}
                  key="warn"
                  {...blurController(row.day)}
                  {...escapeEventController(row.day)}
                  placeholder="digite aqui..."
                  data-outline="manual"
                  defaultValue={row.warn}
                  onChange={changeField(row.day, "warn")}
                  className={cn(
                    "w-full h-full min-w-[0px] text-[#F87B1B] font-bold",
                    (isFocused(row.day)) && "outline-[#F87B1B] outline-2",
                    (isHovering(row.day)) && "outline-2 outline-[#1B3C53]",
                  )}
                />
              ) : (
                <input
                  ref={c}
                  key="singers"
                  {...blurController(row.day)}
                  {...escapeEventController(row.day)}
                  placeholder="digite aqui..."
                  data-outline="manual"
                  defaultValue={row.singers}
                  onChange={changeField(row.day, "singers")}
                  className={cn(
                    "w-full h-full min-w-[0px]",
                    (isFocused(row.day) && !row.special) && "outline-[#1B3C53] outline-2",
                    (isHovering(row.day) && !row.special) && "outline-2 outline-[#F87B1B]",
                  )}
                />
              )}

              <If condition={isHovering(row.day)}>
                <button
                  onClick={() => swapSpecial(row.day)}
                  className={cn(
                    "absolute top-0 right-0 h-full cursor-pointer",
                    row.special && "bg-[#1B3C53]",
                    !row.special && "bg-[#F87B1B]"
                  )}>
                  <If condition={row.special}>
                    <RotateCw className="h-[80%] text-white" />
                    <Else>
                      <Sparkles className="h-[80%] text-white" />
                    </Else>
                  </If>
                </button>
              </If>
            </div>
          </Else>
        </If>
      </td>
      <td>
        <If condition={viewMode}>
          {row.recepcionist}

          <Else>
            <input
              ref={d}
              placeholder="digite aqui..."
              onChange={changeField(row.day, "recepcionist")}
              className="w-full h-full min-w-[0px]"
            />
          </Else>
        </If>
      </td>
    </tr>
  );
}

export function SundayTable({ rows, viewMode, index }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th colSpan={5} data-kind="header">
            DOMINGO - CULTO EVANGELÍSTICO ÀS 18:00H
          </th>
        </tr>
        <tr>
          <th className="w-10">DIA</th>
          <th>DIREÇÃO</th>
          <th>MINISTRANTE</th>
          <th>LOUVORES</th>
          <th>RECEPÇÃO</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => <Row key={row.day} viewMode={viewMode} row={row} index={index + i} />)}
      </tbody>
    </table>
  );
}
