import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ApplicationComponent } from './application/application.component';
import { NotfoundComponent } from '../notfound/notfound.component';
import { TemplateComponent } from './template/template.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  {
    path: "",
    component: TemplateComponent,
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
        path: "success",
        component: SuccessComponent
      },
      {
        path: ":application",
        component: ApplicationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
