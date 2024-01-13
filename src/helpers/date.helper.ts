import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export const formattedStringToDate = (value: string, format: string): Date => {
  return dayjs(value, format).toDate();
};

export const formatDateToString = (date: Date, format: string): string => {
  return dayjs(date).format(format);
};

export const changeDateFormat = (value: string, prevFormat: string, newFormat: string) => {
  const date = formattedStringToDate(value, prevFormat);
  return formatDateToString(date, newFormat);
};
