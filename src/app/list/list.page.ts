import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  // items = this.expenseService.expenses;

  constructor( private userService: UserService,
               private expenseService: ExpenseService,
               private router: Router ) {
  }

  ngOnInit() {
  }

  onSelect(expense) {
    console.log(expense);
    this.expenseService.selectedExpense = expense;
    this.router.navigateByUrl('/expense-detail');
  }

  newExpense() {
    this.router.navigateByUrl('/expense-new');
  }

}