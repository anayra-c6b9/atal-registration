import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { HomeComponent } from './home/home.component';
import { ReportComponent } from './report/report.component';
import { ParticipantComponent } from './participant/participant.component';

const routes: Routes = [
  {
    path: "",
    component: AdminNavComponent,
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
      },
      {
        path: "home",
        component: HomeComponent
      },
      {
        path: ":report",
        component: ReportComponent
      },
      {
        path: ":report/:participant",
        component: ParticipantComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
