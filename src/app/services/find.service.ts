import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Contract, ContractDto } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class FindService {
  baseUrl = 'akbars';

  constructor(private http: HttpClient) {}

  getContracts(contractDto: ContractDto): Observable<Contract[]> {
    const url = `${this.baseUrl}/find`;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const params: HttpParams = new HttpParams();
    contractDto.insurant
      ? params.append('insurant', contractDto.insurant)
      : null;
    contractDto.insured ? params.append('insured', contractDto.insured) : null;
    contractDto.contractNumber
      ? params.append('contractNumber', contractDto.contractNumber)
      : null;
    contractDto.applicationDateStart
      ? params.append('applicationDateStart', contractDto.applicationDateStart)
      : null;
    contractDto.applicationDateEnd
      ? params.append('applicationDateEnd', contractDto.applicationDateEnd)
      : null;

    return this.http
      .get<Contract[]>(url, { headers: headers, params: params })
      .pipe(catchError(this.handleError<Contract[]>('getContracts', [])));
  }

  getContractFile(){
    
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.warn(error);
      return of(result as T);
    };
  }
}
