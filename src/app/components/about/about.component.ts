import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  myForm : FormGroup;
  constructor() {
    this.myForm = new FormGroup({
      "userName": new FormControl("", Validators.required),
      "userEmail": new FormControl("", [Validators.required, Validators.email]),
      "phones": new FormArray([
        new FormControl("+7", Validators.required)
      ])
    });
  }
  getFormsControls() : FormArray{
    return this.myForm.controls['phones'] as FormArray;
  }
  addPhone(){
    (<FormArray>this.myForm.controls["phones"]).push(new FormControl("+7", Validators.required));
  }

  submit(){
    console.log(this.myForm);
  }
  ngOnInit(): void {
  }



}
