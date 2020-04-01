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
  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  public productList: FormArray;

 // @Output() onSubmit = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
  //  this.createProductForm();
  }

  get contactFormGroup() {
    return this.addProductForm.get('form') as FormArray;
  }

  createProduct(): FormGroup {
    return this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9_\s]*$/)])],
      description: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9_\s]*$/)])],
      price: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(2)])],
      category: ['electronics', Validators.compose([Validators.required])],
      imageURL: [null, Validators.compose([Validators.required, Validators.pattern(this.reg)])],
      phone: [null, Validators.compose([Validators.required, Validators.maxLength(10)])],
      select: ['mobile']
    });
  }

  ngOnInit() {
    this.addProductForm = this.fb.group({
      form: this.fb.array([this.createProduct()])
    });
    this.productList = this.addProductForm.get('form') as FormArray;
  }

  addProduct() {
    if (this.productList.length < 5) {
      this.productList.push(this.createProduct());
    } else {
      alert('you can add max 5 product');
    }
    console.log('productList', this.productList.length);
  }

  // remove contact from group
  removeContact(index) {
    this.productList.removeAt(index);
  }

  changedContactType(index) {
    console.log('index', index);
  }

  onFormSubmit() {
    console.log('submit');
  }

  resetForm() {
    console.log('reset');
  }

  // createProductForm(name: any = '',
  //   description: any = '',
  //   price: any = '',
  //   category: any = '',
  //   url: any = '',
  //   number: any = '',
  //   phoneType: any = '') {
  //   this.addProductForm = this.formBuilder.group({
  //     name: [name,
  //       {
  //         validators: Validators.compose([
  //           Validators.required,
  //           Validators.minLength(8),
  //           Validators.pattern(/^[a-zA-Z0-9_\s]*$/)
  //         ]),
  //         updateOn: 'blur'
  //       }
  //     ],
  //     description: [description,
  //       {
  //         validators: Validators.compose([
  //           Validators.required,
  //           Validators.minLength(3),
  //           Validators.pattern(/^[a-zA-Z0-9_\s]*$/)
  //         ]),
  //         updateOn: 'blur'
  //       }
  //     ],
  //     price: [price,
  //       {
  //         validators: Validators.compose([
  //           Validators.required,
  //           Validators.pattern(/^\d+\.\d{2}$/)
  //         ]),
  //         updateOn: 'blur'
  //       }
  //     ],
  //     category: [category,
  //       {
  //         validators: Validators.compose([
  //           Validators.required
  //         ]),
  //         updateOn: 'blur'
  //       }
  //     ],
  //     url: [url,
  //       {
  //         validators: Validators.compose([
  //           Validators.required,
  //           Validators.pattern(this.reg)
  //         ]),
  //         updateOn: 'blur'
  //       }
  //     ],
  //     number: [number,
  //       {
  //         validators: Validators.compose([
  //           Validators.required,
  //           Validators.maxLength(10),
  //           Validators.pattern("^[0-9]*$"),
  //         ]),
  //         updateOn: 'blur'
  //       }
  //     ],
  //     phoneType: [phoneType,
  //       {
  //         validators: Validators.compose([
  //           Validators.required
  //         ]),
  //         updateOn: 'blur'
  //       }
  //     ],
  //     // formArray: new FormArray([])
  //   });
  //   let formArrayInstance: any = this.addProductForm.get('venue_pricing');
  // }

  // formArrayInstance.push(this.createVenuePricingForm()) 
  // createVenuePricingForm(para1, para2): FormGroup {
  //   return this.formBuilder.group({
  //     data1: para1,
  //     data2: para2
  //   });
  // }

  submit() {
    if (this.addProductForm.valid) {
      const list:any = [this.addProductForm.value];
      localStorage.setItem('addProductForm', JSON.stringify(list));
    }
    this.addProductForm.reset();
  }

  reset() {
    this.addProductForm.reset();
  }
}