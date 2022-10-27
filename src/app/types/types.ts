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
  guid_contr: string;
  Res: string;
  Msg?: string;
}

export interface ContractDto {
  insurant?: string | null;
  insurantBirth?: string | null;
  insured?: string | null;
  insuredBirth?: string | null;
  contractNumber?: string | null;
  applicationDateStart?: string | null;
  applicationDateEnd?: string | null;
  phone?: string | null;
}

export interface LoginDto {
  login: string;
  pass: string;
}

export interface LogDownloadDto {
  id: number;
  resource: string;
}
