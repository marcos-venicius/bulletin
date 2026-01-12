import { MAX_N_YEARS_AFTER_CURRENT, MAX_N_YEARS_BEFORE_CURRENT, type Bulletin, type KeysOfUnion } from "@/constants";
import { createContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const EMPTY_BULLETIN: Bulletin = {
  days: {
    sunday: [],
    saturday: [],
    wednesday: [],
  },
  month: 0,
  year: 0
};


type TableContextProps = {
  bulletin: Bulletin;
  loading: boolean;
  pendingChanges: number;
  changeCategoryField<T extends keyof Bulletin['days']>(category: T, field: KeysOfUnion<Bulletin['days'][T][0]>, day: number, value: string): void;
  swapSpecialDay(category: keyof Bulletin['days'], day: number): void;
}

export const TableContext = createContext<TableContextProps>({
  bulletin: EMPTY_BULLETIN,
  loading: true,
  pendingChanges: 0,
  changeCategoryField: () => { },
  swapSpecialDay: () => { }
});

type ExpectedParams<T = string> = {
  month: T;
  year: T;
}

type Props = {
  children: React.ReactNode
}

export function TableProvider({ children }: Props) {
  const [hasError, setHasError] = useState(true);
  const [generating, setGenerating] = useState(true);
  const [combination, setCombination] = useState<ExpectedParams<number> | null>(null);
  const [bulletin, setBulletin] = useState<Bulletin>(EMPTY_BULLETIN);
  const [pendingChanges, setPendingChanges] = useState(0);

  const params = useParams();
  const navigate = useNavigate();

  const update = useRef<number>(null);
  const fieldsUpdate = useRef<Record<string, number>>({});

  const loading = hasError || generating || !bulletin;
  const key = `bulletin:${combination?.month}:${combination?.year}`;

  function swapSpecialDay(category: keyof Bulletin['days'], day: number) {
    setBulletin(curr => {
      for (let i = 0; i < curr.days[category].length; i++) {
        const match = curr.days[category][i];

        if (match.day === day && 'special' in match) {
          (curr.days[category][i] as { special: boolean }).special = !match.special;

          break;
        }
      }

      return { ...curr };
    });
  }

  function changeCategoryField<T extends keyof Bulletin['days']>(category: T, field: keyof Bulletin['days'][T][0], day: number, value: string) {
    const key = `${category}.${day}.${field as string}`;

    if (key in fieldsUpdate.current && fieldsUpdate.current[key]) {
      clearTimeout(fieldsUpdate.current[key]);

      delete fieldsUpdate.current[key];

      setPendingChanges(p => p - 1);
    }

    setPendingChanges(p => p + 1);

    fieldsUpdate.current[key] = setTimeout(() => {
      setPendingChanges(p => p - 1);

      const state = { ...bulletin };

      for (let i = 0; i < state.days[category].length; i++) {
        if (state.days[category][i].day === day) {
          (state.days[category][i] as any)[field] = value;

          break;
        }
      }

      setBulletin(state);

      delete fieldsUpdate.current[key];
    }, 1000);
  }

  useEffect(() => {
    const now = new Date();

    let error = false;

    error = error || !params.year;
    error = error || !params.month;

    let month = Number(params.month);
    let year = Number(params.year);

    error = error || Number.isNaN(month);
    error = error || Number.isNaN(year);
    error = error || month < 1;
    error = error || month > 12;
    error = error || year < now.getFullYear() - MAX_N_YEARS_BEFORE_CURRENT;
    error = error || year > now.getFullYear() + MAX_N_YEARS_AFTER_CURRENT;

    if (error) {
      navigate('/');
    } else {
      setCombination({
        month,
        year
      });
      setHasError(false);
    }
  }, [params]);

  useEffect(() => {
    if (hasError) return;
    if (!combination) return;

    const preLoaded = localStorage.getItem(key);

    if (preLoaded) {
      const json = JSON.parse(preLoaded);

      setBulletin(json);

      setGenerating(false);
      return;
    }

    const sundays: number[] = [];
    const wednesdays: number[] = [];
    const saturdays: number[] = [];

    let date = new Date(combination.year, combination.month - 1, 1);

    while (date.getMonth() + 1 === combination.month) {
      const weekDay = date.getDay();

      switch (weekDay) {
        case 0: // Sunday
          sundays.push(date.getDate());
          break;
        case 3: // Wednesday
          wednesdays.push(date.getDate());
          break;
        case 6: // Saturday
          saturdays.push(date.getDate());
          break;
      }

      date.setDate(date.getDate() + 1);
    }

    const final: Bulletin = {
      days: {
        sunday: sundays.map(day => ({
          day,
          recepcionist: '',
          preacher: '',
          special: false,
          direction: '',
          singers: ''
        })),
        wednesday: wednesdays.map(day => ({
          day,
          direction: '',
          special: false,
          preacher: '',
          recepcionist: '',
          theme: '',
        })),
        saturday: saturdays.map(day => ({
          day,
          theme: '',
          divineCult: '',
          facilitator: ''
        })),
      },
      month: combination.month,
      year: combination.year
    };

    setBulletin(final);

    setGenerating(false);
  }, [hasError, combination])

  useEffect(() => {
    if (!combination) return;
    if (generating) return;
    if (hasError) return;

    if (update.current) {
      clearTimeout(update.current);

      update.current = null;

      setPendingChanges(p => p - 1);
    }

    setPendingChanges(p => p + 1);

    update.current = setTimeout(() => {
      setPendingChanges(p => p - 1);

      const json = JSON.stringify(bulletin);

      localStorage.setItem(key, json);

      const date = new Date().toLocaleTimeString();

      toast.info(`modificações salvas em ${date}`, {
        position: "top-right",
      })

      update.current = null;
    }, 2000);
  }, [bulletin, hasError, generating, combination, key])

  return (
    <TableContext.Provider value={{ bulletin, loading, swapSpecialDay, pendingChanges, changeCategoryField }}>
      {children}
    </TableContext.Provider>
  );
}
