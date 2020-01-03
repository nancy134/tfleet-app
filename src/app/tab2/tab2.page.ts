import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { 
    GoogleMaps, 
    GoogleMap,
    GoogleMapOptions,
    Marker
} from '@ionic-native/google-maps/ngx';
import { 
    environment, 
    API_KEY_FOR_BROWSER_RELEASE, 
    API_KEY_FOR_BROWSER_DEBUG 
} from '../../environments/environment';
import { Environment } from '@ionic-native/google-maps';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
    map: GoogleMap;
    constructor(private platform: Platform) {}
    async ngOnInit() {
        await this.platform.ready();
        await this.loadMap();
    }
    loadMap(){
        //[37.558315, -122.284456, "White #8", "0 mph"],
        //[37.562619, -122.281302, "Tesla red 9", "54 mph"],
        //[37.562413, -122.269404, "Tesla White 7", "0 mph"],
        //[37.563543, -122.276033, "Tesla Red 6", "33 mph"]
        
        let options: GoogleMapOptions = {
            camera: {
                target : [
                    {lat: 37.558315, lng: -122.284456},
                    {lat: 37.562619, lng: -122.281302},
                    {lat: 37.562413, lng: -122.269404},
                    {lat: 37.563543, lng: -122.276033}
                ]
            }
        };            
        Environment.setEnv({
            'API_KEY_FOR_BROWSER_RELEASE': API_KEY_FOR_BROWSER_RELEASE,
            'API_KEY_FOR_BROWSER_DEBUG' : API_KEY_FOR_BROWSER_DEBUG
        });
        this.map = GoogleMaps.create('map_canvas',options);
        
        for (let i=0; i< options.camera.target.length; i++){
            let marker: Marker = this.map.addMarkerSync({
                title: 'Ionic',
                icon: 'blue',
                animation: 'DROP',
                position: {
                    lat: options.camera.target[i].lat,
                    lng: options.camera.target[i].lng
                }
            });
        }
    }
}
