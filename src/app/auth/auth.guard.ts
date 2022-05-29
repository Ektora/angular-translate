import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TranslateService } from '../translate/translate.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router : Router, private translateService : TranslateService){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.isRegistrated() || this.translateService.translatedNumber() <= 3){
      return true;
    }
    else if(this.translateService.translatedNumber() > 3){
      this.router.navigateByUrl('registration');
      return false;
    }
    else{
      this.router.navigateByUrl('registration');
      return false;
    }
  }
  
}
