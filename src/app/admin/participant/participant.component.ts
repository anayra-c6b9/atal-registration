import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin/admin.service';
import { maxLength, minLength } from 'src/app/utils/minmaxlengthValidators';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnInit {
  registrationForm: FormGroup;
  participantData: any;

  constructor(private _adminApi: AdminService, private _route: ActivatedRoute, private _toastr: ToastrService, private _navRouter: Router) {
    this.registrationForm = new FormGroup({
      prefix: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required, minLength(5),maxLength(60)]),
      institution: new FormControl(null, [Validators.required, minLength(3),maxLength(60)]),
      department: new FormControl(null, [Validators.required, minLength(3),maxLength(60)]),
      contact: new FormControl(null, [Validators.required, Validators.min(1000000000),Validators.max(9999999999)]),
      email: new FormControl(null, [Validators.required, Validators.email])
    })
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      const userId = params.get('participant')
      const eventId = params.get('report')
      if(userId === null || eventId === null) {
        this._navRouter.navigate(['/admin/home'])
      } else {
        this._adminApi.participantByIdApi(userId, eventId)
        .then((res: any) => {
          if(!res || !res.success){
            this._toastr.error("participant doesn't exist")
            this._navRouter.navigate(['/admin/home']);
          }

          this.participantData = res.data;
          if(res.data){
            this.assignFormData(res.data)
          }
        })
        .catch(() => {
          this._toastr.error("Something went wrong");
          this._navRouter.navigate(['/admin/home']);
        })
      }
    })
  }

  assignFormData = (userData: any) => {
    this.registrationForm.controls['prefix'].setValue(userData.prefix);
    this.registrationForm.controls['name'].setValue(userData.name);
    this.registrationForm.controls['institution'].setValue(userData.institute);
    this.registrationForm.controls['department'].setValue(userData.department);
    this.registrationForm.controls['contact'].setValue(userData.contact);
    this.registrationForm.controls['email'].setValue(userData.email);
  }
}
