import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaTopHeadLines } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor( private http: HttpClient) { }

  getTopHeadLines() {
   return this.http.get<RespuestaTopHeadLines>(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=5a536dc473834a6bbdb5b6e75e47ef6c`);
  }
}
