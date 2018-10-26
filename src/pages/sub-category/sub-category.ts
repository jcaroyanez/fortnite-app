import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController,ToastController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { async } from '@firebase/util';

/**
 * Generated class for the SubCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sub-category',
  templateUrl: 'sub-category.html',
})
export class SubCategoryPage {
  id;
  listSubCategori:any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl:ViewController,
    private _db:DatabaseProvider,
    private loaderCtrl:LoadingController,
    private toastCtrl:ToastController
    ) {
    this.id = navParams.get('id');
    this.getAllSubCategory();  
  }

  ionViewDidLoad() { 
  }

  close(){
    this.viewCtrl.dismiss();
  }

  getAllSubCategory(){
    let loader = this.loaderCtrl.create({content:'Cargando...'});
    loader.present();
    let consulta = this._db.colWithIds$(`category/${this.id}/subcategory`,ref => ref.orderBy('createdAt')).subscribe(async(res:any[]) => {
      this.listSubCategori = [];
      for(let i = 0;i < res.length;i++){
        let consultaAux = await this._db.colWithIds$(`category/${this.id}/subcategory/${res[i].id}/items`).subscribe((items:any[]) =>{
          consultaAux.unsubscribe();
          this.listSubCategori.push({title:res[i].data.name,items})
        },err => { 
          loader.dismiss();
          let toast = this.toastCtrl.create({
            message: 'Ups a ocurrido un error intentelo nuevamente',
            duration: 3000,
            position: 'middle'
          });
          toast.present(); 
        })
      }
      loader.dismiss();
      //console.log(this.listSubCategori);
    },err => { 
      let toast = this.toastCtrl.create({
        message: 'Ups a ocurrido un error intentelo nuevamente',
        duration: 3000,
        position: 'middle'
      });
      toast.present();
      loader.dismiss()
     })
  }

}
