import {Page, NavController, NavParams, Platform, Alert} from 'ionic-angular';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {FORM_DIRECTIVES, FormBuilder, Validators, Control, ControlGroup,AbstractControl} from 'angular2/common';
import {Observable} from 'rxjs/Observable';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';
import { HomePage } from '../home/home';




@Page({
  templateUrl: 'build/pages/chat/chat.html'
})
export class ChatPage {
    
    message : AbstractControl;
    form : ControlGroup;
    messageArray : FirebaseListObservable<any[]>;
    
    
    constructor(public nav : NavController, public af : AngularFire, fb : FormBuilder){
        
        this.messageArray = this.af.list('/messages');
        
        
        this.form = fb.group({
            'message' : ['', Validators.required]
        });
        
        this.message = this.form.controls['message']
    }
    
    sendMessage(message){
        
        this.messageArray.add(message);  
    }
    
    logoutUser(){
        var ref = new Firebase("https://fierbaseauth.firebaseio.com/messages");
          ref.remove();
          this.nav.push(HomePage)
        
    }
    
}
    