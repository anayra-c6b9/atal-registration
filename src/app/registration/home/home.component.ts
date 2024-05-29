import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { TrackById } from 'src/app/utils/trackFn';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  eventData: any[] = []
  trackFn = TrackById

  constructor(
    private _registrationApi: RegistrationService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getEvents()
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
