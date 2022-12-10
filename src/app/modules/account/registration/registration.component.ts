import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiHelperService } from 'src/app/lib/services/api-helpers/api-helper.service';
import { LayoutService } from 'src/app/lib/services/layout-service/layout.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  data: any
  lstCity: Array<any> = [{ key: 'MUM', value: 'Mumbai', code: "IND" },
  { key: 'NY', value: 'New York', code: "USA" },
  { key: 'TOR', value: 'Toronto', code: "CAN" }]
  frmTemplate: any;

  constructor(private _layoutService: LayoutService, private cdref: ChangeDetectorRef,private _apiService:ApiHelperService) { }

  ngOnInit(): void {
    //this._layoutService.setConfig({ header: true, footer: true, sidebar: true })
    this._apiService.get("https://jsonplaceholder.typicode.com/todos/1").subscribe(resp=>{
      alert(JSON.stringify(resp))
    })

     this.frmTemplate = {
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
              }],
            "events": ["change"]
          },
          {
            "name": "middleName",
            "label": "Middle name:",
            "value": "",
            "type": "text",

            "validators": [
              {
                "validator": "required",
                "errormessage": "Middle name is required."
              },
              ],
            "events": ["change"]
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
            "value": null,
            "type": "radio",
            "options": [
              { key: 'M', value: 'Male' },
              { key: 'F', value: 'Female' },
              { key: 'O', value: 'Other' },
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
            "name": "state",
            "label": "State",
            "value": null,
            "type": "dropdown",
            "events": ["change", "keyup", "keydown", "click"],
            "options": [
              { key: 'IND', value: 'India' },
              { key: 'USA', value: 'America' },
              { key: 'CAN', value: 'Canada' },
            ],
            "validators": [
              {
                "validator": "required",
                "errormessage": "State is required."
              }
            ]
          },
          {
            "name": "City",
            "label": "City",
            "value": null,
            "type": "dropdown",
            "events": ["change", "keyup", "keydown", "click"],
            "options": [

            ],
            "validators": [
              {
                "validator": "required",
                "errormessage": "City is required."
              }
            ]
          },
          {
            "name": "Date",
            "label": "DOB",
            "value": null,
            "min": new Date().toISOString().split('T')[0],
            "max": "2023-01-15",
            "type": "date",
            "validators": [
              {
                "validator": "required",
                "errormessage": "City is required."
              }
            ]
          }
        ]
      }
    setTimeout(() => {
     
      //this.data = { "firstName": "ASSSSSSSSSSSSSSSSSSSSSSSSS", "lastName": "ASSSSSSSSSSSSSSSSSSSSSSSS", "comments": "ASDDDDDDDDDDDDDDDDDDDDDDDDDDDDD", "size": 76, "Gender": "F", "Sports": true, "City": "Hockey", "Date": "2022-12-16" }

    }, 2000);

    
  }

  triggeredEvent(event: any) {
    debugger
    if (event.event == 'change' && event.control == 'state') {
      let frm = this.frmTemplate.controls as Array<any>
      frm.find(x => x.name == 'City').options = []
      frm.find(x => x.name == 'City').options = this.lstCity.filter(x => x.code == event.value)
      this.frmTemplate.controls = JSON.parse(JSON.stringify(frm)) as Array<any>;

    }
  }
  ngAfterContentInit(): void {
    this._layoutService.setConfig({ header: true, footer: true, sidebar: true })
  }
  ngOnDestroy(): void {
    this._layoutService.resetConfig();
  }


  onSubmit(data: any) {
    alert(JSON.stringify(data))
  }



}
