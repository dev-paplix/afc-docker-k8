
import { Injectable } from "@angular/core";

import { CanActivate, Router, ActivatedRouteSnapshot, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";

@Injectable({
  providedIn:'root'
})


export class RoleGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const expectedRole = route.data['role'];
    const userRole = localStorage.getItem('role');
    const token  = localStorage.getItem('access_token');

    if (token && userRole == expectedRole){
      return true;
    } else{
      this.router.navigate(['/']);
      return false;
    }

  }

}
