import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { format } from 'date-fns/format';
import { nl } from 'date-fns/locale/nl';

/**
 * Converts a date to UTC date only (no time)
 * @param date Date to convert to UTC Date
 */
export function dateToUTC(dateInput: Date | string): Date {
  // if (!date) {
  //   return undefined;
  // }
  const date = new Date(dateInput);
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
  return d;
}

/**
 * Format a date to dd-mm-yyyy
 * @param date Date in string, Date or number format
 * @param options.defaultValue A default value when empty ('')
 * @param options.includeTime Also shows the time
 */
export function toDutchDate(
  date: string | number | undefined | null | Date,
  options: {
    defaultValue?: string;
    includeTime?: boolean;
  } = {
    defaultValue: '',
    includeTime: false,
  },
): string {
  if (!date || date === null || date === '' || date === 0) {
    return options.defaultValue || '';
  }
  if (options.includeTime) {
    return format(new Date(date), 'dd-MM-yyyy HH:mm');
  }
  return format(new Date(date), 'dd-MM-yyyy');
}

export function toDutchTime(
  date: string | number | undefined | null | Date,
  options: {
    defaultValue?: string;
  } = {
    defaultValue: '',
  },
): string {
  if (!date || date === null || date === '' || date === 0) {
    return options.defaultValue || '';
  }
  return format(new Date(date), 'HH:mm');
}

export function relativeTimeFormatter(date1: Date): string {
  if (!date1) {
    return '';
  }
  return formatDistanceToNow(new Date(date1), {
    locale: nl,
    addSuffix: true,
  }).replace('over', 'verloopt of eindigt in');
}
