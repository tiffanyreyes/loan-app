import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ILoan } from '../loan.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(event) {
  }

}
