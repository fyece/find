import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Contract, ContractDto, LogDownloadDto } from '../types/types';

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

  logDownload(logDownloadDto:LogDownloadDto){
    const url = `${this.baseUrl}/download`;
    return this.http.post(url, logDownloadDto)
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.warn(error);
      return of(result as T);
    };
  }
}
