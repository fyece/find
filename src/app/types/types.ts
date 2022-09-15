export interface ContractDto {
  insurant?: string;
  insured?: string;
  contractNumber: string;
  applicationDateStart: string;
  applicationDateEnd: string;
}

export interface Contract {
  id: number;
  insurant: string;
  insured: string;
  contractNumber: string;
  applicationDate: string;
  paymentDate: string;
  insuredSum: number;
  premium: number;
}

export interface LoginDto {
  login: string;
  password: string;
}
