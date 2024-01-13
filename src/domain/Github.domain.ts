export interface Contribution {
  week: number;
  weekday: number;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
  date: string;
}
