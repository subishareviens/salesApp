import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-product-allocation',
  templateUrl: './product-allocation.component.html',
  styleUrls: ['./product-allocation.component.scss'],
})
export class ProductAllocationComponent implements OnInit {
  @Input() allocate: any;
  @Input() errorList: any;
  @Output() closeAllocate = new EventEmitter();
  productList: any;
  qtyError: any;
  productStatus: boolean;
  chooseError = false;
  constructor(private fb: FormBuilder, private service: SharedService) {}
  productDetail: any;
  @Input() productMessage: any;

  @Output() addProd = new EventEmitter();
  public allocated = this.fb.group({
    products: this.fb.array([
      this.fb.group({
        id: [''],
        quantity: [1],
      }),
    ]),
  });
  closeProduct() {
    this.closeAllocate.emit();
  }
  reset() {
    const ProductArray = this.allocated.get('products') as FormArray;
    while (ProductArray.length !== 1) {
      ProductArray.removeAt(0);
    }
    this.allocated.patchValue({
      products: [{ id: '', quantity: 1 }],
    });
  }
  addProduct() {
    this.productDetail = this.allocated.get('products') as FormArray;
    this.productDetail.push(this.createProductField());
  }
  getValidity(i: any) {
    this.productStatus = (<FormArray>this.allocated.get('products')).controls[
      i
    ].invalid;
  }
  selectProduct() {
    const productArray = this.allocated.value.products;
    this.productList.forEach((item: any) => {
      const value = productArray.find((obj) => obj.id == item._id);
      if (value) {
        item.disable = true;
      } else {
        item.disable = false;
      }
    });
  }
  createProductField(): FormGroup {
    return new FormGroup({
      id: new FormControl('', [Validators.required]),
      quantity: new FormControl('1', [Validators.required]),
    });
  }
  get products() {
    return this.allocated.get('products') as FormArray;
  }
  add() {
    this.chooseError = true;

    let selectedProduct: any = this.allocated.value.products;
    selectedProduct.map((item: any) => {
      const product = this.productList.find((obj: any) => obj._id == item.id);
      item['name'] = product.name;
      return item;
    });
    console.log(selectedProduct, 'item');
    console.log(this.allocated, 'll');
    if (this.allocated.status == 'VALID') {
      this.addProd.emit(selectedProduct);
      // this.allocate = false;
    } else {
      this.qtyError = 'Enter valid quantity';
      setTimeout(() => {
        this.qtyError = '';
      }, 2000);
    }
    setTimeout(() => {
      this.chooseError = false;
    }, 3000);
  }
  changeQuantity(count: any, status: string, index: number) {
    if (status == 'decrement') {
      if (count > 1) count--;
    } else {
      count++;
    }
    this.products?.at(index)?.get('quantity')?.setValue(count);
  }
  hideproductdp(index: number) {
    const ProductArray = this.allocated.get('products') as FormArray;
    ProductArray.removeAt(index);
  }
  getProductavailability(index: number) {
    const selectedProduct = this.allocated.value.products[index];
    const status = this.errorList?.find(
      (err: any) => err.id === selectedProduct.id
    );
    return status ? status.message : false;
  }

  ngOnInit(): void {
    this.service.getProducts().subscribe((productDetail: any) => {
      console.log(productDetail, 'productDetail');
      this.productList = productDetail;
    });
  }
}
