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


function isMonthDiff(dateFrom:Date, dateTo:Date){
  const date1 = new Date(dateFrom)
  const date2 = new Date(dateTo)
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
    : { range: true } as ValidationErrors;
};
