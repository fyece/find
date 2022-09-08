import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contract } from 'src/app/types/Contract';
import { MonthDiffValidator } from 'src/app/utils';

@Component({
  selector: 'app-find-page',
  templateUrl: './find-page.component.html',
  styleUrls: ['./find-page.component.scss'],

})
export class FindPageComponent implements OnInit {
  contracts: Contract[] = [];

  findForm: FormGroup = new FormGroup({
    contractNumber: new FormControl('', [Validators.min(3),Validators.pattern('[0-9]+')]),
    dateFrom: new FormControl(),
    dateTo: new FormControl(),
    insurant: new FormControl('', Validators.min(3)),
    insured: new FormControl('', Validators.min(3)),
    phoneNumber: new FormControl(''),
    email: new FormControl('', Validators.email),
  }, [MonthDiffValidator]);

  constructor() {}


  find() {
    console.log('finding');
  }

  downloadDoc() {
    console.log('downloading');
  }

  ngOnInit(): void {}
}
