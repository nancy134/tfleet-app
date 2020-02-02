import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthProvider } from '../../providers/auth';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AuthenticationService } from '../services/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    protected errorMessage: string;
    protected disabled = false;
    constructor(
        public router: Router, 
        public authService: AuthenticationService, 
        public  authProvider:  AuthProvider, 
        private nativeStorage: NativeStorage) 
    { 
    }

    ngOnInit() {
    }
    
    login(form){
        var that = this;
        this.errorMessage = "";
        this.disabled = true;
        this.authService.login(form.value.email, form.value.password).then(function(results){
            that.disabled = false;
            form.reset();
        }).catch(function(err){
            that.disabled = false;
            that.errorMessage = "Invalid email or password";
        });;
    }
}
