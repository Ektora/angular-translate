import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  baseURL : string = "https://libretranslate.de";
  forditasSzama : number = 0;
  constructor(private http:HttpClient, private router : Router) {
    if(localStorage.getItem("translatedNumber")){
    this.forditasSzama = Number(localStorage.getItem("translatedNumber"));
    }
    else{
      localStorage.setItem("translatedNumber", "0");
    }
   }

   isRegistrated(){
    if(localStorage.getItem("registratedInUser")){
      return true;
    }
     return false;
  }

   orszagDetektalas(formData: FormData){
    return this.http.post<{confidence: number, language: string}[]>(`${this.baseURL}/detect`, formData);
   }
   orszagLista(){
     return this.http.get<any[]>(`${this.baseURL}/languages`);
   }

   translate(formData: FormData){
    this.forditasSzama++;
    if(this.forditasSzama > 3 && !this.isRegistrated()){
      this.router.navigateByUrl('/registration');
    }
    localStorage.setItem("translatedNumber", JSON.stringify(this.forditasSzama));
    return this.http.post<{translatedText: string}>(`${this.baseURL}/translate`, formData)}

    translatedNumber(){
      return this.forditasSzama = Number(localStorage.getItem("translatedNumber"));
    }
}



  
