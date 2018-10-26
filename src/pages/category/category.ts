import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController,ToastController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { SubCategoryPage } from '../sub-category/sub-category';
import { AdMobFree, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free'; 
import { TweetsPage } from '../tweets/tweets';
/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  listCategory:any[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public _db:DatabaseProvider,
    private loaderCtrl:LoadingController,
    private modalCtrl:ModalController,
    private toastCtrl:ToastController,
    private admobFree:AdMobFree
    ) {
      this.getAllCategory();
  }

  ionViewDidLoad() {
    
  }

  pushAdmob(){
    const bannerConfig: AdMobFreeInterstitialConfig = {
      id: 'ca-app-pub-8609138301620623/8983883160',
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

  getAllCategory(event?){
    let loader = this.loaderCtrl.create({content:'Cargando...'});
    loader.present();
    let consulta = this._db.colWithIds$(`category`).subscribe((res:any[]) => {
      consulta.unsubscribe();
      loader.dismiss();
      if(event)
      event.complete();
      this.listCategory = res;
    },err => {
      if(event)
      event.complete(); 
      loader.dismiss();
      let toast = this.toastCtrl.create({
        message: 'Ups a ocurrido un error intentelo nuevamente',
        duration: 3000,
        position: 'middle'
      });
      toast.present();
     });
  }

  refresh(event){
    this.pushAdmob();
    this.getAllCategory(event);
  }

  openSubCategory(id){
    this.pushAdmob();
    let modal = this.modalCtrl.create(SubCategoryPage,{id});
    modal.present();
  }

  openTwitter(){
    this.pushAdmob();
    this.navCtrl.push(TweetsPage);
  }

}
