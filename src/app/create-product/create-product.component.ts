import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormControlName, FormArray } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  public addProductForm: FormGroup;
  msgs: any[];

  @Output() onSubmit = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) {
    this.createProductForm();
  }
  ngOnInit() {
  }

  createProductForm(name: any = '',
    description: any = '',
    price: any = '',
    category: any = '',
    url: any = '',
    number: any = '',
    phoneType: any = '') {
    this.addProductForm = this.formBuilder.group({
      name: [name,
        {
          validators: Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
            // Validators.pattern(/^[a-zA-Z0-9_\s]*$/)
          ]),
          updateOn: 'blur'
        }
      ],
      description: [description,
        {
          validators: Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
            Validators.pattern(/^[a-zA-Z0-9_\s]*$/)
          ]),
          updateOn: 'blur'
        }
      ],
      price: [price,
        {
          validators: Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
            Validators.pattern(/^[a-zA-Z0-9_\s]*$/)
          ]),
          updateOn: 'blur'
        }
      ],
      category: [category,
        {
          validators: Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
            Validators.pattern(/^[a-zA-Z0-9_\s]*$/)
          ]),
          updateOn: 'blur'
        }
      ],
      url: [url,
        {
          validators: Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
            Validators.pattern(/^[a-zA-Z0-9_\s]*$/)
          ]),
          updateOn: 'blur'
        }
      ],
      number: [number,
        {
          validators: Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
            Validators.pattern(/^[a-zA-Z0-9_\s]*$/)
          ]),
          updateOn: 'blur'
        }
      ],
      phoneType: [phoneType,
        {
          validators: Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
            Validators.pattern(/^[a-zA-Z0-9_\s]*$/)
          ]),
          updateOn: 'blur'
        }
      ],
      // formArray: new FormArray([])
    });
    let formArrayInstance: any = this.addProductForm.get('venue_pricing');
  }

  // formArrayInstance.push(this.createVenuePricingForm()) 
  createVenuePricingForm(para1, para2): FormGroup {
    return this.formBuilder.group({
      data1: para1,
      data2: para2
    });
  }

  submit(data) {
    console.log("submit called-->", data);
  }

}