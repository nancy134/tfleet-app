import { Component } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
    protected versionNumber: string;
    protected appName: string;
    constructor(private appVersion: AppVersion) {}
    async ngOnInit() {
        this.appVersion.getVersionNumber().then((versionNumber) => {
            console.log("versionNumber: "+versionNumber);
            this.versionNumber = versionNumber;
        },
        (error) => {
            console.log(error);
        });
        this.appVersion.getAppName().then((appName) => {
            console.log("appName: "+appName);
            this.appName = appName;
        },
        (error) => {
            console.log(error);
        });
    }

}
