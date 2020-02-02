import { Component } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
    protected versionNumber: string;
    protected appName: string;
    protected email: any;
    
    constructor(private appVersion: AppVersion, private authenticationService: AuthenticationService) {}
    async ngOnInit() {
        var that = this;
        this.appVersion.getVersionNumber().then((versionNumber) => {
            this.versionNumber = versionNumber;
        },
        (error) => {
            console.log(error);
        });
        this.appVersion.getAppName().then((appName) => {
            this.appName = appName;
        },
        (error) => {
            console.log(error);
        });
        let emailPromise = this.authenticationService.getEmail();
        emailPromise.then(function(email){
            that.email = email;
        }).catch(function(err){
            console.log(err);
        });

    }
    logout(){
        this.authenticationService.logout();
    }

}
