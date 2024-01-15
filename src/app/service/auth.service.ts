import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from 'src/endpoints';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpOptions: any;
  constructor(private http: HttpClient) {
    // var headers_object = new HttpHeaders().set(
    //   'Content-Type',
    //   'application/json'
    // );
    // this.httpOptions = {
    //   headers: headers_object,
    // };
  }

  OtpVerification(data: any): Observable<any> {
    return this.http
      .post<any>(endpoints.loginUser, data)
      .pipe
      // catchError({err:'error'})
      ();
  }
  otpValid(data: any): Observable<any> {
    return new Observable((observer) => {
      observer.next('success');
    });
  }
  /**
   * admin login
   * @param idValue
   * @returns
   */
  saveUser(user: any): Observable<any> {
    return this.http
      .post<any>(endpoints.login, user, this.httpOptions)
      .pipe
      // catchError({err:'error'})
      ();
  }

  public get token() {
    const token: any = localStorage.getItem('Token');
    return JSON.parse(token);
  }

  public set token(value: string) {
    this.clearStorage();
    localStorage.setItem('Token', JSON.stringify(value));
  }

  public clearStorage() {
    localStorage.clear();
  }
}
