import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { StatsProvider } from '../../providers/stats/stats';

/**
 * Generated class for the MatchesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-matches',
  templateUrl: 'matches.html',
})
export class MatchesPage {

  uid:string;
  listMatches:any[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private viewCtrl:ViewController,
    private _statsProvider:StatsProvider,
    private loadingCtrl:LoadingController,
    private toastCtrl:ToastController
    ) {
      this.uid = this.navParams.get('id');
      this.getAll();
  }

  ionViewDidLoad() {
    
  }

  getAll(event?){
    let loader = this.loadingCtrl.create({content:'Cargando...'});
    loader.present();
      this._statsProvider.getMatches(this.uid).subscribe((res:any) => {
          this.listMatches = null;
          this.listMatches = res.data;
          loader.dismiss();
          if(event)
            event.complete();
      },err => {
           loader.dismiss();
           let toast = this.toastCtrl.create({
            message: 'Ups a ocurrido un error intentelo nuevamente',
            duration: 3000,
            position: 'middle'
          });
          toast.present();
          if(event)
            event.complete();          
      })
  }

  close(){
    this.viewCtrl.dismiss();
  }

  refresh(event){
    this.getAll(event);
  }

}
