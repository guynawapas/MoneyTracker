import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.page.html',
  styleUrls: ['./expense-detail.page.scss'],
})
export class ExpenseDetailPage implements OnInit {
  expense = this.expenseService.selectedExpense;

  constructor( private expenseService: ExpenseService ) { }

  ngOnInit() {
    console.log(this.expense);
  }

}