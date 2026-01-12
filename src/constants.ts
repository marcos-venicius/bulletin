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
