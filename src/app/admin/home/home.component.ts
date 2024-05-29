import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { TrackById } from 'src/app/utils/trackFn';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  eventData: any[] = []
  trackFn = TrackById

  constructor(
    private _registrationApi: RegistrationService,
    private _toastr: ToastrService,
    private _authApi: AuthService,
    private _navRouter: Router
  ) {}

  ngOnInit(): void {
    this._authApi.adminVerify()
    .then((res: any) => {
      // console.log(res)
      // console.log("home check")
      if(!res || !res.success){
        this._toastr.error("You are unauthorized");
        this._navRouter.navigateByUrl("/login")
      }

      this.getEvents()
    })
    .catch(() => {
      this._toastr.error("Something went wrong!");
        this._navRouter.navigateByUrl("/login")
    })
    
  }

  getEvents() {
    this._registrationApi.getEventsApi()
    .then((res: any) => {
      // console.log(res)
      if(res.success) {
        this.eventData = res.data.map((data: any) => ({
          _id: data._id,
          event_name: data.event_name,
          link: [`../${data._id.toString()}`]
        }));
        // console.log("links")
        // console.log(this.eventData)
      } else {
        this._toastr.error("Failed to load events, Please Refresh")
      }
    })
    .catch((err: any) =>{
      // toastr
      this._toastr.error("Failed to load events, Please Refresh")
    })
  }
}
