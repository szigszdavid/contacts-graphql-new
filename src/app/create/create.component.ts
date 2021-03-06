import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { CreateContactRequestBody } from 'src/CreateContactRequestBody';
import { FindContactByIdGql } from 'src/FindContactByIdGql';
import { GetByIdRequest } from 'src/GetByIdRequest';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit,OnChanges {

  @Input() contact!: GetByIdRequest
  @Output() save = new EventEmitter<CreateContactRequestBody>()

  constructor(private fb : FormBuilder) { }

  contactForm = this.fb.group({
    firstName : ['', [Validators.required]],
    lastName : ['', [Validators.required]],
    phoneNumber : ['', [Validators.required]],
    emailAddress : ['', [Validators.required]],
    comment : [''],
    companyId : ['', [Validators.required]]
  })

  get firstName() : AbstractControl {
    return this.contactForm.get("firstName")!;
  }

  get lastName() : AbstractControl {
    return this.contactForm.get("lastName")!;
  }

  get phoneNumber() : AbstractControl {
    return this.contactForm.get("phoneNumber")!;
  }

  get emailAddress() : AbstractControl {
    return this.contactForm.get("emailAddress")!;
  }

  get comment() : AbstractControl {
    return this.contactForm.get("comment")!;
  }

  get companyId() : AbstractControl {
    return this.contactForm.get("companyId")!;
  }

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.contactForm.patchValue(this.contact!);
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log("Submits");
      
      this.save.emit(this.contactForm.value);
    }
  }

}
