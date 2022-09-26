import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Contract, ContractDto } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class FindService {
  baseUrl = 'http://orderfinder';

  constructor(private http: HttpClient) {}

  getContracts(contractDto: ContractDto): Observable<Contract[]> {
    const url = `${this.baseUrl}/docs`;

    return this.http
      .post<Contract[]>(url, contractDto)
      .pipe(catchError(this.handleError<Contract[]>('getContracts', [])));
  }

  getContractFile(){
    const url = ``;
    const params: HttpParams = new HttpParams();
    // add params
    return this.http.get(url, {params: params})
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.warn(error);
      return of(result as T);
    };
  }
}
