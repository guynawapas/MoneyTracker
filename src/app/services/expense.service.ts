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

  async reloadData() {
    let data = await firebase.database().ref('expenses/').once('value').then( (snapshot) => {
      console.log(snapshot.val())
      this.expenses = snapshotToArray(snapshot);
      console.log(this.expenses);
    });
    return await this.ref.on('value', resp => {
      return resp;
    });
  }

  getExpense() {
    // console.log(firebase.auth().currentUser.email)
    if(firebase.auth() === null) {
      return [];
    }
    return this.expenses.filter(data => data.user === firebase.auth().currentUser.email);
  }
  getTravel(){
    return this.getExpense().filter(data => data.type === 'travel');

  }
}

export const snapshotToArray = snapshot => {
  let returnArr = [];
  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  })
  return returnArr;
};