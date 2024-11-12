import dayjs from 'dayjs';
import 'dayjs/locale/pt';
import 'dayjs/locale/en';
import 'dayjs/locale/es';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);

export const formattedStringToDate = (value: string, format: string): Date => {
  return dayjs(value, format).toDate();
};

export const formatDateToString = (date: Date, format: string): string => {
  return dayjs(date).format(format);
};

export const formatDateToLocaleString = (date: Date, locale: string): string => {
  return dayjs(date).locale(locale).format('LL');
};

export const changeDateFormat = (value: string, prevFormat: string, newFormat: string) => {
  const date = formattedStringToDate(value, prevFormat);
  return formatDateToString(date, newFormat);
};
