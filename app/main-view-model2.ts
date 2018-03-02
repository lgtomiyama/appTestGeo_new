// import {Observable} from 'data/observable';
// import Platform = require('platform');
// import * as dialogs from "ui/dialogs";
// import {BackgroundGeolocation} from "nativescript-background-geolocation-lt";
// import {BackgroundFetch} from "nativescript-background-fetch";
// import * as LocalNotifications from "nativescript-local-notifications";
// import * as Toast from 'nativescript-toast';
// import { Border } from "tns-core-modules/ui/border";
// import frames = require("ui/frame");

// import BGService from "./lib/BGService";

// export class createViewModel extends Observable{

//   private _location: string;
//   private _counter: number;
//   private _message: string;
//   private _isMoving: boolean;
//   private _enabled: boolean;
//   private _paceButtonIcon: string;
//   private _motionActivity: string;
//   private _odometer: any;
//   private _mainMenuActivated: boolean;
//   private _isPowerSaveMode:boolean;
//   private locations: string;
//   private _lbl_latitude: string;
//   private _lbl_longitude: string;
//   constructor() {
//     super();
//     this._mainMenuActivated = false;
//     this.odometer = 0;
//     this.motionActivity = 'unknown';

//     // BackgroundFetch.status((status) => {
//     //   console.log('- BackgroundFetch status: ', status);
//     // });
//     // Listen to iOS-only BackgroundFetch events. 
//     BackgroundFetch.configure({stopOnTerminate: false}, () => {
//       console.log('[event] BackgroundFetch');
//       BackgroundFetch.finish(UIBackgroundFetchResult.NewData);
//     });

//     // Ten optional events to listen to:
//     BackgroundGeolocation.on("location", this.onLocation.bind(this));
//     BackgroundGeolocation.on("motionchange", this.onMotionChange.bind(this));      
//     BackgroundGeolocation.on('http', this.onHttp.bind(this));
//     BackgroundGeolocation.on('providerchange', this.onProviderChange.bind(this));
//     BackgroundGeolocation.on('powersavechange', this.onPowerSaveChange.bind(this));
//     BackgroundGeolocation.on('schedule', this.onSchedule.bind(this));
//     BackgroundGeolocation.on('activitychange', this.onActivityChange.bind(this));
//     BackgroundGeolocation.on('heartbeat', this.onHeartbeat.bind(this));
//     BackgroundGeolocation.on('geofence', this.onGeofence.bind(this));
//     BackgroundGeolocation.on('geofenceschange', this.onGeofencesChange.bind(this));

//     // Fetch list of available sensors on this device.
//     BackgroundGeolocation.getSensors((sensors) => {
//       console.log('[js] sensors: ', JSON.stringify(sensors, null, 2));
//       //BGService.getInstance().toast('Sensors: ' + JSON.stringify(sensors));
//     });
//     // Fetch current state of power-save mode.
//     BackgroundGeolocation.isPowerSaveMode((mode) => {
//       console.log('[js] isPowerSaveMode: ', mode);
//       this.isPowerSaveMode = mode;
//     });
//     // Fetch current config settings.
//     BGService.getInstance().getConfig(config => {
//       // Configure BackgroundGeolocation
//       config.url = 'http://tracker.transistorsoft.com/locations/transistor-nativescript';
      
//       BackgroundGeolocation.configure(config, (state) => {
//         console.log('[js] configure success: ', state);
//         //this.paceButtonIcon = (state.isMoving) ? ICONS.pause : ICONS.play;
//         this.enabled = true;
        
//         //this.enabled = state.enabled;
//       });
//     });
//   }

//   /**
//   * Properties
//   */
//   get users() {
//     return [{name: 'foo'}, {name: 'bar'}, {name: 'baz'}];
//   }

//   set enabled(value:boolean) {
//     console.log('- setEnabled: ', value);
//     this.notifyPropertyChange('enabled', value);
//     // this._enabled = value;
//     this._enabled = true;
//     if (value) {
//       BackgroundGeolocation.start();
//     } else {
//       BackgroundGeolocation.stop();
//       this.isMoving = false;
//       BackgroundGeolocation.stopWatchPosition();

//     }
//   }


// public get lbl_latitude() : string {
//     return this._lbl_latitude;
// }
// public set lbl_latitude(v : string) {
//     this.notifyPropertyChange('lbl_latitude', this._lbl_latitude);
//     this._lbl_latitude = v;
// }


// public get lbl_longitude() : string {
//     this.notifyPropertyChange('lbl_longitude', this._lbl_longitude);
//     return this._lbl_longitude;
// }
// public set lbl_longitude(v : string) {
//     this._lbl_longitude = v;
// }


//   get enabled():boolean {
//     return this._enabled;
//   }

//   set isMoving(value:boolean) {
//     this._isMoving = value;
//     //this.paceButtonIcon = (this._isMoving === true) ? ICONS.pause : ICONS.play;
//   }

//   get isMoving():boolean {
//     return this._isMoving;
//   }

//   get isPowerSaveMode():boolean {
//     return this._isPowerSaveMode;
//   }
//   set isPowerSaveMode(value:boolean) {
//     this._isPowerSaveMode = value;
//     this.notifyPropertyChange('isPowerSaveMode', value);
//   }

//   set location(location:string) {
//     this._location = location;
//     this.notifyPropertyChange('location', this._location);
//   }
//   get location():string {
//     return this._location;
//   }

//   get odometer() {
//     return this._odometer;
//   }
//   set odometer(value) {
//      this._odometer = Math.round((value/1000)*10)/10 + 'km'
//      this.notifyPropertyChange('odometer', this._odometer);
//   }

