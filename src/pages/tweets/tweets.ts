import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,Toast, ToastController } from 'ionic-angular';
import { TweetsProvider } from '../../providers/tweets/tweets';
import { AdMobFree, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free'; 
/**
 * Generated class for the TweetsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tweets',
  templateUrl: 'tweets.html',
})
export class TweetsPage {
  listTweets:any[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _tweetsProvider:TweetsProvider,
    private loadingCtrl:LoadingController,
    private toastCtrl:ToastController,
    private admobFree:AdMobFree
    ) {
      this.getAllTweets();
  }

  ionViewDidLoad() {
    
  }

  urlify(text) {
    var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(urlRegex, function (url) {
      return "<a href=\"" + url + "\">" + url + "</a>";
    })
  }

  getAllTweets(event?){
    let loader = this.loadingCtrl.create({content:'Cargando...'});
    loader.present();
      this._tweetsProvider.getAlltweets().subscribe((list:any) => {
        loader.dismiss();
        //console.log('tweets',list);
        if(event)
        event.complete();
        this.listTweets = list.tweets;
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

  

  refresh(event){
    this.pushAdmob();
    this.getAllTweets(event);
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

}
