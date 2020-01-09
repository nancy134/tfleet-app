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
    public disabled = false;
    
    constructor(private platform: Platform, public locationProvider: LocationProvider) {}
    async ngOnInit() {
        await this.platform.ready();
        await this.initializeMap();
    }
    update(){
        this.populateMap();
    }
    initializeMap(){
        let options: GoogleMapOptions = {
            camera: {
                target : [
                    {lat: 37.325456, lng: -122.010646},
                    {lat: 37.562167, lng: -122.269053},
                    {lat: 37.764127, lng: -122.4309}
                ]
            }
        };            
        Environment.setEnv({
            'API_KEY_FOR_BROWSER_RELEASE': API_KEY_FOR_BROWSER_RELEASE,
            'API_KEY_FOR_BROWSER_DEBUG' : API_KEY_FOR_BROWSER_DEBUG
        });
        this.map = GoogleMaps.create('map_canvas',options);
        this.populateMap();
    }
    populateMap(){
        var that = this;
        this.disabled = true;
        this.map.clear();
        let locationPromise = this.locationProvider.getLocations("replacewithtoken");
        locationPromise.then(function(results){
            that.locationData = results;
            let jsonData = JSON.parse(that.locationData.data);
            console.log("jsonData: "+JSON.stringify(jsonData));
            
            // Markers
            for (let i=0; i<jsonData.length; i++){
                console.log("id[i]: "+jsonData[i].id+" latitude: "+jsonData[i].latitude+" longitude: "+jsonData[i].longitude);
                if (jsonData[i].latitude !== null && jsonData[i].latitude != 0){
                    console.log("adding marker");
                    var speed = "";
                    if (jsonData[i].speed !== null) speed = jsonData[i].speed + " mph";
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
                if (jsonData[i].latitude !== null && jsonData[i].latitude != 0) locationArray.push(pos);
            }
            let cameraPosition: CameraPosition<LatLng[]> = {
                target: locationArray
            };
            that.map.moveCamera(cameraPosition).then(function(){
                that.disabled = false;
            }).catch(function(err){
                that.disabled = false;
                console.log("err: "+JSON.stringify(err));
            });
            
        }).catch(function(err){
            that.disabled = false;
            console.log("tab error: "+err);
        });
    }
}
