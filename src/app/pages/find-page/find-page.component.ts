import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FindService } from 'src/app/services/find.service';
import { Contract, ContractDto, LogDownloadDto } from 'src/app/types/types';
import {
  FullFormValidator,
  InsurantSearchValidator,
  InsuredSearchValidator,
  unseparatedToDate,
} from 'src/app/utils';

@Component({
  selector: 'app-find-page',
  templateUrl: './find-page.component.html',
  styleUrls: ['./find-page.component.scss'],
})
export class FindPageComponent {
  contracts: Contract[] = [];
  errorMessage: string = '';
  id = '';
  isNothingFound = false;
  isLoading = false;

  findForm: FormGroup = new FormGroup(
    {
      contractNumber: new FormControl('', [Validators.minLength(2)]),

      dateFrom: new FormControl(''),
      dateTo: new FormControl(''),

      insurant: new FormControl('', [Validators.minLength(3)]),
      insurantBirth: new FormControl(''),
      insured: new FormControl('', [Validators.minLength(3)]),
      insuredBirth: new FormControl(''),

      phoneNumber: new FormControl(''),
      email: new FormControl('', Validators.email),
    },
    [FullFormValidator, InsurantSearchValidator, InsuredSearchValidator]
  );

  constructor(
    private titleService: Title,
    private findService: FindService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.titleService.setTitle('Поиск договоров');
  }

  find() {
    const contractDto: ContractDto = {
      insurant: this.findForm.get('insurant')?.value
        ? this.findForm.get('insurant')?.value
        : null,
      insurantBirth: unseparatedToDate(
        this.findForm.get('insurantBirth')?.value
      )
        ? unseparatedToDate(this.findForm.get('insurantBirth')?.value)
        : null,
      insured: this.findForm.get('insured')?.value
        ? this.findForm.get('insured')?.value
        : null,
      insuredBirth: unseparatedToDate(this.findForm.get('insuredBirth')?.value)
        ? unseparatedToDate(this.findForm.get('insuredBirth')?.value)
        : null,
      contractNumber: this.findForm.get('contractNumber')?.value
        ? this.findForm.get('contractNumber')?.value
        : null,
      applicationDateStart: unseparatedToDate(
        this.findForm.get('dateFrom')?.value
      )
        ? unseparatedToDate(this.findForm.get('dateFrom')?.value)
        : null,
      applicationDateEnd: unseparatedToDate(this.findForm.get('dateTo')?.value)
        ? unseparatedToDate(this.findForm.get('dateTo')?.value)
        : null,
      phone: this.findForm.get('phoneNumber')?.value
        ? this.findForm.get('phoneNumber')?.value
        : null,
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
      this.isLoading = false;
    });
  }

  resetForm() {
    this.findForm.markAsPristine();
    this.findForm.markAsUntouched();
    this.findForm.updateValueAndValidity();
    this.errorMessage = '';
    this.contracts = [];
  }

  logout() {
    this.authService.logout();
  }

  download(guid: string) {
    const logData: LogDownloadDto = {
      id: Number(this.id),
      resource: `http://web-api.akbarsmed.ru:8789/PrintPdfMain?as_pdf&guid_contr=${guid}`,
    };
    this.findService.logDownload(logData).subscribe();
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(
      (params) => (this.id = params.get('id') ?? '')
    );
  }
}
