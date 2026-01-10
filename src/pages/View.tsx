import type { SaturdayRow, SundayRow, Bulletin, WednesdayRow } from "@/constants";

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

function View() {
  return (
    <main className="view">
      <img src="/assets/logo.png" />

      <div id="banner">
        <p>
          ESCALA DE SERVIÇO DE CULTO - JANEIRO 2026
        </p>
      </div>

      <Table
        kind="sunday"
        rows={[
          {
            day: 4,
            direction: 'DÁ. EVALDO',
            preacher: 'PR. JONAS',
            special: false,
            singers: 'VENICIUS, ELOÍ, GUERREIRAS, TAYNÁ, TURMINHA',
            recepcionist: 'ZÉ WILSON'
          },
          {
            day: 11,
            direction: 'NALDO',
            preacher: 'WASHINGTON JR',
            special: false,
            singers: 'TURMINHA, VENICIUS, GUERREIRAS, ELOÍ, FRANCIELE',
            recepcionist: 'ELIELTON'
          },
          {
            day: 18,
            direction: 'DÁ. ANTONIO',
            preacher: 'DÁ. EVALDO',
            special: false,
            singers: 'CLEIDIANE, TURMINHA, EDNELDA, ELOÍ, TAYNÁ, GUERREIRAS',
            recepcionist: 'NETO'
          },
          {
            day: 25,
            direction: 'EDNELDA',
            preacher: 'PR. JONAS',
            special: false,
            singers: 'FAMÍLIAS: ZÉ WILSON, PR. JONAS, NALDO, EDIM, EVALDO, ELIELTON',
            recepcionist: 'FAMÍLIA NALDO'
          }
        ]}
      />
      <Table
        kind="wednesday"
        rows={[
          {
            day: 7,
            direction: 'NETA',
            preacher: 'DSA. ANA',
            special: false,
            theme: 'A PALAVRA DE DEUS',
            recepcionist: 'EMIKSON'
          },
          {
            day: 14,
            direction: 'FRANCILENE',
            preacher: 'EMIKSON',
            special: false,
            theme: 'A CRIAÇÃO DE TODAS AS COISAS',
            recepcionist: 'ZÉ WILSON'
          },
          {
            day: 21,
            direction: 'MISAELLEM',
            preacher: 'LENINHA',
            special: false,
            theme: 'A QUEDA DO HOMEM',
            recepcionist: 'ELIELTON'
          },
          {
            day: 28,
            direction: 'LENINHA',
            preacher: 'EMIKSON',
            special: false,
            theme: 'O PLANO DE REDENÇÃO',
            recepcionist: 'DÁ. EVALDO'
          },
        ]}
      />
      <Table
        kind="saturday"
        rows={[
          {
            day: 3,
            facilitator: "PR. JONAS",
            theme: "INVERSÃO DE PRIORIDADES",
            divineCult: "PR. JONAS"
          },
          {
            day: 10,
            facilitator: "FRANCILENE",
            theme: "PRISIONEIROS DO PASSADO?",
            divineCult: "FRANCILENE"
          },
          {
            day: 17,
            facilitator: "PR. JONAS",
            theme: "CHAMADO À SANTIDADE",
            divineCult: "PR. JONAS"
          },
          {
            day: 24,
            facilitator: "NETO",
            theme: "O SENHOR DA HISTÓRIA",
            divineCult: "NETO"
          },
          {
            day: 31,
            facilitator: "CLEIDIANE",
            theme: "CONVITE AO ARREPENDIMENTO",
            divineCult: "CLEIDIANE"
          }
        ]}
      />
    </main>
  );
}

export default View
