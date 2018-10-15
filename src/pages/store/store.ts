import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { StastPage } from '../stast/stast';
import { StoreProvider } from '../../providers/store/store';
//import { AdMobPro } from '@ionic-native/admob-pro';
/**
 * Generated class for the StorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-store',
  templateUrl: 'store.html',
})
export class StorePage {

  username: string;

  classContainer: string;

  classPlatformXbox: boolean;
  classPlatformPlay: boolean;
  classPlatformPc: boolean;

  textPlaceholder: string;
  BRDailyStorefront:any[] = [];
  BRWeeklyStorefront:any[] = [];

  constructor(
            public navCtrl: NavController, 
            public navParams: NavParams,
            private viewCtrl:ViewController,
            private toastCrtrl:ToastController,
            private _storeProvider:StoreProvider,
            private loaderCrtl:LoadingController,
            /*private admob: AdMobPro*/
            ) {
    this.getItemStore();
    this.classContainer = "container-platform-pc";
    this.classPlatformPc = true;
    this.textPlaceholder = "Ingrese su usuario de Epic";
    var admobid = {
      interstitial: 'ca-app-pub-8609138301620623/8983883160'
    };
    /*this.admob.prepareInterstitial({
      adId: admobid.interstitial,
      isTesting: true,
      autoShow: false
    });
    this.admob.onAdFailLoad().subscribe((res) => {
      alert("error"+JSON.stringify(res));
    })*/
  }

  ionViewDidLoad() {

  }

  getItemStore(event?){
      let loader = this.loaderCrtl.create({
        content:'Cargando...'
      });
      loader.present();
      this._storeProvider.getAll().subscribe((res:any) =>{
        loader.dismiss();
        if(event)
           event.complete();
        this.BRDailyStorefront = res.BRDailyStorefront;
        this.BRWeeklyStorefront = res.BRWeeklyStorefront;
      },err => {
        loader.dismiss();
        if(event)
           event.complete();
        let toast = this.toastCrtrl.create({
          message: 'Ups a ocurrido un error intentelo nuevamente',
          duration: 3000,
          position: 'middle'
        });
        toast.present();
        console.log('getItemStore',err.error.message)
      })
  }

  refresh(event){
    //this.admob.showInterstitial();
    this.getItemStore(event);    
  }

  search(event) {
    console.log(this.username,this.viewCtrl.name)
    if(!this.username){
      let toast = this.toastCrtrl.create({
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

  }

  xbox() {
    this.classContainer = "container-platform-xbox";
    this.classPlatformXbox = true;
    this.classPlatformPlay = false;
    this.classPlatformPc = false;
    this.textPlaceholder = "Ingrese su xbox gamestag";
  }

  playStation() {
    this.classContainer = "container-platform-play";
    this.classPlatformPlay = true;
    this.classPlatformXbox = false;
    this.classPlatformPc = false;
    this.textPlaceholder = "Ingrese su playstation id";
  }

  pc() {
    this.classContainer = "container-platform-pc";
    this.classPlatformPc = true;
    this.classPlatformXbox = false;
    this.classPlatformPlay = false;
    this.textPlaceholder = "Ingrese su usuario de Epic";
  }
}
