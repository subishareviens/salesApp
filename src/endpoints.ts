import { environment } from './environments/environment';

export const endpoints = {
  register: environment.serverUrl + '/api/auth/register',
  user: environment.serverUrl + '/api/user',
  customer: environment.serverUrl + '/api/customer',
  login: environment.serverUrl + '/api/auth/admin/login',
  loginUser: environment.serverUrl + '/api/auth/login',
  product: environment.serverUrl + '/api/product',
  profile: environment.serverUrl + '/api/profile',
  verifyOtpex: environment.serverUrl + '/api/auth/otp/verify',
  executive: environment.serverUrl + '/api/user/sales executive',
  allocateUser: environment.serverUrl + '/api/user/allocate',
  download: environment.serverUrl + '/api/customer/download',
  sendOtp: environment.serverUrl + '/api/customer/otp/send',
};
