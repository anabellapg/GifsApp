import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  constructor(private GifsService:GifsService){ }

  //La exclamación se llama notNullAssertionOperator
  //básicamente es decirle a angular: confía en mí que esta variable
  //no va a ser nula, quita el error

  //a la derecha del paréntesis, sólo decimos que la variable encontrada se llama
  //txtBuscar y es de tipo ElementRef

  //El viewChild se va al html a buscar una referencia local llamada txtBuscar

  buscar(termino:string){
    const valor=this.txtBuscar.nativeElement.value;

    if (valor.trim().length===0){ return;}

    this.GifsService.buscarGifs(valor);

    //hemos sabido qué poner después del txtBuscar por autocompletado de Angular
    //también podemos ayudarnos con la consola

    this.txtBuscar.nativeElement.value='';
  }
}

//otra forma de vaciar el input una vez se ha pulsado enter sería por medio de javascript puro
//haciendo algo así como document.querySelector('input')='' dentro de la función buscar()


//creo que esto se podría haber hecho con el NGmodule de forma más fácil la verdad