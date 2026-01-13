import type { Bulletin, KeysOfUnion, WednesdayRow } from "@/constants";
import { formatDay } from "@/utils/format-day";
import { useEvents } from "../hooks";
import { TableContext } from "../provider";
import { useContext } from "react";
import { cn } from "@/lib/utils";
import { Else, If } from "@/utils/If";
import { RotateCw, Sparkles } from "lucide-react";

type Props = {
  rows: WednesdayRow[];
}

export function WednesdayTable({ rows }: Props) {
  const { swapSpecialDay, changeCategoryField } = useContext(TableContext);

  const { hoverController, blurController, escapeEventController, isFocused, isHovering } = useEvents();

  function changeField(day: number, field: KeysOfUnion<Bulletin['days']['wednesday'][0]>) {
    return (e: React.ChangeEvent<HTMLInputElement>) => changeCategoryField('wednesday', field, day, e.target.value);
  }

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
          <tr key={row.day} {...hoverController(row.day)} className="relative">
            <td data-align="center">{formatDay(row.day)}</td>
            <td>
              <input
                placeholder="digite aqui..."
                className="w-full h-full min-w-[0px]"
                onChange={changeField(row.day, "direction")}
                defaultValue={row.direction}
              />
            </td>
            <td>
              <input
                placeholder="digite aqui..."
                className="w-full h-full min-w-[0px]"
                onChange={changeField(row.day, "preacher")}
                defaultValue={row.preacher}
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
                    defaultValue={row.theme}
                    onChange={changeField(row.day, "theme")}
                    className={cn(
                      "w-full h-full min-w-[0px]",
                      (isFocused(row.day) && !row.special) && "outline-[#1B3C53] outline-2",
                      (isHovering(row.day) && !row.special) && "outline-2 outline-[#F87B1B]",
                    )}
                  />
                )}

                <If condition={isHovering(row.day)}>
                  <button
                    onClick={() => swapSpecialDay("wednesday", row.day)}
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
                className="w-full h-full min-w-[0px]"
                onChange={changeField(row.day, "recepcionist")}
                defaultValue={row.recepcionist}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
