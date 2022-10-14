import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function stringToDate(date: string) {
  const correctDate = date ?? '';
  const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
  return new Date(correctDate.replace(pattern, '$3-$2-$1'));
}

export function unseparatedToDate(date: string) {
  if (date.length === 8) {
    return [date.substring(0, 2), date.substring(2, 4), date.substring(4)].join(
      '/'
    );
  }
  return date;
}
export function unseparatedToDateMMDDYYYY(date: string) {
  if (date && date.length === 8) {
    return [date.substring(2, 4), date.substring(0, 2), date.substring(4)].join(
      '/'
    );
  }
  return date;
}

export function isMonthDiff(dateFrom: string, dateTo: string) {
  const date1 = stringToDate(unseparatedToDateMMDDYYYY(dateFrom));
  const date2 = stringToDate(unseparatedToDateMMDDYYYY(dateTo));
  const month = 31 * 24 * 60 * 60 * 1000;
  const diff = Math.abs(date1.getTime() - date2.getTime());

  if (diff <= month) {
    return true;
  } else {
    return false;
  }
}

export const MonthDiffValidator: ValidatorFn = (fg: AbstractControl) => {
  const start = fg.get('dateFrom')?.value;
  const end = fg.get('dateTo')?.value;
  const diff = isMonthDiff(start, end);

  return start !== null && end !== null && diff
    ? null
    : ({ diffMoreThanMonth: true } as ValidationErrors);
};
