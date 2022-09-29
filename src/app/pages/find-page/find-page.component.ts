import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { FindService } from 'src/app/services/find.service';
import { Contract, ContractDto } from 'src/app/types/types';
import { MonthDiffValidator, unseparatedToDate } from 'src/app/utils';

@Component({
  selector: 'app-find-page',
  templateUrl: './find-page.component.html',
  styleUrls: ['./find-page.component.scss'],
})
export class FindPageComponent implements OnInit {
  contracts: Contract[] = [];
  errorMessage: string = '';
  isNothingFound = false;
  isLoading = false;

  findForm: FormGroup = new FormGroup(
    {
      contractNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      dateFrom: new FormControl('', Validators.required),
      dateTo: new FormControl('', Validators.required),
      insurant: new FormControl('', [
        Validators.minLength(3),
        Validators.required,
      ]),
      insured: new FormControl('', [
        Validators.minLength(3),
        Validators.required,
      ]),
      phoneNumber: new FormControl(''),
      email: new FormControl('', Validators.email),
    },
    [MonthDiffValidator]
  );

  constructor(
    private titleService: Title,
    private findService: FindService,
    private authService: AuthService
  ) {
    this.titleService.setTitle('Поиск договоров');
  }

  find() {
    const contractDto: ContractDto = {
      insurant: this.findForm.get('insurant')?.value,
      insured: this.findForm.get('insured')?.value,
      contractNumber: this.findForm.get('contractNumber')?.value,
      applicationDateStart: unseparatedToDate(
        this.findForm.get('dateFrom')?.value
      ),
      applicationDateEnd: unseparatedToDate(this.findForm.get('dateTo')?.value),
      phone:
        this.findForm.get('phoneNumber')?.value == ''
          ? null
          : this.findForm.get('phoneNumber')?.value,
    };

    this.isLoading = true;
    this.findService.getContracts(contractDto).subscribe((contracts) => {
      if (contracts.length > 0 && contracts[0].Res == '1') {
        this.contracts = contracts;
        this.errorMessage = '';
        this.isNothingFound = false;
      } else if (contracts.length === 0) {
        this.isNothingFound = true;
        this.contracts = [];
      } else {
        this.errorMessage =
          contracts[0].Msg || 'Произошла непредвиденная ошибка';
      }
    });
    this.isLoading = false;
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {}
}
