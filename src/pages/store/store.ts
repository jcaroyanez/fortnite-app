import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { StastPage } from '../stast/stast';
import { StoreProvider } from '../../providers/store/store';
import { AdMobFree, AdMobFreeInterstitialConfig,AdMobFreeBannerConfig } from '@ionic-native/admob-free';
 
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
            private admobFree:AdMobFree
            ) {
    this.pushAdmobBanner();                    
    this.getItemStore();
    this.classContainer = "container-platform-pc";
    this.classPlatformPc = true;
    this.textPlaceholder = "Ingrese su usuario de Epic";
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
    this.pushAdmob();
    this.getItemStore(event);    
  }

  pushAdmob(){
    const bannerConfig: AdMobFreeInterstitialConfig = {
      id: 'ca-app-pub-8609138301620623/9709256959',
      isTesting: false,
      autoShow: true,
     };
     this.admobFree.interstitial.config(bannerConfig);
     this.admobFree.interstitial.prepare()
       .then(() => {
        this.admobFree.interstitial.show();
       })
       .catch(e => console.log(e));
  }

  pushAdmobBanner(){
    const bannerConfig: AdMobFreeBannerConfig = {
      id: 'ca-app-pub-8609138301620623/2213910318',
      isTesting: false,
      autoShow: true,
     };
     this.admobFree.banner.config(bannerConfig);
     
     this.admobFree.banner.prepare()
       .then(() => {
        this.admobFree.banner.show();
       })
       .catch(e => { JSON.stringify(e) });
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
