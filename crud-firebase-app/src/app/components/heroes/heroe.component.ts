import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { Heroe } from "../../interfaces/heroe.interface";
import {HeroesService} from "../../services/heroes.service";

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

    heroe:Heroe = {
    nombre:"",
    bio:"",
    casa:"Marvel",

  }

  nuevo:boolean = false;
  id:string;

  constructor(private _heroesService:HeroesService,
              private router:Router,
              private route:ActivatedRoute){
      this.route.params
        .subscribe( parametros =>{
              console.log(parametros);
              this.id = parametros['id'];
              if(this.id !== "nuevo"){
                this._heroesService.getHeroe( this.id )
                    .subscribe( respuesta => this.heroe = respuesta)
              }
              } )
  }

  ngOnInit() {
  }

  guardar(){
    console.log(this.heroe);

    if( this.id == "nuevo"){
      //Insertar nuevo héroe (método post)
      this._heroesService.nuevoHeroe( this.heroe )
          .subscribe ( data =>{
                var id_heroe:any=data;
                id_heroe = id_heroe.name;
                console.log(id_heroe);
                this.router.navigate(['/heroe',id_heroe])
          },
          error=> console.error(error));
          console.log("Creado héroe en firebase");
    }else{
     //Actualizando nuevo héroe (método put)
     this._heroesService.actualizarHeroe( this.heroe, this.id )
         .subscribe ( data =>{

               console.log("el id es: " + this.id);
               this.router.navigate(['/heroe',this.id])
         },
         error=> console.error(error));
         console.log("Actualizado héroe en firebase");
         console.log("la id es: " + this.id );

    }




  }
// /.fin guardar

  agregarNuevo( forma:NgForm){
    this.router.navigate(['/heroe', 'nuevo']);

    forma.reset({
      casa:"Marvel"
    });

  }

}
// /.fin export Class HeroeComponent
