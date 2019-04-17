import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadLines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor( private http: HttpClient) { }

  headlinesPage = 0;
  categoriaActual = '';
  categoriaPage = 0;

  private ejecutarQuery<T>( query: string){

    query = apiUrl + query;

    return this.http.get<T>( query, { headers } );

  }

  getTopHeadLines() {

    this.headlinesPage++;

   return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&page=${this.headlinesPage}`);
    // tslint:disable-next-line: max-line-length
    //  return this.http.get<RespuestaTopHeadLines>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=5a536dc473834a6bbdb5b6e75e47ef6c`);
  }

  getTopHeadLinesCategoria( categoria: string) {

      if ( this.categoriaActual === categoria){
        this.categoriaPage++;
      } else {
        this.categoriaPage = 1;
        this.categoriaActual = categoria;
      }
    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&category=${ categoria}&page=${this.categoriaPage}`);
    // tslint:disable-next-line: max-line-length
    // return this.http.get<RespuestaTopHeadLines>(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=5a536dc473834a6bbdb5b6e75e47ef6c`);
   }
}
