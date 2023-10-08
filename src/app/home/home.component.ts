/**
 * Title: home.component.ts
 * Author: Tiffany Reyes
 * Date: 07 Oct 2023
 * Description: home component
 */

// importing classes and modules
import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { LoanEvent } from '../loan-event';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  firstMonthlyPayment: number;
  firstInterestPaid: number;
  secondMonthlyPayment: number;
  secondInterestPaid: number;
  showSecondLoan: boolean = false;


  constructor() { }

  ngOnInit(): void {
  }

  displayFirstLoan(loanEvent: LoanEvent) {
    this.firstMonthlyPayment = loanEvent.monthlyPayment;
    this.firstInterestPaid = loanEvent.interestPaid;
  }

  displaySecondLoan(loanEvent: LoanEvent) {
    this.secondMonthlyPayment = loanEvent.monthlyPayment;
    this.secondInterestPaid = loanEvent.interestPaid;
  }

  toggleLoan(event: MatSlideToggleChange) {
    this.showSecondLoan = event.checked;
  }
}
