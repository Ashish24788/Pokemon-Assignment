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

  constructor(private fb: FormBuilder) {
  }

  get contactFormGroup() {
    return this.addProductForm.get('form') as FormArray;
  }

  createProduct(): FormGroup {
    return this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9_\s]*$/)])],
      description: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9_\s]*$/)])],
      price: [null, Validators.compose([Validators.required, Validators.pattern(/^\d+\.\d{2}$/)])],
      category: ['electronics', Validators.compose([Validators.required])],
      imageURL: [null, Validators.compose([Validators.required, Validators.pattern(this.reg)])],
      phone: [null, Validators.compose([Validators.required, Validators.maxLength(10), Validators.pattern(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/)])],
      select: ['mobile']
    });
  }

  ngOnInit() {
    this.productForm();
  }

  productForm() {
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
  }

  onFormSubmit() {
    const productData = JSON.parse(localStorage.getItem('addProductForm'));
    let productDataList = this.addProductForm && this.addProductForm.value && this.addProductForm.value.form;
    if (productData && productData.length > 0) {
      productDataList = [...productDataList, ...productData];
    }
    localStorage.setItem('addProductForm', JSON.stringify(productDataList).concat());
    this.productForm();
  }

  resetForm() {
    this.productForm();
  }
}
