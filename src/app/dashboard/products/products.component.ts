import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/service/shared.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  executiveData: any;
  products: any;
  addedProduct: any;
  productsClone: any;
  popTop: any;
  openDelete = false;
  subscription: Subscription[] = [];
  top = '106px';
  left = '50%';
  productId: any;
  updateProduct: any;
  text = 'product';
  searchText: string;
  viewAll = false;
  // slider
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoWidth: true,
    nav: true,
  };

  constructor(
    private service: SharedService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  deleteSelectProduct(id: any) {
    this.service.deleteProduct(id).subscribe({
      next: (success: any) => {
        this.service.setPopups({
          status: true,
          // right: '50%',
          // bottom: '20%',
          message: 'Product deleted successfully',
        });
        this.getProductData();

        setTimeout(() => {
          this.service.setPopups({
            status: false,
          });
        }, 2500);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
    this.openDelete = false;
  }
  hideDeletePopup() {
    this.openDelete = false;
  }
  getProductData() {
    this.subscription.push(
      this.service.getProducts().subscribe((productList: any) => {
        this.products = productList;
        this.productsClone = productList;

        if (this.updateProduct) {
          this.service.setPopups({
            status: true,
            // right: '50%',
            // bottom: '52%',
            message: 'Product updated  successfully',
          });

          setTimeout(() => {
            this.service.setPopups({
              status: false,
            });
          }, 2500);
          this.updateProduct = false;
        } else if (this.addedProduct) {
          this.service.setPopup({
            status: true,
            right: '50%',
            bottom: '52%',
            message: `Product ${this.products.length} added`,
          });

          setTimeout(() => {
            this.service.setPopup({
              status: false,
            });
          }, 2500);
          this.addedProduct = false;
        }
      })
    );
  }
  showAllProducts() {
    this.viewAll = true;
  }
  deleteProduct(id: any) {
    this.openDelete = true;
    this.productId = id;
  }
  editProduct(product: any) {
    this.router.navigate(['/dashboard/add-product', product._id], {
      state: { product },
    });
    console.log();
    // this.service.UpdateProducts(product, id).subscribe((data: any) => {});
  }
  searchProduct(text: string) {
    this.searchText = text;
    this.products = this.productsClone.filter((data: any) =>
      data.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }
  ngOnInit(): void {
    console.log(this.addedProduct);
    this.popTop = '0';
    this.getProductData();
    this.subscription.push(
      this.route.params.subscribe((data) => {
        this.addedProduct = history.state.redirectfromAdd;
        this.updateProduct = history.state.redirectfromAddUpdate;
      })
    );

    this.service.getExecutiveData().subscribe((executive: any) => {
      this.executiveData = executive.data.filter(
        (item: any) => item.allocatedProducts != ''
      );
    });
  }
}
