import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  public expenses = [];
  public selectedExpense: any;
  ref = firebase.database().ref('expenses/');

  constructor() {
    this.ref.on('value', resp => {
      this.expenses = [];
      this.expenses = snapshotToArray(resp);
      console.log(this.expenses);
    });
  }

  addExpense(expense) {
    expense['user'] = firebase.auth().currentUser.email;
    return firebase.database().ref('expenses/').push(expense);
  }
}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });
  return returnArr;
};