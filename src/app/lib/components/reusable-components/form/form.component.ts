import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Console, debug, log } from 'console';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() columns: number = 1
  @Input() data: any;
  @Input() formTemplate: any;

  @Output() changedControl: any = new EventEmitter<any>();
  @Output() onSubmit: any = new EventEmitter<any>();
  submitted: boolean = false;
  public myForm: FormGroup = this.fb.group({})
  constructor(private fb: FormBuilder, private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.createForm(this.formTemplate)
    this.myForm.patchValue(this.data)
  }
  createForm(formTemplate: any) {
    for (const control of formTemplate.controls) {

      //debugger


      const validatorsToAdd = [];
      const lstValidators: string[] = [];

      if (control.validators.length > 0) {
        for (let item of control.validators) {
          let key = item.validator

          switch (key) {
            case 'min':
              //debugger
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
      this.onSubmit.emit(this.myForm.value)
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

  event(control: any,event:string) {
    //alert(this.myForm.get(control)?.value)
    this.changedControl.emit({event:event,control:control,value:this.myForm.controls[control].value})
  }

  hasEvent(control: string,event:string) {
    
    var frm = []
    frm = JSON.parse(JSON.stringify(this.formTemplate.controls)) as Array<any>    
    return !!frm.find(x=>x.name == control).events?.includes(event)
    
  }


  ngOnChanges(changes: SimpleChanges) {

    //debugger
    console.log('formasd',changes['formTemplate']?.currentValue);
    
    this.createForm(changes['formTemplate']?.currentValue)
    this.myForm.patchValue(changes['data']?.currentValue)
    

  }

}
