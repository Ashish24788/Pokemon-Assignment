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
        contact_person_name: any = '',
        pricing: any = '') {
        this.addProductForm = this.formBuilder.group({
            name: [name,
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
            contact_person_name: [contact_person_name,
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
            venue_pricing: new FormArray([])
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
    locationSelection(data) {
      console.log("called-->", data);
    }


    submit(data) {
        console.log("submit called-->", data); 
    }

}