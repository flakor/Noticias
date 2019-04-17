import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor(private storage: Storage, public toastController: ToastController) {

    this.cargarFavorito();
   }

  guardarNoticia(noticia: Article){

    const existe = this.noticias.find(noti => noti.title === noticia.title)
    if (!existe) {
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
      this.presentToast('Guardado en Favoritos');
    }
   
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
  async cargarFavorito(){
    const favoritos = await this.storage.get('favoritos');
    
    if (favoritos) {
      this.noticias = favoritos;
    }
  }

  borrarNoticia(noticia: Article){
    this.noticias = this.noticias.filter(noti => noti.title !== noticia.title);
    this.storage.set('favoritos', this.noticias);
    this.presentToast('Eliminado de Favoritos')
    
  }

}
