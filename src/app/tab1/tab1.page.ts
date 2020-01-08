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
    updateVehicles(){
        var that=this;
        this.vehicles = [];
        let vehiclePromise = this.vehicleProvider.getVehicles("2773d3c9d12404bdd13c19d122982cf805066286b39d4167af525a54a69dc8a3");
        vehiclePromise.then(function(results){
            that.vehicleData = results;
            let jsonData = JSON.parse(that.vehicleData.data);
            console.log("jsonData: "+JSON.stringify(jsonData));
            for (let i=0; i<jsonData.length; i++){
                var vehicle = jsonData[i].display_name + " (" + jsonData[i].state + ")";
                that.vehicles.push(vehicle);
            }
        }).catch(function(err){
            console.log("err: "+JSON.stringify(err));
        });
    }
}
