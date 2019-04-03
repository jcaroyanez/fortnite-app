import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free'; 
/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1: string =  'StorePage';
  tab2: string = 'StastPage';
  tab3: string = 'ChallengesPage';
  tab4: string = 'CategoryPage';

  constructor(public navCtrl: NavController, public navParams: NavParams,private admobFree:AdMobFree) {
      
  }

  ionViewDidLoad() {
    this.pushAdmob();
  }

  pushAdmob(){
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

}
