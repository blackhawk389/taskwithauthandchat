import {App, Platform} from 'ionic-angular';
import {HomePage} from './pages/home/home';
import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire, firebaseAuthConfig, AuthMethods
    , AuthProviders} from 'angularfire2';


@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers : [FIREBASE_PROVIDERS, defaultFirebase('https://fierbaseauth.firebaseio.com/'),
   firebaseAuthConfig({
    
    method : AuthMethods.Popup,
    provider : AuthProviders.Password
      
  })
  ],
 
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      // Keyboard.setAccessoryBarVisible(false);
      //
      // For example, we might change the StatusBar color. This one below is
      // good for dark backgrounds and light text:
      // StatusBar.setStyle(StatusBar.LIGHT_CONTENT)
    });
  }
}
