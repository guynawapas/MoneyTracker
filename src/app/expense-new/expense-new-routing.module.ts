import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpenseNewPage } from './expense-new.page';

const routes: Routes = [
  {
    path: '',
    component: ExpenseNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpenseNewPageRoutingModule {}
