export const MAX_N_YEARS_BEFORE_CURRENT = 1;
export const MAX_N_YEARS_AFTER_CURRENT = 1;
export const ALL_MONTHS = [
  { name: 'Janeiro', value: 1 },
  { name: 'Fevereiro', value: 2 },
  { name: 'Março', value: 3 },
  { name: 'Abril', value: 4 },
  { name: 'Maio', value: 5 },
  { name: 'Junho', value: 6 },
  { name: 'Julho', value: 7 },
  { name: 'Agosto', value: 8 },
  { name: 'Setembro', value: 9 },
  { name: 'Outubro', value: 10 },
  { name: 'Novembro', value: 11 },
  { name: 'Dezembro', value: 12 }
];

export type SundayRow = {
  day: number;
  direction: string;
  preacher: string;
  recepcionist: string;
} & ({
  special: false;
  singers: string;
} | {
  special: true;
  warn: string;
});

export type WednesdayRow = {
  day: number;
  direction: string;
  preacher: string;
  recepcionist: string;
} & ({
  special: false;
  theme: string;
} | {
  special: true;
  warn: string;
});

export type SaturdayRow = {
  day: number;
  facilitator: string;
  theme: string;
  divineCult: string;
};

export type Bulletin = {
  days: {
    sunday: SundayRow[];
    wednesday: WednesdayRow[];
    saturday: SaturdayRow[];
  }

  month: number;
  year: number;
}

export type KeysOfUnion<T> = T extends any ? keyof T : never;

export const options = {
  preacher: [
    'diác. Evaldo',
    'diác. Antônio',
    'Emikson',
    'Ednelda',
    'pr. Jonas',
  ],
  teacherWednesday: [
    'Emikson',
    'Ednelda',
    'dcsa. Ana',
    'Leninha',
  ],
  teacherSaturday: [
    'Emikson',
    'Ednelda',
    'dcsa. Ana',
    'Leninha',
    'Francilene',
    'Neto',
    'Cleidiane',
    'pr. Jonas'
  ],
  recepcionist: [
    'Zé Wilson',
    'Emikson',
    'Elielton',
    'diác. Evaldo',
    'diác. Antônio',
    'Neto',
    'Naldo',
  ],
  directionSundays: [
    'diác. Evaldo',
    'diác. Antônio',
    'Emikson',
    'Ednelda',
    'Ana',
    'Naldo',
    'Francilene'
  ],
  directionWednesday: [
    'diác. Evaldo',
    'diác. Antônio',
    'Emikson',
    'Ednelda',
    'Ana',
    'Misaellem',
    'Naldo',
    'Francilene',
    'Neta',
    'Leninha'
  ],
  singers: ['Venicius', 'Guerreiras', 'Turminha', 'Eloí', 'Ednelda', 'Naldo', 'pr. Antonino', 'Tayná', 'Franciele', 'diác. Evaldo', 'Zé Wilson', 'Cleidiane', 'Misaellem', 'Leninha']
}

export function pickNFromArrayV2<T>(
  n: number,
  items: T[],
  exclude: T[] = [],
  usageMap = new Map(),
  penalty = 1
): T[] {
  const result: T[] = [];
  const available = items.filter(item => !exclude.includes(item));

  if (n >= available.length) {
    return [...available];
  }

  while (result.length < n && available.length) {
    const weighted = available.map(item => ({
      item,
      weight: 1 / (1 + (usageMap.get(item) || 0) * penalty)
    }));

    const total = weighted.reduce((s, w) => s + w.weight, 0);
    let r = Math.random() * total;

    let chosen: T = weighted[0].item;
    for (const w of weighted) {
      r -= w.weight;
      if (r <= 0) {
        chosen = w.item;
        break;
      }
    }

    result.push(chosen);

    // track usage
    usageMap.set(chosen, (usageMap.get(chosen) || 0) + 1);

    // remove chosen so it can't repeat in the same pick
    const idx = available.indexOf(chosen);
    available.splice(idx, 1);
  }

  return result;
}