//   get motionActivity():string {
//     return this._motionActivity;
//   }
//   set motionActivity(activity) {
//     if (this.motionActivity !== activity) {
//       this._motionActivity = activity;
//       this.notifyPropertyChange('motionActivity', activity);
//     }
//   }
//   public AddNotification(_title, _body, _id){
//     LocalNotifications.schedule([{
//         id: _id,
//         title: _title,
//         body:_body,
//         ticker: _body,
//         badge: _id,
//         smallIcon: 'res://heart',
//         interval: 'second',
//         sound: null//,
//         //at: new Date(new Date().getTime() + (10 * 1000))
//       }]).then(
//           function() {
//             console.log("Notification scheduled");
//           },
//           function(error) {
//             console.log("scheduling error: " + error);
//           }
//       )
//     }
  
//   public onGetCurrentPosition() {   
//     BackgroundGeolocation.getCurrentPosition((location) => {
//       console.log('[js] getCurrentPosition', location);
//     }, (error) => {
//       console.warn('[js] location error: ', error);
//       //BGService.getInstance().toast('Location error: ' + error);
//     }, {
//       samples: 3,
//       persist: true
//     });
//   }
//   //Ui events 
//   private AddFence_onTap()
//   {
//       BackgroundGeolocation.addGeofences([{
//               identifier: this.get("txt_fenceName"),
//               radius: 100,
//               latitude: this.get("txt_latitude"),
//               longitude: this.get("txt_longitude"),
//               notifyOnEntry: true,
//               notifyOnExit: true,
//               notifyOnDwell: false,
//               loiteringDelay: 3000//,   // 30 seconds
//               // extras: {                // Optional arbitrary meta-data
//               //     zone_id: 1236
//               // }
//               }], function() {
//                   console.log("Successfully added geofence");
//               }, function(error) {
//                   console.warn("Failed to add geofence", error);
//       });
//   }
//   private sendLog(newLocation:string){
//     BackgroundGeolocation.emailLog("lgtomiyama@gmail.com");
//   }
//   private GetCurrentLocation_onTap(){
//       this.set("txt_longitude",this.get("lbl_longitude"));
//       this.set("txt_latitude",this.get("lbl_latitude"));
//   }
//   /**
//   * Event-listeners
//   */
//   private onLocation(location:any) {
//     console.log('[event] location: ', location);
//     this.location = JSON.stringify(location, null, 2);
//     this.lbl_latitude = location.coords.latitude;
//     this.lbl_longitude = location.coords.longitude;
//     console.log('[event] lbl_latitude: ', this.lbl_longitude);
//     console.log('[event] lbl_longitude: ', this.lbl_latitude);
//     this.odometer = location.odometer;
//     this.AddNotification("onLocation", "Latitude: " + location.coords.latitude + " Longitude: " + location.coords.longitude,1);
    
//     BackgroundGeolocation.logger.notice('Location received in client');

//   }

//   private onMotionChange(isMoving:boolean, location:any) {
//     console.log('[event] motionchange: ', isMoving, location);

//     this.isMoving = isMoving;
//   }

//   private onActivityChange(event:any) {
//     console.log('[event] activitychange: ', event.activity, event.confidence);
//     //this.AddNotification("Activity",  this.lbl_latitude + "|" + this.lbl_longitude + "|" + event.confidence, 4)
//     this.motionActivity = event.activity;
//   }

//   private onProviderChange(provider:any) {
//     console.log('[event] providerchange: ', provider);
//   }

//   private onGeofence(geofence:any) {
//    // console.log('[event] geofence', geofence);
//     var identifier  = geofence.identifier;
//     var action      = geofence.action;
//     console.log(action+' A geofence has been crossed: '+ identifier);
//     console.log('ENTER or EXIT?: ', action);
//     console.log('geofence: ', JSON.stringify(geofence));
//     this.AddNotification('A geofence has been crossed:',  action+' from geofence: '+identifier,2);
//     console.log("--------------------------------------");
//   }

//   private onGeofencesChange(event:any) {
//     console.log('[event] geofenceschange ON:', JSON.stringify(event.on), ', OFF:', JSON.stringify(event.off));
//   }

//   private onHttp(response:any) {
//     console.log('[event] http: ', response.status, response.responseText);
//   }

//   private onHeartbeat(event:any) {
//     console.log('[event] heartbeat', event);

//     //console.log('- heartbeat event received');
//     // BackgroundGeolocation.getCurrentPosition(function(location) {
//     //     if (location != null){
//     //         console.log('- Current position received: ', location);
//     //     }
//     // }, function(errorCode) {
//     //     this.AddNotification('onHeartBeat[error]',"error",5);
//     // }, {
//     //     timeout: 30,      // 30 second timeout to fetch location
//     //     maximumAge: 5000, // Accept the last-known-location if not older than 5000 ms.
//     //     desiredAccuracy: 10,  // Try to fetch a location with an accuracy of `10` meters.
//     //     samples: 3,   // How many location samples to attempt.
//     //     extras: {         // [Optional] Attach your own custom `metaData` to this location.  This metaData will be persisted to SQLite and POSTed to your server
//     //     foo: "bar"  
//     //     }
//     // });

//   }

//   private onSchedule(state:any) {
//     console.log('[event] schedule: ', state.enabled);
//   }

//   private onPowerSaveChange(isPowerSaveMode:boolean) {
//     console.log('[event] powersavechange: ', isPowerSaveMode);
//     this.isPowerSaveMode = isPowerSaveMode;
//   }
// }
// export default createViewModel;
