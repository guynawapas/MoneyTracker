import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-expense-new',
  templateUrl: './expense-new.page.html',
  styleUrls: ['./expense-new.page.scss'],
})
export class ExpenseNewPage implements OnInit {
  
  newExpense = { type: '', description: '', cost: '',date:new Date().toISOString()};

  constructor( private expenseService: ExpenseService,
               private router: Router ,
               ) { }

  ngOnInit() {
  }

  addExpense() {
    console.log(this.newExpense);
    this.expenseService.addExpense(this.newExpense)
      .then(data => {
        console.log(data);
        this.listPage.plot();
        this.router.navigateByUrl('/list');
      })
      .catch(error => {
        console.log(error);
      });
  }

  inputCheck() {
    return (this.newExpense.description == '');
  }
 
}