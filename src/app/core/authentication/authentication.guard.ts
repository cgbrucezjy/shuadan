import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';


@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    return true
  }

}
