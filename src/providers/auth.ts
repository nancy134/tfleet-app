import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable()
export class AuthProvider {

    constructor(private http: HTTP){}

    login(email, password) {
        var that=this;
        const url = "https://owner-api.teslamotors.com/"
        const data = {
            grant_type: "password",
            client_id: "81527cff06843c8634fdc09e8ac0abefb46ac849f38fe1e431c2ef2106796384",
            client_secret: "c7257eb71a564034f9419ee651c7d0e5f7aa6bfbd18bafb5c5c033b093bb2fa3",
            email: email,
            password: password
        };
        const headers = {
            "Content-type": "application/json"
        };
        return new Promise(function(resolve, reject) {
            that.http.setDataSerializer('json');
            that.http.sendRequest('https://owner-api.teslamotors.com/oauth/token',
            {
                method: 'post',
                data: data,
                headers: headers
            }).then(response => {
                resolve(response);
            }).catch(response => {
                reject(response);
            });            
            
            
            
        });
    }
}


