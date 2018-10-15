import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ChallengerProvider } from '../../providers/challenger/challenger';
/**
 * Generated class for the ChallengesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-challenges',
  templateUrl: 'challenges.html',
})
export class ChallengesPage {

  username:string;

  classContainer:string;

  classPlatformXbox:boolean;
  classPlatformPlay:boolean;
  classPlatformPc:boolean;

  textPlaceholder:string;
  lisChallenger:any[] = [];

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private _challengerProvider:ChallengerProvider,
      private loaderCtrl:LoadingController,
      private toastCrtrl:ToastController
      ) {
        this.classContainer = "container-platform-pc";
        this.classPlatformPc = true;
        this.textPlaceholder = "Ingrese su usuario de Epic";
        this.getAllChallenger();
  }

  ionViewDidLoad() {
    
  }

  getAllChallenger(){
    let loader = this.loaderCtrl.create({content:'Cargando...'});
    loader.present();

    this._challengerProvider.getAll().subscribe((res:any) => {
      loader.dismiss();
      this.lisChallenger = res.challenger;
    },err => { 
      loader.dismiss();
      let toast = this.toastCrtrl.create({
        message: 'Ingrese un criterio de busqueda',
        duration: 3000,
        position: 'middle'
      });
      toast.present();
     })
  }
  
  search(event){
    console.log(this.username)
  }

  xbox(){
    this.classContainer = "container-platform-xbox";
    this.classPlatformXbox = true;
    this.classPlatformPlay = false;
    this.classPlatformPc = false;
    this.textPlaceholder = "Ingrese su xbox gamestag";
  }

  playStation(){
    this.classContainer = "container-platform-play";
    this.classPlatformPlay = true;
    this.classPlatformXbox = false;
    this.classPlatformPc = false;
    this.textPlaceholder = "Ingrese su playstation id";
  }

  pc(){
    this.classContainer = "container-platform-pc";
    this.classPlatformPc = true;
    this.classPlatformXbox = false;
    this.classPlatformPlay = false;
    this.textPlaceholder = "Ingrese su usuario de Epic";
  }

}
