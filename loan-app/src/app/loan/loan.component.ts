/**
 * Title: loan.component.ts
 * Author: Tiffany Reyes
 * Date: 07 Oct 2023
 * Description: loan component
 */

// importing classes and modules
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanEvent } from '../loan-event';
import { TermOption } from './term-option';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {
  // declaring class properties
  @Output() loanSubmit: EventEmitter<LoanEvent> = new EventEmitter<LoanEvent>();
  loanForm: FormGroup;
  terms: TermOption[];
  showSecondLoan: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // array of terms for the dropdown selection
    this.terms = [
      {value: 30, displayValue: '30-Year'},
      {value: 20, displayValue: '20-Year'},
      {value: 15, displayValue: '15-Year'},
      {value: 10, displayValue: '10-Year'},
      {value: 5, displayValue: '5-Year'}
    ];

    // loan validation requirements
    this.loanForm = this.fb.group({
      loan: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      interest: ['', [Validators.required, Validators.pattern("^[0-9]*(.[0-9]*)?$")]],
      termLength: ['', [Validators.required]]
    });
  }
// displaying loan error message
  getLoanErrorMessage() {
    if (this.loanForm.controls.loan.hasError('pattern')) {
      return 'You must enter a numeric value (without commas)';
    }
    if (this.loanForm.controls.loan.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

// displaying interest error message
  getInterestErrorMessage() {
    if (this.loanForm.controls.interest.hasError('pattern')) {
      return 'You must enter a numeric or decimal value (without commas)';
    }
    if (this.loanForm.controls.interest.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

 // function to calculate loan amount
  calculateLoan() {
    const principle = this.loanForm.controls.loan.value;
    const ratePerPeriod = (this.loanForm.controls.interest.value / 100) / 12;
    const numberOfPayments = (this.loanForm.controls.termLength.value) * 12;

    const monthlyPayment = principle * (ratePerPeriod * Math.pow((ratePerPeriod + 1), numberOfPayments)) / (Math.pow((1 + ratePerPeriod), numberOfPayments) - 1);

    const interestPaid = (monthlyPayment * numberOfPayments) - principle;

    this.loanSubmit.emit({
      monthlyPayment,
      interestPaid
    });
  }
}
