import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { minLength, maxLength } from 'src/app/utils/minmaxlengthValidators';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private route: ActivatedRoute) {
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
    console.log(this.registrationForm.valid)
    console.log(this.registrationForm.value)
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.registrationForm.controls['event'].setValue(params.get('application'))
    })
  }


  // onChange = () => {
  //   console.log(this.registrationForm.get('name'))
  // }

}
