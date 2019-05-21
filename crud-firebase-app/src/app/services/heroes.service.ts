import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Heroe  } from '../interfaces/heroe.interface';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  HeroesUrl:string = "https://curso-angular-crudfirebaseapp.firebaseio.com/heroes.json"

  constructor( private http:HttpClient) { }

  nuevoHeroe( heroe:Heroe ){
    // Stringify transforma un json en un string
    let body = JSON.stringify( heroe );
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });

    // Observable para saber si se insertó o no
    return this.http.post( this.HeroesUrl, body, { headers } )
      .pipe(
          map( res =>{
          console.log(res);
          return res;
        })
      )

  }

}
