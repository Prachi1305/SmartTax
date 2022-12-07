import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Console, debug, log } from 'console';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() columns: number = 1
  @Input() formTemplate: any = {
    "controls": [
      {
        "name": "firstName",
        "label": "First name:",
        "value": "",
        "type": "text",
        "validators": [
          {
            "validator": "required",
            "errormessage": "First name is required."
          },
          {
            "validator": "minlength",
            "value": 10,
            "errormessage": "First name should be 10 characters long."
          }]
      },
      {
        "name": "lastName",
        "label": "Last name:",
        "value": "",
        "type": "text",
        "validators": [
          {
            "validator": "required",
            "errormessage": "Last name is required."
          },
          {
            "validator": "minlength",
            "value": 10,
            "errormessage": "Last name should be 10 characters long."
          }]
      },
      {
        "name": "comments",
        "label": "Comments",
        "value": null,
        "type": "textarea",
        "validators": [
          {
            "validator": "minlength",
            "value": 20,
            "errormessage": "Comments should be 20 characters long."
          }
        ]
      },
      {
        "name": "size",
        "label": "Size",
        "value": null,
        "type": "range",
        "options": {
          "min": "0",
          "max": "100",
          "step": "1",
          "icon": "sunny"
        },
        "validators": [{}]
      },
      {
        "name": "Gender",
        "label": "Please select your gender.",
        "value":null,
        "type": "radio",
        "options": [
          { key: 'M', value: 'Male' },
          { key: 'F', value: 'Female' },
        ],
        "validators": [
          { "validator": "required", "errormessage": "Gender is required" }
        ]
      },
      {
        "name": "Sports",
        "label": "Your favourite sport?",
        "value": 0,
        "type": "checkbox",
        "options": [
          { key: 'Cricket', value: 'Cricket' },
          { key: 'Football', value: 'Football' },
          { key: 'Hockey', value: 'Hockey' },
        ],
        "validators": [{}]
      },
      {
        "name": "City",
        "label": "City",
        "value": null,
        "type": "dropdown",
        "options": [
          { key: 'Cricket', value: 'Cricket' },
          { key: 'Football', value: 'Football' },
          { key: 'Hockey', value: 'Hockey' },
        ],
        "validators": [
          {
            "validator": "required",
            "errormessage":"City is required."
          }
        ]
      },
      {
        "name": "Date",
        "label": "DOB",
        "value": null,
        "type": "date",
        "validators": [
          {
            "validator": "required",
            "errormessage":"City is required."
          }
        ]
      }
    ]
  }
  submitted: boolean = false;
  public myForm: FormGroup = this.fb.group({})
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm(this.formTemplate)
  }
  createForm(formTemplate: any) {
    for (const control of formTemplate.controls) {

      debugger


      const validatorsToAdd = [];
      const lstValidators: string[] = [];
      
      if (control.validators.length > 0) {
        for (let item of control.validators) {
          let key = item.validator

          switch (key) {
            case 'min':
              debugger
              validatorsToAdd.push(Validators.min(item.value));
              break;
            case 'max':
              validatorsToAdd.push(Validators.max(item.value));
              break;
            case 'required':
              validatorsToAdd.push(Validators.required);

              break;
            case 'requiredTrue':
              if (control.validators[0][key]) {
                validatorsToAdd.push(Validators.requiredTrue);
              }
              break;
            case 'email':
              if (control.validators[0][key]) {
                validatorsToAdd.push(Validators.email);
              }
              break;
            case 'minlength':
              validatorsToAdd.push(Validators.minLength(item.value));
              break;
            case 'maxlength':
              validatorsToAdd.push(Validators.maxLength(item.value));
              break;
            case 'pattern':
              validatorsToAdd.push(Validators.pattern(item.value));
              break;
            case 'nullValidator':
              if (control.validators[0][key]) {
                validatorsToAdd.push(Validators.nullValidator);
              }
              break;
            default:
              break;
          }
        }
        this.myForm.addControl(
          control.name,
          this.fb.control(control.value, validatorsToAdd)
        );
        lstValidators.length = 0;
      }
    }
   
  }
  submit() {
    this.submitted = true;
    if (this.myForm.valid) {

      alert(JSON.stringify(this.myForm.value))
    }
    else {
      return
    }
  }
  get f() {
    return this.myForm.controls;
  }
  checkError(control: string) {
    return !!this.myForm.controls[control].errors;
  }
  returnError(control: any) {
    const validatorsToAdd = [];
    const lstValidators: string[] = [];
    const lstValidatorsMessage: string[] = [];
    const valdiationMessages: string[] = [];

    control.validators.forEach((element: any) => {
      lstValidators.push(Object.keys(element)[0])
      lstValidatorsMessage.push(Object.keys(element)[1])

    });

    for (let key of lstValidators) {
      console.log(key);
      debugger
      switch (key) {
        case 'min':
          //validatorsToAdd.push(Validators.min(control.validators[0][key]));
          break;
        case 'max':
          // validatorsToAdd.push(Validators.max(control.validators[0][key]));
          break;
        case 'required':
          if (control.validators[0][key]) {
            valdiationMessages.push(control.validators[0]['errorMessage'])
            // validatorsToAdd.push(Validators.required);
          }
          break;
        case 'requiredTrue':
          if (control.validators[0][key]) {
            //  validatorsToAdd.push(Validators.requiredTrue);
          }
          break;
        case 'email':
          if (control.validators[0][key]) {
            //validatorsToAdd.push(Validators.email);
          }
          break;
        case 'minLength':
          //validatorsToAdd.push(Validators.minLength(control.validators[0][key]));
          break;
        case 'maxLength':
          // validatorsToAdd.push(Validators.maxLength(control.validators[0][key]));
          break;
        case 'pattern':
          // validatorsToAdd.push(Validators.pattern(control.validators[0][key]));
          break;
        case 'nullValidator':
          if (control.validators[0][key]) {
            // validatorsToAdd.push(Validators.nullValidator);
          }
          break;
        default:
          break;
      }




    }
    console.log('validations', valdiationMessages)
    return valdiationMessages
  }

  returnError1(error: any, control: any) {

    return !!this.myForm.controls[control].hasError(error.toLowerCase());
  }
}
