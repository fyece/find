import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export let dateMask = () => {
  return [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
};

export let phoneMask = (rawValue:any) => {
  if (rawValue && (rawValue[0] === '+' || rawValue[0] === '7')) {
    return ['+', /7/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/];
  } else if (rawValue[0] === '9') {
    return ['+', '7', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/];
  } else {
    return [/8/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/];
  }
};

export const emailReg = /^((([^<>()\[\]\\.,;:\s@a-zA-Za-яА-Я"]|[a-zA-Z])+(\.([^<>()\[\]\\.,;:\s@"a-zA-Za-яА-Я]|[a-zA-Z])+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


function stringToDate(date: string){
  const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
  return new Date(date.replace(pattern,'$3-$2-$1'));
}

function isMonthDiff(dateFrom:Date, dateTo:Date){
  const date1 = stringToDate(dateFrom.toString())
  const date2 = stringToDate(dateTo.toString())
  const month = 30 * 24 * 60 * 60 * 1000
  const diff= Math.abs(date1.getTime() - date2.getTime())
  if(diff <= month){
    return true
  } else {
    return false
  }
}

export const MonthDiffValidator: ValidatorFn = (fg: AbstractControl) => {
  const start = fg.get('dateFrom')?.value;
  const end = fg.get('dateTo')?.value;
  const diff = isMonthDiff(start, end)
  return start !== null && end !== null && diff
    ? null
    : { diffMoreThanMonth: true } as ValidationErrors;
};
