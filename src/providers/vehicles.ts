import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable()
export class VehicleProvider {

    constructor(private http: HTTP){}

    getVehicles(access_token) {
        var that=this;
        var bearer = "Bearer " + access_token;
        return new Promise(function(resolve, reject) {
            that.http.get('https://tenant1.tfleet777.com/vehicles',{},{Authorization: bearer}).then(data => {
                console.log("data:"+JSON.stringify(data));
                resolve(data);
	        }).catch(error => {
                reject(error);
	        });
        });
    }
}


