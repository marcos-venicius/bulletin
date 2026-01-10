import { type SaturdayRow, type SundayRow, type Bulletin, type WednesdayRow, MAX_N_YEARS_BEFORE_CURRENT, MAX_N_YEARS_AFTER_CURRENT } from "@/constants";
import { getMonthString } from "@/utils/get-month-string";
import { CircleDashedIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

type TableProps<T extends keyof Bulletin['days']> = {
  kind: T;
  rows: Bulletin['days'][T];
}

function formatDay(day: number) {
  return String(day).padStart(2, '0')
}

function Table<T extends keyof Bulletin['days']>({ kind, rows }: TableProps<T>) {
  switch (kind) {
    case "sunday": {
      const getter = (rs: Bulletin['days'][T]): SundayRow[] => rs as SundayRow[];

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
            {getter(rows).map((row) => (
              <tr key={row.day}>
                <td data-align="center">{formatDay(row.day)}</td>
                <td>{row.direction}</td>
                <td>{row.preacher}</td>
                <td>{row.special ? <span>{row.warn}</span> : row.singers}</td>
                <td>{row.recepcionist}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    case "wednesday": {
      const getter = (rs: Bulletin['days'][T]): WednesdayRow[] => rs as WednesdayRow[];

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
            {getter(rows).map((row) => (
              <tr key={row.day}>
                <td data-align="center">{formatDay(row.day)}</td>
                <td>{row.direction}</td>
                <td>{row.preacher}</td>
                <td>{row.special ? <span>{row.warn}</span> : row.theme}</td>
                <td>{row.recepcionist}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    case "saturday": {
      const getter = (rs: Bulletin['days'][T]): SaturdayRow[] => rs as SaturdayRow[];

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
            {getter(rows).map((row) => (
              <tr key={row.day}>
                <td data-align="center">{formatDay(row.day)}</td>
                <td>{row.facilitator}</td>
                <td>{row.theme}</td>
                <td>{row.divineCult}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  }
}

type ExpectedParams<T = string> = {
  month: T;
  year: T;
}

export function Review() {
  const [hasError, setHasError] = useState(true);
  const [gettingData, setGettingData] = useState(true);
  const [combination, setCombination] = useState<ExpectedParams<number> | null>(null);
  const [bulletin, setBulletin] = useState<Bulletin | null>(null);

  const params = useParams();
  const navigate = useNavigate();

  const loading = hasError || gettingData || !bulletin;

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

    const key = `bulletin:${combination.month}:${combination.year}`;

    const data = localStorage.getItem(key);

    if (!data) {
      setHasError(true);

      navigate('/');
    } else {
      const json = JSON.parse(data);

      setBulletin(json);
      setGettingData(false);
    }
  }, [hasError, combination]);

  if (loading) {
    return (
      <main className="w-full h-full bg-white flex items-center justify-center">
        <CircleDashedIcon className="animate-spin" />
      </main>
    );
  }

  return (
    <main className="view">
      <img src="/assets/logo.png" />

      <div id="banner">
        <p>
          ESCALA DE SERVIÇO DE CULTO - {getMonthString(combination?.month ?? 0)} {combination?.year}
        </p>
      </div>

      <Table
        kind="sunday"
        rows={bulletin.days.sunday}
      />
      <Table
        kind="wednesday"
        rows={bulletin.days.wednesday}
      />
      <Table
        kind="saturday"
        rows={bulletin.days.saturday}
      />
    </main>
  );
}
