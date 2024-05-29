import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  // get logout
  adminLogoutApi = async () => {
    const getEvents$ = this._http.get(("http://localhost:3000"+environment.ADMIN_LOGOUT));

    return await lastValueFrom(getEvents$);
  }

  // post login
  adminLoginApi = async (loginCred: any) => {
    const postLogin$ = this._http.post("http://localhost:3000"+environment.ADMIN_LOGIN, loginCred);

    return await lastValueFrom(postLogin$);
  }

  adminVerify = async () => {
    const verification$ = this._http.get("http://localhost:3000"+environment.ADMIN_VERIFY, {withCredentials: true});

    return await lastValueFrom(verification$);
  }
}
