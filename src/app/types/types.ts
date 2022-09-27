export interface ContractDto {
  insurant?: string;
  insured?: string;
  contractNumber: string;
  applicationDateStart: string;
  applicationDateEnd: string;
  phone: string | null;
}

export interface Contract {
  dog_nom: string;
  dog_data: string;
  nachdata?: string;
  kondata?: string;
  strahsum?: string;
  premia?: string;
  strahov: string;
  zastr: string;
  s_phone?: string;
  fiscal_number: string;
  pay_data?: string;
  Res: string;
  Msg?: string;
}

export interface LoginDto {
  login: string;
  pass: string;
}
