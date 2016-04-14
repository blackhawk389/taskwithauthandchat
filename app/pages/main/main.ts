import {Page, NavController, NavParams, Platform, Alert} from 'ionic-angular';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {FORM_DIRECTIVES, FormBuilder, Validators, Control, ControlGroup,AbstractControl} from 'angular2/common';
import {Observable} from 'rxjs/Observable';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';
import { ChatPage } from '../chat/chat';
import { HomePage } from '../home/home';



@Page({
  templateUrl: 'build/pages/main/main.html'
})
export class MainPage {
    
    
    posts : FirebaseListObservable<any[]>;
    comments : {};
    comment : AbstractControl;
    form : ControlGroup;
    istrue = false;
    arr : FirebaseListObservable<any[]>;
    showcomment : boolean = false;
    
    constructor(public nav : NavController, public af : AngularFire, fb : FormBuilder){
        
        this.posts = af.list('/postsfirebase');
        this.comments = {}
        
        this.nav = nav;
        
        this.form = fb.group(
            {
                'comment': ['', Validators.required]
            }
        );
        this.comment = this.form.controls['comment']
        
    }
    

    addpost(){
        
        let prompt = Alert.create({
        title: 'Add Post',
        message: "",
        inputs: [
        {
          name: 'title',
          placeholder: 'Whats on your mind'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
              //console.log(data);
              
              this.posts.add(data);
              
            //   this.http.get("https://taskionic.firebaseio.com/firebaseList.json").map((res) => res.json()).subscribe((res) => {
            //    //console.log(res.json());
            //    this.post.push(res);
            //    console.log(this.post.length)
            //    console.log(this.post)
              
               
               
               //this.post = res.json().stringi;
            
            
            //this.post = res.json();
        // }, (err) => {
        //     console.log(err)
        // })         
        }
        }  
      ]
        });
        
        this.nav.present(prompt)
       
    }
  
    
    addcomment(key, com){
        
        
        console.log("from add comment " + key.$key + "  " + com)
        this.arr = this.af.list('/comments/' + key.$key);
        this.arr.add(com);
        this.showcomment = true;
        this.comments[key.$key] = this.af.list('/comments/' + key.$key);
    }
    
    startchat(){
        this.nav.push(ChatPage);
    }
    
    logoutUser(){
        //var ref = new Firebase("https://fierbaseauth.firebaseio.com");
        this.nav.push(HomePage)    
    }           

}