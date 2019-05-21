import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from "@angular/router";
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

  constructor(private _heroesService:HeroesService,
              private router:Router){ }

  ngOnInit() {
  }

  guardar(){
    console.log(this.heroe);

    this._heroesService.nuevoHeroe( this.heroe )
        .subscribe ( data =>{
              var id_heroe:any=data;
              id_heroe = id_heroe.name;
              console.log(id_heroe);
              this.router.navigate(['/heroe',id_heroe])
        },
        error=> console.error(error));
  }


}
