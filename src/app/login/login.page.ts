import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthProvider } from '../../providers/auth';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    public loginData: any = {};
    constructor(public router: Router, public  authProvider:  AuthProvider, private nativeStorage: NativeStorage) { }

    ngOnInit() {
    }
    
    login(form){
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
    }
}
