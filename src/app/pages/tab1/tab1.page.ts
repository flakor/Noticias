import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  constructor(public noticiasService: NoticiasService){ }

  noticias: Article[] = [];

  ngOnInit(){
 
    this.cargarNoticias();
   
  }
  loadData(event){
    console.log(event);
    this.cargarNoticias(event);
  }

  cargarNoticias(event?){
    this.noticiasService.getTopHeadLines().subscribe(data => {
      // console.log(data);
      if (data.articles.length === 0) {
        event.target.disable = true;
        // event.target.complete();
        return;
        
      }
     
      this.noticias.push( ... data.articles);
      if (event) {
        event.target.complete();
      }

    } );
  }
}
