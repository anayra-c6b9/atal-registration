import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { minLength, maxLength } from 'src/app/utils/minmaxlengthValidators';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  registrationForm: FormGroup;
  submissionFlag: boolean = true;
  eventName: string = "";

  constructor(private _route: ActivatedRoute, private _registrationApi: RegistrationService, private _toastr: ToastrService, private _navRouter: Router ) {
    this.registrationForm = new FormGroup({
      prefix: new FormControl(null, [Validators.required]),
      event: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required, minLength(5),maxLength(60)]),
      institution: new FormControl(null, [Validators.required, minLength(3),maxLength(60)]),
      department: new FormControl(null, [Validators.required, minLength(3),maxLength(60)]),
      contact: new FormControl(null, [Validators.required, Validators.min(1000000000),Validators.max(9999999999)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      checked: new FormControl(true, [Validators.requiredTrue])
    })

  }


  onSubmitHandler = (event: any) => {
    event.preventDefault();
    
    this.submissionFlag = false;

    this._registrationApi.postParticipantApi({
      prefix: this.registrationForm.value.prefix || null,
      name: this.registrationForm.value.name || null,
      institution: this.registrationForm.value.institution || null,
      department: this.registrationForm.value.department || null,
      contact: this.registrationForm.value.contact || null,
      email: this.registrationForm.value.email || null,
      eventId: this.registrationForm.value.event || null
    })
    .then((res: any) => {
      if(!res || !res.success) {
        this._toastr.error("Error submitting Form! Try again.");
      } else {
        this._toastr.success("Submitted Successfully");
        this._navRouter.navigateByUrl('/registration/success');
      }
    })
    .catch(() => {
      this._toastr.error("Error submitting Form! Try again.")
    })
    .finally(() => {
      this.submissionFlag = true;
    })

  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      const eventId = params.get('application')
      if(eventId === null) {
        this._navRouter.navigate(['/registration/home'])
      } else {
        this._registrationApi.postEventByIdApi(eventId)
        .then((res: any) => {
          if(!res || !res.success){
            this._navRouter.navigate(['/registration/home']);
          }

          this.registrationForm.controls['event'].setValue(eventId)

          this.eventName = res.data.event_name;
        })
      }
    })
  }


  // onChange = () => {
  //   console.log(this.registrationForm.get('name'))
  // }

}
