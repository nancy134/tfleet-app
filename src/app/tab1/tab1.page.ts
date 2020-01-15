import { Component } from '@angular/core';
import { VehicleProvider } from '../../providers/vehicles';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
    public vehicleData: any = {};
    vehicles: any;
    public disabled = false;
    constructor(public vehicleProvider: VehicleProvider) {
        this.vehicles = [
            "vehicle 1",
            "vehicle 2",
            "vehicle 3"
        ];
    }
    async ngOnInit() {
        this.updateVehicles();
    }
    update(){
        this.updateVehicles();
    }
    updateVehicles(){
        var that=this;
        this.vehicles = [];
        this.disabled = true;
        let vehiclePromise = this.vehicleProvider.getVehicles("replacwithtoken");
        vehiclePromise.then(function(results){
            that.vehicleData = results;
            let jsonData = JSON.parse(that.vehicleData.data);
            console.log("jsonData: "+JSON.stringify(jsonData));
            for (let i=0; i<jsonData.length; i++){
                var vehicle = jsonData[i].display_name + " (" + jsonData[i].state + ")";
                that.vehicles.push(vehicle);
            }
            that.disabled = false;
        }).catch(function(err){
            that.disabled = false;
            console.log("err: "+JSON.stringify(err));
        });
    }
}
