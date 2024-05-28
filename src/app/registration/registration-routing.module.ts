import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ApplicationComponent } from './application/application.component';
import { NotfoundComponent } from '../notfound/notfound.component';
import { TemplateComponent } from './template/template.component';

const routes: Routes = [
  {
    path: "",
    component: TemplateComponent,
    children: [
      {
        path: "home",
        component: HomeComponent
      },
      {
        path: ":application",
        component: ApplicationComponent
      },
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
