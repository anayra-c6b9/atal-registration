import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { HomeComponent } from './home/home.component';
import { ReportComponent } from './report/report.component';


@NgModule({
  declarations: [
    AdminNavComponent,
    HomeComponent,
    ReportComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
