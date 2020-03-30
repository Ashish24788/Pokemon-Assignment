import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  public createForm: FormGroup;
  public formErrors = {name: '', description: '', price: ''};
  public validationMessages = {
    name: {
      required: 'Name is required.',
      name: 'Name must be a valid name'
    },
    description: {
      required: 'Description is required.',
      description: 'Description must be a valid Description'
    },
    price: {
      required: 'Price is required.',
      price: 'Price must be a valid Price'
    }
  };

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.name, Validators.minLength(6), Validators.maxLength(25)]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]]
    });
    // Binding Form Validator
    this.createForm.valueChanges.subscribe((data) => this.onValueChanged(data));
  }

  onValueChanged(data: any) {
    if (!this.createForm) {
      return;
    }
    const form = this.createForm;
    for (const field in this.formErrors) {
      // Clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

}