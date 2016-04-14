import {Page, NavController, NavParams, Platform, Alert} from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {FORM_DIRECTIVES, FormBuilder, Validators, Control, ControlGroup,AbstractControl} from 'angular2/common';
import {Observable} from 'rxjs/Observable';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';
import { MainPage  } from '../main/main';

//if its not define import it


@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
    
    form : ControlGroup;
    username : AbstractControl;
    password : AbstractControl;
    user : AbstractControl;
    pass : AbstractControl;
    istrue : boolean = false;
    istrueReg : boolean = false;
    form2 : ControlGroup;
    
    
    constructor(public nav : NavController, public af : AngularFire, fb : FormBuilder){
        
        this.nav = nav; 
        
        this.form = fb.group(
            {
                'username': ['', Validators.required],
                'password': ['', Validators.required]
            }
        );
        this.username = this.form.controls['username']
        this.password = this.form.controls['password']
        
        
        this.form2 = fb.group(
            {
                'user': ['', Validators.required],
                'pass': ['', Validators.required]
            }
        );
        this.user = this.form2.controls['user']
        this.pass = this.form2.controls['pass']
    
}
    
    
    
     registerUser(credentials){
         
         console.log(credentials)
         
         var ref = new Firebase("https://fierbaseauth.firebaseio.com");
          ref.createUser({
          email    : credentials.username,
          password : credentials.password
          }, function(error, userData) {
          if (error) {
    console.log("Error creating user:", error);
  } else {
    console.log("Successfully created user account with uid:", userData.uid);
  }
})
         
     }   
               
     loginUser(credentials){
                  
             var ref = new Firebase("https://fierbaseauth.firebaseio.com");
           ref.authWithPassword({
            email    : credentials.user,
            password : credentials.pass
             }, function(error, authData) {
            if (error) {
                 console.log("Login Failed!", error);
            } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    });
    
        var authData = ref.getAuth();
          if (authData) {
         console.log("User " + authData.uid + " is logged in with " + authData.provider);
            this.nav.push(MainPage)
           } else {
         console.log("User is logged out");
         }
         
         console.log(authData)
     }
     
     enable(){                  
        //toggle state
        this.istrue = this.istrue ? false : true;
     }
     
     enableRegister(){
         this.istrueReg = this.istrueReg ? false : true;
     }

}