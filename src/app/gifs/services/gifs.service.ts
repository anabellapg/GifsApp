import { Injectable } from '@angular/core';
import { HttpParams,HttpClient} from '@angular/common/http';
import { SearchGifsResponse, Gif} from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
  //esto de provideIn root hace que este servicio funcione a nivel global => no hace falta declararlo en ningún módulo
})
export class GifsService {

  private apiKey:string='6DuQ3A3wJvgLka8OZS8cgFaJnwoosaXv'
  private servicioUrl: string='https://api.giphy.com/v1/gifs/search';

  private _historial:string[]=[];

  public resultados:Gif[]=[];


  get historial(){
    return [...this._historial];
  }

  constructor(private http: HttpClient){

    this._historial=JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados=JSON.parse(localStorage.getItem('resultados')!) || [];

    /*otra solución, más tradicional, es:

    if (localStorage.getItem('historial')){
      this._historial=JSON.parse(localStorage.getItem('historial')!);
    }*/
  }

  buscarGifs(query:string){

    query=query.trim().toLocaleLowerCase();
    
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial=this._historial.splice(0,10);

      localStorage.setItem('historial',JSON.stringify(this._historial));
    }
    //recordemos que unshift agrega al prncipio

    const params= new HttpParams()
    .set('api_key',this.apiKey)
    .set('q',query)
    .set('limit', '10');

   this.http.get<SearchGifsResponse>(`${this.servicioUrl}`, {params})
   .subscribe((resp)=>{
    this.resultados=resp.data;
    localStorage.setItem('resultados',JSON.stringify(this.resultados));
   })
  }
}


/*OTRAS FORMAS DE EXTRAER DATOS DE LA API

Eso del fetch se llama "hacer una petición http"

FORMA 1: FETCH

buscarGifs(query:string){

    query=query.trim().toLocaleLowerCase();
    
    if(!this._historial.includes(query)){el splice, unshift y demás}
   

    fetch('https://api.giphy.com/v1/gifs/search?api_key=6DuQ3A3wJvgLka8OZS8cgFaJnwoosaXv&q=danganronpa&limit=10')
    .then(resp=>{
      resp.json().then(data=>{
      })
    })
  }


FORMA 2: FUNCIÓN ASÍNCRONA

async buscarGifs(query:string){

    query=query.trim().toLocaleLowerCase();
    
    if(!this._historial.includes(query)){el splice, unshift y demás}
   
    const resp= await fetch ('https://api.giphy.com/v1/gifs/search?api_key=6DuQ3A3wJvgLka8OZS8cgFaJnwoosaXv&q=danganronpa&limit=10')
    const data=await resp.jason()
  }

FORMA 3 (LA QUE HEMOS HECHO): OBSERVABLES

Se supone que son mejores porque te permiten tener más control que las otras dos opciones
Al final la hemos cambiado un poco porque no era buena práctica usar el resp:any
Así que hemos creado la interfaz con quickType

Y también hemos metido lo de los params pa que quede más bonico


buscarGifs(query:string){

    query=query.trim().toLocaleLowerCase();
    
    if(!this._historial.includes(query)){return }

   this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=6DuQ3A3wJvgLka8OZS8cgFaJnwoosaXv&q=${query}&limit=10`)
   .subscribe((resp:any)=>{
    this.resultados=resp.data;
   })
  }

*/



