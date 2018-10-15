import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, LoadingController, ModalController } from 'ionic-angular';
import { StatsProvider } from '../../providers/stats/stats';
import { MatchesPage } from '../matches/matches';

/**
 * Generated class for the StastPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stast',
  templateUrl: 'stast.html',
})
export class StastPage {
  dataStats:any;
  username:string;
  platform:string;

  classContainer:string;

  classPlatformXbox:boolean;
  classPlatformPlay:boolean;
  classPlatformPc:boolean;

  textPlaceholder:string;

  constructor(
    public navCtrl: NavController,
      public navParams: NavParams,
      private _statsProvider:StatsProvider,
      private viewCtrl:ViewController,
      private toastCtrl:ToastController,
      private loaderCtrl:LoadingController,
      private modalCtrl:ModalController
      ) {
        this.username = "";
        this.classContainer = "container-platform-pc";
        this.classPlatformPc = true;
        this.textPlaceholder = "Ingrese su usuario de Epic";
        this.platform = "pc";
  }

  ionViewDidLoad() {
    
  }
  
  search(event) {
    console.log(this.username,this.viewCtrl.name)
    if(!this.username){
      let toast = this.toastCtrl.create({
        message: 'Ingrese un criterio de busqueda',
        duration: 3000,
        position: 'middle'
      });
      toast.present();
    }else{
      if(this.viewCtrl.name != 'StastPage'){
         this.navCtrl.setRoot(StastPage);
      }else{
        this.searchStats();
      }
    }
  }

  searchStats(){
      let loader = this.loaderCtrl.create({content:'Cargando...'});
      loader.present();
      this._statsProvider.getLifeTime(this.platform,this.username).subscribe((res:any) => {
        this.dataStats = res;
        //console.log('res',this.dataStats);
        loader.dismiss();
      },error => { 
        this.dataStats = null;
        loader.dismiss();
        let toast = this.toastCtrl.create({
          message: 'Ups a ocurrido un error intentelo nuevamente',
          duration: 3000,
          position: 'middle'
        });
        toast.present();
       })
  }

  xbox(){
    this.classContainer = "container-platform-xbox";
    this.classPlatformXbox = true;
    this.classPlatformPlay = false;
    this.classPlatformPc = false;
    this.textPlaceholder = "Ingrese su xbox gamestag";
    this.platform = "xbl";
  }

  playStation(){
    this.classContainer = "container-platform-play";
    this.classPlatformPlay = true;
    this.classPlatformXbox = false;
    this.classPlatformPc = false;
    this.textPlaceholder = "Ingrese su playstation id";
    this.platform = "psn";
  }

  pc(){
    this.classContainer = "container-platform-pc";
    this.classPlatformPc = true;
    this.classPlatformXbox = false;
    this.classPlatformPlay = false;
    this.textPlaceholder = "Ingrese su usuario de Epic";
    this.platform = "pc";
  }

  openModal(){
    let modal = this.modalCtrl.create(MatchesPage,{id:this.dataStats.id},{cssClass:"modal-matches"});
    modal.present();
  }
}
