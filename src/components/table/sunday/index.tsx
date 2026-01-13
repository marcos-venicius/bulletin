import type { Bulletin, KeysOfUnion, SundayRow } from "@/constants";
import { cn } from "@/lib/utils";
import { formatDay } from "@/utils/format-day";
import { Else, If } from "@/utils/If";
import { RotateCw, Sparkles } from "lucide-react";
import { useContext } from "react";
import { TableContext } from "../provider";
import { useEvents } from "../hooks";

type Props = {
  rows: SundayRow[];
}

export function SundayTable({ rows }: Props) {
  const { swapSpecialDay, changeCategoryField } = useContext(TableContext);

  const { hoverController, blurController, escapeEventController, isFocused, isHovering } = useEvents();

  function changeField(day: number, field: KeysOfUnion<Bulletin['days']['sunday'][0]>) {
    return (e: React.ChangeEvent<HTMLInputElement>) => changeCategoryField('sunday', field, day, e.target.value);
  }

  return (
    <table>
      <thead>
        <tr>
          <th colSpan={5} data-kind="header">
            DOMINGO - CULTO EVANGELÍSTICO ÀS 18:00H
          </th>
        </tr>
        <tr>
          <th>DIA</th>
          <th>DIREÇÃO</th>
          <th>MINISTRANTE</th>
          <th>LOUVORES</th>
          <th>RECEPÇÃO</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.day} {...hoverController(row.day)} className="relative">
            <td data-align="center">{formatDay(row.day)}</td>
            <td>
              <input
                defaultValue={row.direction}
                placeholder="digite aqui..."
                onChange={changeField(row.day, "direction")}
                className="w-full h-full min-w-[0px]"
              />
            </td>
            <td>
              <input
                defaultValue={row.preacher}
                placeholder="digite aqui..."
                onChange={changeField(row.day, "preacher")}
                className="w-full h-full min-w-[0px]"
              />
            </td>
            <td>
              <div className="w-full h-full relative">
                {row.special ? (
                  <input
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
                    onClick={() => swapSpecialDay("sunday", row.day)}
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
            </td>
            <td>
              <input
                placeholder="digite aqui..."
                onChange={changeField(row.day, "recepcionist")}
                className="w-full h-full min-w-[0px]"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
