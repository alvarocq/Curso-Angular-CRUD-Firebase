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
  HeroeUrl:string = "https://curso-angular-crudfirebaseapp.firebaseio.com/heroes/"

  constructor( private http:HttpClient) { }

  // Función POST (añadir nuevo héroe)
  nuevoHeroe( heroe:Heroe ){
    // Stringify transforma un json en un string
    let body = JSON.stringify( heroe );
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });

    // Observable para saber si se insertó o no y petición post
    return this.http.post( this.HeroesUrl, body, { headers } )
      .pipe(
          map( res =>{
          console.log(res);
          return res;
        })
      )

  }
// Función PUT (editar héroe ya creado)
  actualizarHeroe( heroe:Heroe, key$:string ){
    // Stringify transforma un json en un string
    let body = JSON.stringify( heroe );
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });

    // Observable para saber si se insertó o no y petición put
    let url = `${ this.HeroeUrl}/${ key$ }.json`;

    return this.http.put( url, body, { headers } )
      .pipe(
          map( res =>{
          console.log(res);
          return res;
        })
      )
      // ./fin pipe

    }
    // ./fin actualizarHeroe

  //Función GET un héroe en concreto
  getHeroe( key$:string ){
    let url = `${ this.HeroeUrl}/${ key$ }.json`;
    return this.http.get( url )
    .pipe(
        map( res =>{
        console.log(res);
        //El <Heroe> indica que queremos que la respuesta sea de tipo heroe
        return <Heroe>(res);
      })
    )
    // ./fin pipe

  }

  //Función GET todos los héroes en concreto
  getHeroes(){

    return this.http.get( this.HeroesUrl )
    .pipe(
        map( res =>{
        console.log(res);
        //El <Heroe> indica que queremos que la respuesta sea de tipo heroe
        return res;
      })
    )
    // ./fin pipe

  }




}
// ./fin export class HeroesService
