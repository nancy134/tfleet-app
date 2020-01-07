import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { LocationProvider } from '../../providers/locations';

import { 
    GoogleMaps, 
    GoogleMap,
    GoogleMapOptions,
    Marker,
    LatLng,
    CameraPosition
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
    public locationData: any = {};
    map: GoogleMap;
    constructor(private platform: Platform, public locationProvider: LocationProvider) {}
    async ngOnInit() {
        await this.platform.ready();
        await this.loadMap();
    }
    loadMap(){
        //[37.558315, -122.284456, "White #8", "0 mph"],
        //[37.562619, -122.281302, "Tesla red 9", "54 mph"],
        //[37.562413, -122.269404, "Tesla White 7", "0 mph"],
        //[37.563543, -122.276033, "Tesla Red 6", "33 mph"]
        var that = this;
        let options: GoogleMapOptions = {
            /*
            camera: {
                target : [
                    {lat: 37.558315, lng: -122.284456},
                    {lat: 37.562619, lng: -122.281302},
                    {lat: 37.562413, lng: -122.269404},
                    {lat: 37.563543, lng: -122.276033}
                ]
            }
            */
        };            
        console.log("options: "+JSON.stringify(options));
        Environment.setEnv({
            'API_KEY_FOR_BROWSER_RELEASE': API_KEY_FOR_BROWSER_RELEASE,
            'API_KEY_FOR_BROWSER_DEBUG' : API_KEY_FOR_BROWSER_DEBUG
        });
        this.map = GoogleMaps.create('map_canvas',options);
        let locationPromise = this.locationProvider.getLocations("2773d3c9d12404bdd13c19d122982cf805066286b39d4167af525a54a69dc8a3");
        locationPromise.then(function(results){
            that.locationData = results;
            let jsonData = JSON.parse(that.locationData.data);
            console.log("jsonData: "+JSON.stringify(jsonData));
            
            // Markers
            for (let i=0; i<jsonData.length; i++){
                console.log("id[i]: "+jsonData[i].id+" latitude: "+jsonData[i].latitude+" longitude: "+jsonData[i].longitude);
                if (jsonData[i].latitude !== 0){
                    console.log("adding marker");
                    var speed = "";
                    if (jsonData[i].speed !== null && jsonData[i].speed !== 0) speed = jsonData[i].speed + " mph";
                    let marker: Marker = that.map.addMarkerSync({
                        title: jsonData[i].name,
                        snippet: speed,
                        icon: 'Red',
                        animation: 'DROP',
                        position: {
                            lat: jsonData[i].latitude,
                            lng: jsonData[i].longitude
                        }   
                    });
                }
            }
            
            // Camera Postion
            let locationArray = [];
            for (let i=0; i<jsonData.length; i++){
                let pos = new LatLng(jsonData[i].latitude, jsonData[i].longitude);
                if (jsonData[i].latitude !== 0) locationArray.push(pos);
            }
            let cameraPosition: CameraPosition<LatLng[]> = {
                target: locationArray
            };
            that.map.moveCamera(cameraPosition).then(function(){
            }).catch(function(err){
                console.log("err: "+JSON.stringify(err));
            });
            
        }).catch(function(err){
            console.log("tab error: "+err);
        });
    }
}
