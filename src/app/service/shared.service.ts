import { Injectable } from '@angular/core';
import { Observable, Subject, catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { endpoints } from 'src/endpoints';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  loginRole = '';
  private $popup: Subject<any> = new Subject();
  private $popups: Subject<any> = new Subject();

  public set sRole(data: string) {
    this.loginRole = data;
  }
  public get sRole(): string {
    return this.loginRole;
  }

  /**
   * method to set the popup message
   * @returns
   */
  getPopup(): Observable<any> {
    return this.$popup.asObservable();
  }
  /**
   * method to update popup message
   * @param message
   */
  setPopup(message: any) {
    this.$popup.next(message);
  }
  /**
   * method to set the popup
   * @returns
   */
  getPopups(): Observable<any> {
    return this.$popups.asObservable();
  }
  /**
   * method to update popup
   * @param message
   */
  setPopups(message: any) {
    this.$popups.next(message);
  }
  // getProductData() {}

  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * method to get all customers
   * @returns
   */
  getCustomerData(): any {
    return this.http.get<any>(endpoints.customer);
  }

  /**
   * method to get all users
   * @returns
   */
  getExecutiveData(): any {
    return this.http.get<any>(endpoints.executive);
  }

  /**
   * method to save executive data
   * @param data
   * @returns
   */
  saveCustomerData(data: any, id: any): any {
    if (id) {
      return this.http.put<any>(`${endpoints.customer}/${id}`, data);
    }
    return this.http.post<any>(endpoints.customer, data);
  }
  saveExecutiveData(data: any): any {
    return this.http.post<any>(endpoints.register, data);
  }
  /**
   * method to get a single executive data
   * @param data
   * @returns
   */
  getUserProfile(data: any): any {
    return this.http.get<any>(endpoints.user);
  }
  /**
   * method to delete customer data
   * @param idValue
   * @returns
   */
  setDeleteData(id: any): any {
    // let indexValue = this.customerData.findIndex((item) => item.id == idValue);
    // this.customerData.splice(indexValue, 1);
    // return new Observable((observer) => {
    //   observer.next('deleted');
    // });
    return this.http.delete<any>(`${endpoints.customer}/${id}`);
  }

  /**
   * method to delete executive data
   * @param idValue
   * @returns
   */
  setDeleteExecutiveData(id: any): any {
    return this.http.delete<any>(`${endpoints.user}/${id}`);
  }
  /**
   * method to downloaddata
   * @param idValue
   * @returns
   */
  downloadCustomerData(from: any, to: any): any {
    return this.http.get<any>(
      `${endpoints.download}?limit=2&page=0&from=${from}&to=${to}`,
      {
        responseType: 'blob' as 'json',
      }
    );
  }
  /**
   * method to add product
   * @param id
   * @returns
   */
  saveProducts(productData: any, id: any): any {
    if (id) {
      return this.http.put<any>(`${endpoints.product}/${id}`, productData);
    }
    const res = this.http.post<any>(endpoints.product, productData);
    console.log(res, 'res');
    return res;
  }

  getProducts(): any {
    return this.http.get<any>(endpoints.product);
  }
  deleteProduct(productId: any): any {
    return this.http.delete<any>(`${endpoints.product}/${productId}`);
  }
  // UpdateProducts(data: any, id: any): Observable<any> {
  //   return this.http.put<any>(`${endpoints.product}/${id}`, data);
  // }
  /**
   * method to allocate product
   * @returns
   */
  // allocateProduct(): Observable<any> {
  //   return this.http.post<any>(endpoints.saveProduct, this.httpOptions);
  // }
  /**
   * method to get user profile
   * @returns
   */
  getProfile(): any {
    return this.http
      .get<any>(endpoints.profile)
      .pipe
      // catchError({err:'error'})
      ();
  }
  /**
   * method to update user profile
   * @returns
   */
  updateUserProfile(newData: any, id: any): any {
    return this.http
      .put<any>(`${endpoints.user}/${id}`, newData)
      .pipe
      // catchError({err:'error'})
      ();
  }
  updateAdminProfile(password: any): any {
    return this.http
      .put<any>(endpoints.profile, password)
      .pipe
      // catchError({err:'error'})
      ();
  }
  verifiedOtp(otp: any, phnum: any): any {
    return this.http
      .post<any>(`${endpoints.verifyOtpex}/91${phnum}`, { otp })
      .pipe
      // catchError({err:'error'})
      ();
  }
  otpSend(phnum: any): any {
    return this.http
      .post<any>(`${endpoints.sendOtp}/91${phnum}`, {})
      .pipe
      // catchError({err:'error'})
      ();
  }
  /**
   * method to allocate product to user
   * @param id
   * @param product
   * @returns
   */
  allocateProduct(id: any, product: any): any {
    return this.http
      .post<any>(`${endpoints.allocateUser}?userID=${id}`, product)
      .pipe
      // catchError({err:'error'})
      ();
  }
}
