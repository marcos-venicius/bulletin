import { createContext, useCallback, useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
  count: number;
}

type KeyboardContext = {
  rows: HTMLInputElement[][];
  touchRow(index: number, cols: HTMLInputElement[]): void;
}

export const KeyboardContext = createContext<KeyboardContext>({
  rows: [],
  touchRow() { }
});

export function KeyboardProvider({ children, count }: Props) {
  const [rows, setRows] = useState<KeyboardContext['rows']>([]);

  const touchRow = useCallback(function(index: number, cols: HTMLInputElement[]) {
    setRows(curr => {
      if (index >= curr.length) {
        for (let i = 0; i < index - curr.length; i++) {
          rows.push(undefined as any);
        }

        curr.push(cols);
      } else {
        for (let i = 0; i < curr.length; i++) {
          if (i === index) {
            curr[i] = cols;

            break;
          }
        }
      }

      return [...curr];
    });
  }, []);

  useEffect(() => {
    if (rows.length === count && rows.every(row => row !== undefined)) {
      for (let y = 0; y < rows.length; y++) {
        for (let x = 0; x < rows[y].length; x++) {
          const element = rows[y][x];

          element.addEventListener('keydown', event => {
            const coords = { x, y };

            const isUp = (event.key === 'Enter' && event.shiftKey) || event.key === 'ArrowUp';
            const isDown = (event.key === 'Enter' && !event.shiftKey) || event.key === 'ArrowDown';
            const isRight = (event.key === 'ArrowRight' && event.ctrlKey);
            const isLeft = (event.key === 'ArrowLeft' && event.ctrlKey);

            if (isUp) {
              if (coords.y - 1 >= 0) {
                if (rows[coords.y - 1].length - 1 < coords.x) {
                  rows[coords.y - 1][rows[coords.y - 1].length - 1].focus();
                } else {
                  rows[coords.y - 1][coords.x].focus();
                }
              }
            } else if (isDown) {
              if (coords.y + 1 < rows.length) {
                if (rows[coords.y + 1].length - 1 < coords.x) {
                  rows[coords.y + 1][rows[coords.y + 1].length - 1].focus();
                } else {
                  rows[coords.y + 1][coords.x].focus();
                }
              }
            } else if (isRight) {
              if (coords.x < rows[coords.y].length - 1) {
                rows[coords.y][coords.x + 1].focus();
              } else if (coords.y < rows.length - 1) {
                rows[coords.y + 1][0].focus();
              }
            } else if (isLeft) {
              if (coords.x > 0) {
                rows[coords.y][coords.x - 1].focus();
              } else if (coords.y > 0) {
                rows[coords.y - 1][rows[coords.y - 1].length - 1].focus();
              }
            }
          });
        }
      }
    }
  }, [count, rows]);

  return (
    <KeyboardContext.Provider value={{ rows, touchRow }}>
      {children}
    </KeyboardContext.Provider>
  );
}
