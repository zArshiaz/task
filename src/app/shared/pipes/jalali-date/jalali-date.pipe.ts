import { Pipe, PipeTransform } from '@angular/core';
import { toJalaali } from 'jalaali-js';

import type { JalaliDateFormat } from './jalali-date.types';

type DateInput = Date | number | string | null | undefined;

interface JalaliDateParts {
  readonly year: number;
  readonly month: number;
  readonly day: number;
}

const MONTH_NAMES = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
] as const;

const WEEKDAY_NAMES = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'] as const;

@Pipe({
  name: 'jalaliDate',
})
export class JalaliDatePipe implements PipeTransform {
  transform(value: DateInput, format: JalaliDateFormat = 'yyyy/MM/dd'): string {
    const date = toDate(value);

    if (!date) {
      return '';
    }

    const { jy, jm, jd } = toJalaali(date.getFullYear(), date.getMonth() + 1, date.getDate());
    const jalali: JalaliDateParts = { year: jy, month: jm, day: jd };

    return applyFormat(date, jalali, format);
  }
}

function applyFormat(date: Date, jalali: JalaliDateParts, format: string): string {
  const tokens: Readonly<Record<string, string>> = {
    yyyy: String(jalali.year),
    yy: String(jalali.year).slice(-2),
    MMMM: MONTH_NAMES[jalali.month - 1],
    MMM: MONTH_NAMES[jalali.month - 1],
    MM: pad(jalali.month),
    M: String(jalali.month),
    dd: pad(jalali.day),
    d: String(jalali.day),
    EEEE: WEEKDAY_NAMES[date.getDay()],
    HH: pad(date.getHours()),
    H: String(date.getHours()),
    mm: pad(date.getMinutes()),
    m: String(date.getMinutes()),
    ss: pad(date.getSeconds()),
    s: String(date.getSeconds()),
  };

  return format.replace(/yyyy|MMMM|EEEE|MMM|yy|MM|dd|HH|mm|ss|M|d|H|m|s/g, (token) => tokens[token]);
}

function toDate(value: DateInput): Date | null {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  if (typeof value === 'number' || typeof value === 'string') {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  return null;
}

function pad(value: number): string {
  return String(value).padStart(2, '0');
}
