import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/service/shared.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit, OnDestroy {
  confirmed = 'Product Added';
  product: any = '';
  editSelectedProduct: any;
  updateText = false;
  productId: any;
  productAdded = false;
  subscription: Subscription[] = [];
  fill = false;
  constructor(
    private service: SharedService,
    private route: Router,
    private router: ActivatedRoute
  ) {}
  public products = new FormGroup({
    name: new FormControl('', [Validators.required, Utils.whitespace()]),
    quantity: new FormControl('', [Validators.required]),
  });

  getProductData() {
    console.log(this.products);
    if (this.products.status == 'VALID') {
      this.product = this.products.value;
      this.subscription.push(
        this.service
          .saveProducts(this.product, this.productId)
          .subscribe((data: any) => {
            if (data._id) {
              this.productAdded = false;
              this.route.navigate(['/dashboard/products'], {
                state: { redirectfromAddUpdate: true },
              });
            } else {
              this.productAdded = true;
              setTimeout(() => {
                this.productAdded = false;
                this.route.navigate(['/dashboard/products'], {
                  state: { redirectfromAdd: true },
                });
              }, 3000);
            }
          })
      );
    }
    this.fill = true;
  }
  ngOnDestroy(): void {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }
  ngOnInit(): void {
    const editProduct = this.router.params.subscribe((data) => {
      if (data?.['id']) {
        this.editSelectedProduct = history.state.product;
        console.log(this.editSelectedProduct, 'kk');
        if (this.editSelectedProduct) {
          this.productId = data?.['id'];
          this.products.patchValue(this.editSelectedProduct);
          this.updateText = true;
          //update the form data
          // this.employee.controls['name'].disable(); //disable to edit
        }
      }
    });
  }
}
