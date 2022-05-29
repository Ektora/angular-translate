import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
    registrationForm: FormGroup;  
 
  constructor(private authService: AuthService, private router : Router) {
    this.registrationForm = new FormGroup({
      felhasznaloNev: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefonSzam: new FormControl('', Validators.required),
      adatVedelmiNyilatkozat: new FormControl()
    });
   }

  ngOnInit(): void {
  }

 
  registration(felhasznaloNev: string, email: string, telefonSzam: string){
      this.authService.registrateIn(felhasznaloNev,email,telefonSzam);
      this.router.navigateByUrl('/translate');
    }

  back(){
    this.router.navigateByUrl('/translate');
  }

  isRegistrated(){
    return this.authService.isRegistrated();
  }

}
