import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { LocationProvider } from '../../providers/locations';

import { 
    GoogleMaps, 
    GoogleMap,
    GoogleMapOptions,
    GoogleMapsEvent,
    Marker,
    MarkerCluster,
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
        this.platform.ready().then(() => {
            console.log("Platform ready");
            this.initializeMap();
        });
    }
    update(){
        this.map.clear();
        this.populateMap();
    }
    initializeMap(){
        console.log("initializeMap()");
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
        this.map.one(GoogleMapsEvent.MAP_READY).then(this.populateMap.bind(this));
    }
    populateMap(){
        console.log("populateMap");
        var that = this;
        this.disabled = true;
        
        let locationPromise = this.locationProvider.getLocations("replacewithtoken");
        locationPromise.then(function(results){
            that.locationData = results;
            let jsonData = JSON.parse(that.locationData.data);
            
            // Marker Cluster
            let locationArray2 = [];
            for (let i=0; i<jsonData.length; i++){
                if (jsonData[i].latitude !== null && jsonData[i].latitude != 0) {
                    var speed = "";
                    if (jsonData[i].speed !== null) speed = jsonData[i].speed + " mph";
                    let pos = {
                        "position": {
                            "lat": jsonData[i].latitude,
                            "lng":jsonData[i].longitude
                        },
                        "name": jsonData[i].name,
                        "icon": "assets/map/red-dot.png",
                        "snippet" : speed 
                    };
                    locationArray2.push(pos);
                }
            }
            let markerCluster: MarkerCluster = that.map.addMarkerClusterSync({
                boundsDraw: false,
                markers: locationArray2,
                icons: [
                {
                    min: 2,
                    max: 100,
                    url: "./assets/map/m1.png",
                    label: {
                        color: "white"
                    }
                },
                {
                    min: 101,
                    url: "./assets/map/m1.png",
                    label: {
                        color: "white"
                    }
                }
                ]
            });
            markerCluster.on(GoogleMapsEvent.MARKER_CLICK).subscribe((params) => {
                let marker: Marker = params[1];
                marker.setTitle(marker.get("name"));
                marker.setSnippet(marker.get("snippet"));
                marker.showInfoWindow();
            });

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
            });
            
            
        }).catch(function(err){
            that.disabled = false;
        });
    }
}
