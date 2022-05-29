import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '../translate.service';
import { finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.scss']
})
export class TranslateComponent implements OnInit {
  translateForm : FormGroup;
  induloorszagLista : any[] = [];
  celorszagLista : any[] = [];
  eredmeny : string = "";
  isLoading : boolean = false;
  constructor(private translateService : TranslateService, private snackBar : MatSnackBar) {
    this.translateForm = new FormGroup({
      forditandoSzoveg : new FormControl('', Validators.required),
      induloNyelv: new FormControl('', Validators.required),
      celNyelv : new FormControl('', Validators.required)
      
    });
    this.induloorszagLista.push({"name":"Automata nyelv felismerés", "code" : "auto"});
    this.orszagokLista();
   }

  ngOnInit(): void {
  }

  orszagokLista(){
    this.translateService.orszagLista().subscribe(
      orszagok => 
      {
        orszagok.forEach(orszag => {
          this.induloorszagLista.push(orszag);
        });
        this.celorszagLista = orszagok;
      }
    );
  }

  translate(forditandoSzoveg:string,induloNyelv:string, celNyelv:string){
    this.isLoading=true;
    let formData = new FormData();
    formData.append("q",forditandoSzoveg);
    formData.append("source",induloNyelv);
    formData.append("target",celNyelv);
    formData.append("format","text");
    this.translateService.translate(formData)
    .pipe(finalize(()=>this.isLoading=false))
    .subscribe(
      response => {this.eredmeny = response.translatedText},
      () => {this.snackBar.open('Hiba történt a betöltés közben', 'OK', {duration:5000})}
    )
  }

  translateAuto(forditandoSzoveg:string, celNyelv:string){
    this.isLoading = true;
    let formData = new FormData();
    let induloNyelv = "";
    formData.append("q",forditandoSzoveg);

    this.translateService.orszagDetektalas(formData)
    .pipe(finalize(()=>this.isLoading=false))
    .subscribe(
      response => {
        induloNyelv = response[0].language;
        this.translate(forditandoSzoveg,induloNyelv,celNyelv);
      },
      ()=>{this.snackBar.open('Hiba történt a betöltés közben','OK', {duration:5000})}
    );
    
  }

}
