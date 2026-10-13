export type JalaliDateFormatToken =
  | 'yyyy'
  | 'yy'
  | 'MMMM'
  | 'MMM'
  | 'MM'
  | 'M'
  | 'dd'
  | 'd'
  | 'EEEE'
  | 'HH'
  | 'H'
  | 'mm'
  | 'm'
  | 'ss'
  | 's';

/**
 * A custom format containing at least one token supported by JalaliDatePipe.
 * Examples: `yyyy/MM/dd`, `EEEE، d MMMM yyyy`, `HH:mm:ss`.
 */
export type JalaliDateFormat = `${string}${JalaliDateFormatToken}${string}`;
