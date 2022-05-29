import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _currentUser = new BehaviorSubject<User | undefined>(undefined);
  constructor(private router : Router) { 
      const user = localStorage.getItem("registratedInUser");

      if(user){
        this._currentUser.next(JSON.parse(user));
        this.router.navigateByUrl('/translate');
      }
    }

  registrateIn(felhasznaloNev: string, email: string, telefonSzam: string){
    let segedUser : User = new User(felhasznaloNev,email,telefonSzam);
    this.storeUserAfterRegistrate(segedUser);
    this._currentUser.next(segedUser);
  }

  isRegistrated(){
    return this._currentUser.getValue() !== undefined;
  }

  get registratedUser(){
    return this._currentUser.asObservable();
  }

  private storeUserAfterRegistrate(user : User){
    localStorage.setItem("registratedInUser",JSON.stringify(user));
  }

  get translatedNumber(){
    return 0;
  }
}
