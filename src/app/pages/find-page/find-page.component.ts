import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { FindService } from 'src/app/services/find.service';
import { Contract, ContractDto } from 'src/app/types/types';
import { MonthDiffValidator, phoneMask } from 'src/app/utils';

@Component({
  selector: 'app-find-page',
  templateUrl: './find-page.component.html',
  styleUrls: ['./find-page.component.scss'],
})
export class FindPageComponent implements OnInit {
  contracts: Contract[] = [];
  phoneMask = phoneMask;

  findForm: FormGroup = new FormGroup(
    {
      contractNumber: new FormControl('', [
        Validators.required,
        Validators.min(3),
        Validators.pattern('[0-9]{3,}'),
      ]),
      dateFrom: new FormControl('', Validators.required),
      dateTo: new FormControl('', Validators.required),
      insurant: new FormControl('', Validators.min(3)),
      insured: new FormControl('', Validators.min(3)),
      phoneNumber: new FormControl(''),
      email: new FormControl('', Validators.email),
    },
    [MonthDiffValidator]
  );

  constructor(private titleService: Title, private findService: FindService) {
    this.titleService.setTitle('Поиск договоров');
  }

  find() {
    const contractDto: ContractDto = {
      insurant: this.findForm.get('insurant')?.value,
      insured: this.findForm.get('insured')?.value,
      contractNumber: this.findForm.get('contractNumber')?.value,
      applicationDateStart: this.findForm.get('dateFrom')?.value,
      applicationDateEnd: this.findForm.get('dateTo')?.value,
    };
    this.findService
      .getContracts(contractDto)
      .subscribe((contracts) => (this.contracts = contracts));
    console.log('finding');
  }

  download() {
    console.log('downloading');
    console.log(this.findForm.errors, this.findForm.invalid);
  }

  ngOnInit(): void {}
}
