import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AlertService } from './../core/alert.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  addProductForm: FormGroup;
  msgs: any[];
  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  productList: FormArray;

  constructor(private fb: FormBuilder, private alertService: AlertService) {}

  get contactFormGroup() {
    return this.addProductForm.get('form') as FormArray;
  }

  /**
   * @ngdoc component
   * @name createProduct
   * @memberof CreateProductComponent
   * @returns {object} Form object instance
   *
   * @description
   *
   * This function is used to provide form group and all fields with their validations
   **/

  createProduct = (): FormGroup => {
    return this.fb.group({
      name: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[a-zA-Z0-9_\s]*$/),
        ]),
      ],
      description: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[a-zA-Z0-9_\s]*$/),
        ]),
      ],
      price: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(/^\d+\.\d{2}$/),
        ]),
      ],
      category: ['electronics', Validators.compose([Validators.required])],
      imageURL: [
        null,
        Validators.compose([Validators.required, Validators.pattern(this.reg)]),
      ],
      phone: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/),
        ]),
      ],
      select: ['mobile'],
    });
  };

  /**
   * @ngdoc component
   * @name ngOnInit
   * @memberof CreateProductComponent
   *
   * @description
   *
   * It calls productForm method which is used to render product form as its initialize phase
   **/

  ngOnInit() {
    this.productForm();
  }

  /**
   * @ngdoc component
   * @name productForm
   * @memberof CreateProductComponent
   *
   * @description
   *
   * this creates form builder and render new form
   **/

  productForm = () => {
    this.addProductForm = this.fb.group({
      form: this.fb.array([this.createProduct()]),
    });
    this.productList = this.addProductForm.get('form') as FormArray;
  };

  /**
   * @ngdoc component
   * @name addProduct
   * @memberof CreateProductComponent
   *
   * @description
   *
   * This calls when we click addNewProduct button
   * It render atleast 5 new forms
   **/

  addProduct = () => {
    if (this.productList.length < 5) {
      this.productList.push(this.createProduct());
    } else {
      this.alertService.showAlert({ text: 'you can add max 5 product' });
    }
  };

  /**
   * @ngdoc component
   * @name onFormSubmit
   * @memberof CreateProductComponent
   *
   * @description
   *
   * This function is call when we submit form
   * this function checks that form have values and data exists there
   * fetch already saved data from database and combined it with currently save data and save it in localstorage
   **/

  onFormSubmit = () => {
    const productData = JSON.parse(localStorage.getItem('addProductForm'));
    let productDataList =
      this.addProductForm &&
      this.addProductForm.value &&
      this.addProductForm.value.form;
    if (productData && productData.length > 0) {
      productDataList = [...productDataList, ...productData];
    }
    localStorage.setItem(
      'addProductForm',
      JSON.stringify(productDataList).concat()
    );
    this.productForm();
  };

  /**
   * @ngdoc component
   * @name resetForm
   * @memberof CreateProductComponent
   *
   * @description
   *
   * It used to reset form and render it in its initilize phase
   **/

  resetForm = () => {
    this.productForm();
  };
}
