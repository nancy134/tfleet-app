import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { AuthProvider } from '../../providers/auth';
 
const TOKEN_KEY = 'auth-token';
 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    public loginData: any = {};
 
    authenticationState = new BehaviorSubject(null);
    token = new BehaviorSubject(null);
    
    constructor(private storage: Storage, private plt: Platform, private authProvider: AuthProvider) { 
        this.plt.ready().then(() => {
            this.checkToken();
        });
    }
    getToken() {
        console.log("AuthenticationService: getToken");
        var that = this;
        return new Promise(function(resolve, reject) {
            that.storage.get(TOKEN_KEY).then(res => {
                resolve(res);
            }).catch(err => {
                console.log("err: "+err);
                reject(err);
            });
        });
    }
    checkToken() {
        console.log("AuthenticationService: checkToken");
        this.storage.get(TOKEN_KEY).then(res => {
            if (res) {
                this.authenticationState.next(true);
                this.token.next(res);
            }
        })
    }
 
    login(email, password) {
        var that = this;
        let loginPromise = this.authProvider.login(email, password);
        loginPromise.then(function(results){
            that.loginData = results;
            let jsonData = JSON.parse(that.loginData.data);
            console.log("jsonData.access_token: "+jsonData.access_token);
            
            that.storage.set(TOKEN_KEY, jsonData.access_token).then(() => {
                that.authenticationState.next(true);
                that.token.next(jsonData.access_token);
            });            
        }).catch(function(err){
            console.log("err: "+JSON.stringify(err));
        });
    } 
 
    logout() {
        return this.storage.remove(TOKEN_KEY).then(() => {
            this.authenticationState.next(false);
            this.token.next(null);
        });
    }
 
    isAuthenticated() {
        return this.authenticationState.value;
    }
 
}
