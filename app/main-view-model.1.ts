// import {Observable} from 'data/observable';
// import Platform = require('platform');
// import * as dialogs from "ui/dialogs";
// import {BackgroundGeolocation} from "nativescript-background-geolocation-lt";
// import {BackgroundFetch} from "nativescript-background-fetch";
// import * as LocalNotifications from "nativescript-local-notifications";
// import * as Toast from 'nativescript-toast';
// import { Border } from "tns-core-modules/ui/border";

// import BGService from "./lib/BGService";
// import { TextField } from "ui/text-field";
// class createViewModel extends Observable{
//     private _state: any;
//     private locations: string;
//     constructor() {
//         super();
//         LocalNotifications.requestPermission().then(
//             function(granted) {
//             console.log("Permission granted? " + granted);
//             }
//         );
//         BackgroundGeolocation.configure({
//             debug: false,
//             desiredAccuracy: 0,
//             stationaryRadius: 25,
//             distanceFilter: 10,
//             activityRecognitionInterval: 0,
//             heartbeatInterval: 30,
//             autoSync: true
//             }, (state) => {
//                 if (!state.enabled) {
//                     BackgroundGeolocation.start();
//                 }
//             });
//         BackgroundGeolocation.on("location", this.onLocation.bind(this));
//         BackgroundGeolocation.on("motionchange", this.onMotionChange.bind(this));
//         BackgroundGeolocation.on('heartbeat', this.onHeartBeat.bind(this));
//         BackgroundGeolocation.on("geofence", this.GeofenceChange.bind(this));
//         BackgroundGeolocation.start();
//     }
//     //////////////Background Geo Location events//////////////
//     private onLocation(location:any) {
//         if (location != null){
//         this.set("lbl_longitude",location.coords.longitude);
//         this.set("lbl_latitude",location.coords.latitude);
//         this.AddNotification("onLocation", "Latitude: " + location.coords.latitude + " Longitude: " + location.coords.longitude,1);
//         }
//     }
//     private onMotionChange(isMoving:boolean, location:any) 
//     {
//         if (location != null){
//             console.log('[event] motionchange: ', isMoving, location);
//         }
//     }
//     private GeofenceChange (geofence) {
//         if (location != null){
//             var location    = geofence.location;
//             var identifier  = geofence.identifier;
//             var action      = geofence.action;
//             console.log(action+' A geofence has been crossed: '+ identifier);
//             console.log('ENTER or EXIT?: ', action);
//             console.log('geofence: ', JSON.stringify(geofence));
//             this.AddNotification('A geofence has been crossed:',  action+' from geofence: '+ identifier,2);
//             console.log("--------------------------------------");
//         }
//     }
//     private onHeartBeat(params) {
//         console.log('- heartbeat event received');
//         BackgroundGeolocation.getCurrentPosition(function(location) {
//             if (location != null){
//                 console.log('- Current position received: ', location);
//             }
//         }, function(errorCode) {
//             this.AddNotification('onHeartBeat[error]',"error",5);
//         }, {
//             timeout: 30,      // 30 second timeout to fetch location
//             maximumAge: 5000, // Accept the last-known-location if not older than 5000 ms.
//             desiredAccuracy: 10,  // Try to fetch a location with an accuracy of `10` meters.
//             samples: 3,   // How many location samples to attempt.
//             extras: {         // [Optional] Attach your own custom `metaData` to this location.  This metaData will be persisted to SQLite and POSTed to your server
//             foo: "bar"  
//             }
//         });
//     }
//     //////////////Screen events//////////////
//     private AddFence_onTap()
//     {
//         BackgroundGeolocation.addGeofences([{
//                 identifier: this.get("txt_fenceName"),
//                 radius: 100,
//                 latitude: this.get("txt_latitude"),
//                 longitude: this.get("txt_longitude"),
//                 notifyOnEntry: true,
//                 notifyOnExit: true,
//                 notifyOnDwell: false,
//                 loiteringDelay: 30000,   // 30 seconds
//                 extras: {                // Optional arbitrary meta-data
//                     zone_id: 1236
//                 }
//                 }], function() {
//                     console.log("Successfully added geofence");
//                 }, function(error) {
//                     console.warn("Failed to add geofence", error);
//         });
//     }
    
//     private GetCurrentLocation_onTap(){
//         this.set("txt_longitude",this.get("lbl_longitude"));
//         this.set("txt_latitude",this.get("lbl_latitude"));
//     }
//     private sendLog(newLocation:string){
//         BackgroundGeolocation.getCurrentPosition(function(location) {
//             console.log('- Current position received: ', location);
//           }, function(errorCode) {
//               this.AddNotification("onHeartBeat[error]", "error",5);
//           }, {
//             timeout: 30,      // 30 second timeout to fetch location
//             maximumAge: 1000, // Accept the last-known-location if not older than 5000 ms.
//             desiredAccuracy: 10,  // Try to fetch a location with an accuracy of `10` meters.
//             samples: 3,   // How many location samples to attempt.
//             extras: {         // [Optional] Attach your own custom `metaData` to this location.  This metaData will be persisted to SQLite and POSTed to your server
//               foo: "bar"  
//             }
//           });
//     }
//     //////////////Methods//////////////
//     private AddNotification(_title, _body, _id){
//         LocalNotifications.schedule([{
//             id: _id,
//             title: _title,
//             body:_body,
//             ticker: 'The ticker',
//             badge: _id,
//             smallIcon: 'res://heart',
//             interval: 'minute',
//             at: new Date(new Date().getTime() + (10 * 1000))
//           }]).then(
//               function() {
//                 console.log("Notification scheduled");
//               },
//               function(error) {
//                 console.log("scheduling error: " + error);
//               }
//           )
//     }
//     private getLocation(newLocation:string){
//         this.locations = newLocation + this.locations;
//         return this.locations;
//     }
// }
// export default createViewModel;
