import { useState } from "react";

export function useEvents() {
  const [focusing, setFocusing] = useState<number | null>(null);
  const [hoverCell, setHoverCell] = useState<number | null>(null);

  function hoverController(day: number) {
    return {
      onMouseEnter: () => {
        if (focusing === day) return;

        setHoverCell(day);
      },
      onMouseLeave: () => {
        setHoverCell(null);
      }
    }
  }

  function blurController(day: number) {
    return {
      onBlur: () => {
        setFocusing(null);
      },
      onFocus: () => {
        setHoverCell(null);
        setFocusing(day);
      }
    }
  }

  function escapeEventController(day: number) {
    return {
      onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
          e.currentTarget?.blur();

          unsetFocused(day);
          setHoverCell(day);
        }
      }
    }
  }

  function unsetFocused(day: number) {
    if (focusing === day) setFocusing(null);
  }

  function isHovering(day: number) {
    return hoverCell === day;
  }

  function isFocused(day: number) {
    return focusing === day;
  }

  return {
    isHovering,
    isFocused,
    escapeEventController,
    blurController,
    hoverController
  }
}
