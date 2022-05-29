import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  felhasznalo : string = "Vendég";
  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.authService.registratedUser.subscribe(user => {
      if(user){
        this.felhasznalo = user.felhasznaloNev
      }
      else{
        this.felhasznalo = "Vendég";
      }
    });
  }

}
