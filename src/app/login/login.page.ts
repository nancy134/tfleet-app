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
    public loginData: any = {};
    constructor(public router: Router, public authService: AuthenticationService, public  authProvider:  AuthProvider, private nativeStorage: NativeStorage) { }

    ngOnInit() {
    }
    
    login(form){
        this.authService.login(form.value.email, form.value.password);
            /*
            this.nativeStorage.setItem('user', {
                access_token: "46acc24c94f70592be89c03ebae2173e1a021f93b38f43209cf4109e5f9f826b", 
                refresh_token: "57521c5faa3845df9d04596ac44383e17d5a9d8c03e58a408a8b543d6c05b7cb",
                expires_in: "3888000",
                created_at: "1579954379"})
            .then(
                () => {
                    console.log('Stored item!');
                    this.router.navigateByUrl('/tabs');
                },
              error => console.error('Error storing item', error));
              */
              
        /*
        var that = this;
        let loginPromise = this.authProvider.login(form.value.email, form.value.password);
        loginPromise.then(function(results){
            console.log("results: "+JSON.stringify(results));
            that.loginData = results;
            let jsonData = JSON.parse(that.loginData.data);
            console.log("jsonData.access_token: "+jsonData.access_token);
            console.log("jsonData.refresh_token: "+jsonData.refresh_token);
            console.log("jsonData.expires_in: "+jsonData.expires_in);
            console.log("jsonData.created_at: "+jsonData.created_at);
            
            that.nativeStorage.setItem('user', {
                access_token: jsonData.access_token, 
                refresh_token: jsonData.refresh_token,
                expires_in: jsonData.expires_in,
                created_at: jsonData.created_at})
            .then(
                () => console.log('Stored item!'),
              error => console.error('Error storing item', error));

            //this.router.navigateByUrl('/tabs');
        }).catch(function(err){
            console.log("err: "+JSON.stringify(err));
        });
        */
    }
}
