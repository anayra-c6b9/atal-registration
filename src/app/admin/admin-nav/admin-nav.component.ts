import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent {
  onLogout = () => {
    this._cookies.deleteAll();
    this._router.navigateByUrl("/login");
  }

  constructor(private _cookies: CookieService, private _router: Router) {}
}
