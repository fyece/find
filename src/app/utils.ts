import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function stringToDate(date: string) {
  const correctDate = date ?? '';
  const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
  return new Date(correctDate.replace(pattern, '$3-$2-$1'));
}

export function unseparatedToDate(date: string) {
  if (date && date.length === 8) {
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

export const FullFormValidator: ValidatorFn = (fg: AbstractControl) => {
  const insurant = fg.get('insurant')?.value && fg.get('insurant')?.valid;
  const insurantBirth =
    fg.get('insurantBirth')?.value && fg.get('insurantBirth')?.valid;
  const insured = fg.get('insured')?.value && fg.get('insured')?.valid;
  const insuredBirth =
    fg.get('insuredBirth')?.value && fg.get('insuredBirth')?.valid;
  const contractNumber =
    fg.get('contractNumber')?.value && fg.get('contractNumber')?.valid;
  
  return (contractNumber ||
    (insurant && insurantBirth) ||
    (insured && insuredBirth))
    ? null
    : ({ incorrectForm: true } as ValidationErrors);
};

export const InsurantSearchValidator: ValidatorFn = (fg: AbstractControl) => {
  const insurant = fg.get('insurant');
  const insurantBirth = fg.get('insurantBirth');
  const contractNumber = fg.get('contractNumber');

  if (contractNumber?.value && contractNumber.valid) {
    return null;
  }

  if (
    insurant?.untouched &&
    insurant?.valid &&
    (insurantBirth?.invalid || !insurantBirth?.value)
  ) {
    return { insurantNeedBday: true } as ValidationErrors;
  }
  if (
    insurantBirth?.untouched &&
    insurantBirth?.valid &&
    (insurant?.invalid || !insurant?.value)
  ) {
    return { insurantNeedFullname: true } as ValidationErrors;
  }
  return null;
};

export const InsuredSearchValidator: ValidatorFn = (fg: AbstractControl) => {
  const insured = fg.get('insured');
  const insuredBirth = fg.get('insuredBirth');
  const contractNumber = fg.get('contractNumber');

  if (contractNumber?.value && contractNumber.valid) {
    return null;
  }

  if (
    insured?.untouched &&
    insured?.valid &&
    (insuredBirth?.invalid || !insuredBirth?.value)
  ) {
    return { insuredNeedBday: true } as ValidationErrors;
  }
  if (
    insuredBirth?.untouched &&
    insuredBirth?.valid &&
    (insured?.invalid || !insured?.value)
  ) {
    return { insuredNeedFullname: true } as ValidationErrors;
  }
  return null;
};
