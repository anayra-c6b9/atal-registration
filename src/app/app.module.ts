import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http"
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { RegisterComponent } from './register/register.component';
import { FormComponent } from './form/form.component';
import { RegisterationFormComponent } from './registeration-form/registeration-form.component';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    FormComponent,
    RegisterationFormComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoadingBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
