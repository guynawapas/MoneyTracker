import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ExpenseService } from '../services/expense.service';
import { Chart } from "chart.js";
import * as firebase from 'firebase';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  // items = this.expenseService.expenses;
  @ViewChild("doughnutCanvas",{static:false}) doughnutCanvas: ElementRef;
  private doughnutChart: Chart;
  
  expenseSum=0;
  travelSum=0;
  mealSum=0;
  lodgingSum=0;
  parkingSum=0;
  miscSum=0;
  expenseTravel=[];
  expenseMeal=[];
  expenseLodging=[];
  expenseParking=[];
  expenseMisc=[];
  constructor( private userService: UserService,
               private expenseService: ExpenseService,
               private router: Router ) {
  }
  

  ngOnInit() {

   this.plot();
  }

  async plot() {
    const data = await this.expenseService.reloadData();
    console.log("list");
    console.log(data);
    this.expenseTravel = this.expenseService.getExpense().filter(data => data.type === 'travel');
    this.expenseMeal = this.expenseService.getExpense().filter(data => data.type === 'meal');
    this.expenseLodging = this.expenseService.getExpense().filter(data => data.type === 'lodging');
    this.expenseParking = this.expenseService.getExpense().filter(data => data.type === 'parking');
    this.expenseMisc = this.expenseService.getExpense().filter(data => data.type === 'misc');
    console.log("expenseTravel");
    console.log(this.expenseTravel);
    console.log("expenseMeal");
    console.log(this.expenseMeal);

    for(let money of this.expenseTravel){
      this.travelSum += money.cost;
    }
    console.log('travel: '+this.travelSum);
    for(let money of this.expenseMeal){
      this.mealSum += money.cost;
    }
    console.log("meal:"+this.mealSum);
    for(let money of this.expenseLodging){
      this.lodgingSum += money.cost;
    }
    for(let money of this.expenseParking){
      this.parkingSum += money.cost;
    }
    for(let money of this.expenseMisc){
      this.miscSum += money.cost;
    }
    this.expenseSum=this.travelSum+this.mealSum+this.lodgingSum+this.parkingSum+this.miscSum;



    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["Travel", "Meal", "Lodging","Parking", "Misc" ],
        datasets: [
          {
            label: "# of Votes",
            data: [this.travelSum,this.mealSum,this.lodgingSum,this.parkingSum,this.miscSum],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)"
              
            ],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4bc0c0", "#36A2EB"]
          }
        ]
      }
    });

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