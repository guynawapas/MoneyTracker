import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpenseNewPageRoutingModule } from './expense-new-routing.module';

import { ExpenseNewPage } from './expense-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpenseNewPageRoutingModule
  ],
  declarations: [ExpenseNewPage]
})
export class ExpenseNewPageModule {}
