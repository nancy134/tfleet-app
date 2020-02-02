import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { AuthProvider } from '../../providers/auth';
 
const TOKEN_KEY = 'auth-token';
const EMAIL_KEY = 'email';
 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    public loginData: any = {};
 
    authenticationState = new BehaviorSubject(null);
    token = new BehaviorSubject(null);
    email = new BehaviorSubject(null);
    
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
                reject(err);
            });
        });
    }
    getEmail() {
        var that = this;
        return new Promise(function(resolve, reject) {
            that.storage.get(EMAIL_KEY).then(res => {
                resolve(res);
            }).catch(err => {
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
        this.storage.get(EMAIL_KEY).then(res => {
            if (res) {
                this.email.next(res);
            }
        })
    }
 
    login(email, password) {
        var that = this;
        return new Promise(function(resolve, reject) {
        let loginPromise = that.authProvider.login(email, password);
        loginPromise.then(function(results){
            that.loginData = results;
            let jsonData = JSON.parse(that.loginData.data);
            
            that.storage.set(TOKEN_KEY, jsonData.access_token).then(() => {
                that.authenticationState.next(true);
                that.token.next(jsonData.access_token);
                that.storage.set(EMAIL_KEY, email).then(() => {
                    that.email.next(email);
                    resolve(jsonData);
                });         
            });            
                        
        }).catch(function(err){
            reject(err);
        });
        });
    } 
 
    logout() {
        return this.storage.remove(TOKEN_KEY).then(() => {
            this.authenticationState.next(false);
            this.token.next(null);
            this.email.next(null);
        });
    }
 
    isAuthenticated() {
        return this.authenticationState.value;
    }
 
}
