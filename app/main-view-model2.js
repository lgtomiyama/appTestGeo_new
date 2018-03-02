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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsMi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4tdmlldy1tb2RlbDIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsOENBQThDO0FBQzlDLHlDQUF5QztBQUN6Qyx5Q0FBeUM7QUFDekMsZ0ZBQWdGO0FBQ2hGLGlFQUFpRTtBQUNqRSwwRUFBMEU7QUFDMUUsK0NBQStDO0FBQy9DLHVEQUF1RDtBQUN2RCx1Q0FBdUM7QUFFdkMsMkNBQTJDO0FBRTNDLG1EQUFtRDtBQUVuRCwrQkFBK0I7QUFDL0IsOEJBQThCO0FBQzlCLDhCQUE4QjtBQUM5QixnQ0FBZ0M7QUFDaEMsK0JBQStCO0FBQy9CLHFDQUFxQztBQUNyQyxxQ0FBcUM7QUFDckMsNEJBQTRCO0FBQzVCLHlDQUF5QztBQUN6QyxzQ0FBc0M7QUFDdEMsK0JBQStCO0FBQy9CLG1DQUFtQztBQUNuQyxvQ0FBb0M7QUFDcEMsb0JBQW9CO0FBQ3BCLGVBQWU7QUFDZix1Q0FBdUM7QUFDdkMseUJBQXlCO0FBQ3pCLHVDQUF1QztBQUV2Qyw4Q0FBOEM7QUFDOUMsOERBQThEO0FBQzlELGFBQWE7QUFDYixxREFBcUQ7QUFDckQsa0VBQWtFO0FBQ2xFLGdEQUFnRDtBQUNoRCxpRUFBaUU7QUFDakUsVUFBVTtBQUVWLDJDQUEyQztBQUMzQyx3RUFBd0U7QUFDeEUsc0ZBQXNGO0FBQ3RGLGdFQUFnRTtBQUNoRSxvRkFBb0Y7QUFDcEYsc0ZBQXNGO0FBQ3RGLHdFQUF3RTtBQUN4RSxvRkFBb0Y7QUFDcEYsMEVBQTBFO0FBQzFFLHdFQUF3RTtBQUN4RSxzRkFBc0Y7QUFFdEYseURBQXlEO0FBQ3pELHNEQUFzRDtBQUN0RCx5RUFBeUU7QUFDekUsZ0ZBQWdGO0FBQ2hGLFVBQVU7QUFDVixpREFBaUQ7QUFDakQsd0RBQXdEO0FBQ3hELHFEQUFxRDtBQUNyRCxxQ0FBcUM7QUFDckMsVUFBVTtBQUNWLHdDQUF3QztBQUN4QyxvREFBb0Q7QUFDcEQsMkNBQTJDO0FBQzNDLDRG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QUNwRCxzREFBc0Q7QUFDdEQsaUVBQWlFO0FBQ2pFLGlFQUFpRTtBQUNqRSx5Q0FBeUM7QUFDekMsa0lBQWtJO0FBRWxJLDBFQUEwRTtBQUUxRSxNQUFNO0FBRU4sNkRBQTZEO0FBQzdELGlFQUFpRTtBQUVqRSxnQ0FBZ0M7QUFDaEMsTUFBTTtBQUVOLDBDQUEwQztBQUMxQyxpRkFBaUY7QUFDakYsb0hBQW9IO0FBQ3BILDRDQUE0QztBQUM1QyxNQUFNO0FBRU4sNkNBQTZDO0FBQzdDLHlEQUF5RDtBQUN6RCxNQUFNO0FBRU4sdUNBQXVDO0FBQ3ZDLG1EQUFtRDtBQUNuRCw2Q0FBNkM7QUFDN0MseUNBQXlDO0FBQ3pDLHdFQUF3RTtBQUN4RSwrQ0FBK0M7QUFDL0MsMkRBQTJEO0FBQzNELHFHQUFxRztBQUNyRyw2REFBNkQ7QUFDN0QsTUFBTTtBQUVOLDJDQUEyQztBQUMzQyxpSEFBaUg7QUFDakgsTUFBTTtBQUVOLG1DQUFtQztBQUNuQyw2RUFBNkU7QUFDN0UsTUFBTTtBQUVOLHFDQUFxQztBQUNyQywrQ0FBK0M7QUFFL0MsbURBQW1EO0FBQ25ELHVFQUF1RTtBQUN2RSxvQ0FBb0M7QUFDcEMseUVBQXlFO0FBQ3pFLGVBQWU7QUFDZixrQ0FBa0M7QUFDbEMsbUVBQW1FO0FBQ25FLGNBQWM7QUFDZCxzRUFBc0U7QUFDdEUsNEZBQTRGO0FBQzVGLCtGQUErRjtBQUMvRixvRUFBb0U7QUFDcEUsc0tBQXNLO0FBQ3RLLDBCQUEwQjtBQUMxQixlQUFlO0FBQ2YsYUFBYTtBQUViLE1BQU07QUFFTixvQ0FBb0M7QUFDcEMsd0RBQXdEO0FBQ3hELE1BQU07QUFFTix5REFBeUQ7QUFDekQsaUVBQWlFO0FBQ2pFLDhDQUE4QztBQUM5QyxNQUFNO0FBQ04sSUFBSTtBQUNKLGtDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcbi8vIGltcG9ydCBQbGF0Zm9ybSA9IHJlcXVpcmUoJ3BsYXRmb3JtJyk7XG4vLyBpbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG4vLyBpbXBvcnQge0JhY2tncm91bmRHZW9sb2NhdGlvbn0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1iYWNrZ3JvdW5kLWdlb2xvY2F0aW9uLWx0XCI7XG4vLyBpbXBvcnQge0JhY2tncm91bmRGZXRjaH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1iYWNrZ3JvdW5kLWZldGNoXCI7XG4vLyBpbXBvcnQgKiBhcyBMb2NhbE5vdGlmaWNhdGlvbnMgZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2NhbC1ub3RpZmljYXRpb25zXCI7XG4vLyBpbXBvcnQgKiBhcyBUb2FzdCBmcm9tICduYXRpdmVzY3JpcHQtdG9hc3QnO1xuLy8gaW1wb3J0IHsgQm9yZGVyIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvYm9yZGVyXCI7XG4vLyBpbXBvcnQgZnJhbWVzID0gcmVxdWlyZShcInVpL2ZyYW1lXCIpO1xuXG4vLyBpbXBvcnQgQkdTZXJ2aWNlIGZyb20gXCIuL2xpYi9CR1NlcnZpY2VcIjtcblxuLy8gZXhwb3J0IGNsYXNzIGNyZWF0ZVZpZXdNb2RlbCBleHRlbmRzIE9ic2VydmFibGV7XG5cbi8vICAgcHJpdmF0ZSBfbG9jYXRpb246IHN0cmluZztcbi8vICAgcHJpdmF0ZSBfY291bnRlcjogbnVtYmVyO1xuLy8gICBwcml2YXRlIF9tZXNzYWdlOiBzdHJpbmc7XG4vLyAgIHByaXZhdGUgX2lzTW92aW5nOiBib29sZWFuO1xuLy8gICBwcml2YXRlIF9lbmFibGVkOiBib29sZWFuO1xuLy8gICBwcml2YXRlIF9wYWNlQnV0dG9uSWNvbjogc3RyaW5nO1xuLy8gICBwcml2YXRlIF9tb3Rpb25BY3Rpdml0eTogc3RyaW5nO1xuLy8gICBwcml2YXRlIF9vZG9tZXRlcjogYW55O1xuLy8gICBwcml2YXRlIF9tYWluTWVudUFjdGl2YXRlZDogYm9vbGVhbjtcbi8vICAgcHJpdmF0ZSBfaXNQb3dlclNhdmVNb2RlOmJvb2xlYW47XG4vLyAgIHByaXZhdGUgbG9jYXRpb25zOiBzdHJpbmc7XG4vLyAgIHByaXZhdGUgX2xibF9sYXRpdHVkZTogc3RyaW5nO1xuLy8gICBwcml2YXRlIF9sYmxfbG9uZ2l0dWRlOiBzdHJpbmc7XG4vLyAgIGNvbnN0cnVjdG9yKCkge1xuLy8gICAgIHN1cGVyKCk7XG4vLyAgICAgdGhpcy5fbWFpbk1lbnVBY3RpdmF0ZWQgPSBmYWxzZTtcbi8vICAgICB0aGlzLm9kb21ldGVyID0gMDtcbi8vICAgICB0aGlzLm1vdGlvbkFjdGl2aXR5ID0gJ3Vua25vd24nO1xuXG4vLyAgICAgLy8gQmFja2dyb3VuZEZldGNoLnN0YXR1cygoc3RhdHVzKSA9PiB7XG4vLyAgICAgLy8gICBjb25zb2xlLmxvZygnLSBCYWNrZ3JvdW5kRmV0Y2ggc3RhdHVzOiAnLCBzdGF0dXMpO1xuLy8gICAgIC8vIH0pO1xuLy8gICAgIC8vIExpc3RlbiB0byBpT1Mtb25seSBCYWNrZ3JvdW5kRmV0Y2ggZXZlbnRzLiBcbi8vICAgICBCYWNrZ3JvdW5kRmV0Y2guY29uZmlndXJlKHtzdG9wT25UZXJtaW5hdGU6IGZhbHNlfSwgKCkgPT4ge1xuLy8gICAgICAgY29uc29sZS5sb2coJ1tldmVudF0gQmFja2dyb3VuZEZldGNoJyk7XG4vLyAgICAgICBCYWNrZ3JvdW5kRmV0Y2guZmluaXNoKFVJQmFja2dyb3VuZEZldGNoUmVzdWx0Lk5ld0RhdGEpO1xuLy8gICAgIH0pO1xuXG4vLyAgICAgLy8gVGVuIG9wdGlvbmFsIGV2ZW50cyB0byBsaXN0ZW4gdG86XG4vLyAgICAgQmFja2dyb3VuZEdlb2xvY2F0aW9uLm9uKFwibG9jYXRpb25cIiwgdGhpcy5vbkxvY2F0aW9uLmJpbmQodGhpcykpO1xuLy8gICAgIEJhY2tncm91bmRHZW9sb2NhdGlvbi5vbihcIm1vdGlvbmNoYW5nZVwiLCB0aGlzLm9uTW90aW9uQ2hhbmdlLmJpbmQodGhpcykpOyAgICAgIFxuLy8gICAgIEJhY2tncm91bmRHZW9sb2NhdGlvbi5vbignaHR0cCcsIHRoaXMub25IdHRwLmJpbmQodGhpcykpO1xuLy8gICAgIEJhY2tncm91bmRHZW9sb2NhdGlvbi5vbigncHJvdmlkZXJjaGFuZ2UnLCB0aGlzLm9uUHJvdmlkZXJDaGFuZ2UuYmluZCh0aGlzKSk7XG4vLyAgICAgQmFja2dyb3VuZEdlb2xvY2F0aW9uLm9uKCdwb3dlcnNhdmVjaGFuZ2UnLCB0aGlzLm9uUG93ZXJTYXZlQ2hhbmdlLmJpbmQodGhpcykpO1xuLy8gICAgIEJhY2tncm91bmRHZW9sb2NhdGlvbi5vbignc2NoZWR1bGUnLCB0aGlzLm9uU2NoZWR1bGUuYmluZCh0aGlzKSk7XG4vLyAgICAgQmFja2dyb3VuZEdlb2xvY2F0aW9uLm9uKCdhY3Rpdml0eWNoYW5nZScsIHRoaXMub25BY3Rpdml0eUNoYW5nZS5iaW5kKHRoaXMpKTtcbi8vICAgICBCYWNrZ3JvdW5kR2VvbG9jYXRpb24ub24oJ2hlYXJ0YmVhdCcsIHRoaXMub25IZWFydGJlYXQuYmluZCh0aGlzKSk7XG4vLyAgICAgQmFja2dyb3VuZEdlb2xvY2F0aW9uLm9uKCdnZW9mZW5jZScsIHRoaXMub25HZW9mZW5jZS5iaW5kKHRoaXMpKTtcbi8vICAgICBCYWNrZ3JvdW5kR2VvbG9jYXRpb24ub24oJ2dlb2ZlbmNlc2NoYW5nZScsIHRoaXMub25HZW9mZW5jZXNDaGFuZ2UuYmluZCh0aGlzKSk7XG5cbi8vICAgICAvLyBGZXRjaCBsaXN0IG9mIGF2YWlsYWJsZSBzZW5zb3JzIG9uIHRoaXMgZGV2aWNlLlxuLy8gICAgIEJhY2tncm91bmRHZW9sb2NhdGlvbi5nZXRTZW5zb3JzKChzZW5zb3JzKSA9PiB7XG4vLyAgICAgICBjb25zb2xlLmxvZygnW2pzXSBzZW5zb3JzOiAnLCBKU09OLnN0cmluZ2lmeShzZW5zb3JzLCBudWxsLCAyKSk7XG4vLyAgICAgICAvL0JHU2VydmljZS5nZXRJbnN0YW5jZSgpLnRvYXN0KCdTZW5zb3JzOiAnICsgSlNPTi5zdHJpbmdpZnkoc2Vuc29ycykpO1xuLy8gICAgIH0pO1xuLy8gICAgIC8vIEZldGNoIGN1cnJlbnQgc3RhdGUgb2YgcG93ZXItc2F2ZSBtb2RlLlxuLy8gICAgIEJhY2tncm91bmRHZW9sb2NhdGlvbi5pc1Bvd2VyU2F2ZU1vZGUoKG1vZGUpID0+IHtcbi8vICAgICAgIGNvbnNvbGUubG9nKCdbanNdIGlzUG93ZXJTYXZlTW9kZTogJywgbW9kZSk7XG4vLyAgICAgICB0aGlzLmlzUG93ZXJTYXZlTW9kZSA9IG1vZGU7XG4vLyAgICAgfSk7XG4vLyAgICAgLy8gRmV0Y2ggY3VycmVudCBjb25maWcgc2V0dGluZ3MuXG4vLyAgICAgQkdTZXJ2aWNlLmdldEluc3RhbmNlKCkuZ2V0Q29uZmlnKGNvbmZpZyA9PiB7XG4vLyAgICAgICAvLyBDb25maWd1cmUgQmFja2dyb3VuZEdlb2xvY2F0aW9uXG4vLyAgICAgICBjb25maWcudXJsID0gJ2h0dHA6Ly90cmFja2VyLnRyYW5zaXN0b3Jzb2Z0LmNvbS9sb2NhdGlvbnMvdHJhbnNpc3Rvci1uYXRpdmVzY3JpcHQnO1xuICAgICAgXG4vLyAgICAgICBCYWNrZ3JvdW5kR2VvbG9jYXRpb24uY29uZmlndXJlKGNvbmZpZywgKHN0YXRlKSA9PiB7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKCdbanNdIGNvbmZpZ3VyZSBzdWNjZXNzOiAnLCBzdGF0ZSk7XG4vLyAgICAgICAgIC8vdGhpcy5wYWNlQnV0dG9uSWNvbiA9IChzdGF0ZS5pc01vdmluZykgPyBJQ09OUy5wYXVzZSA6IElDT05TLnBsYXk7XG4vLyAgICAgICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XG4gICAgICAgIFxuLy8gICAgICAgICAvL3RoaXMuZW5hYmxlZCA9IHN0YXRlLmVuYWJsZWQ7XG4vLyAgICAgICB9KTtcbi8vICAgICB9KTtcbi8vICAgfVxuXG4vLyAgIC8qKlxuLy8gICAqIFByb3BlcnRpZXNcbi8vICAgKi9cbi8vICAgZ2V0IHVzZXJzKCkge1xuLy8gICAgIHJldHVybiBbe25hbWU6ICdmb28nfSwge25hbWU6ICdiYXInfSwge25hbWU6ICdiYXonfV07XG4vLyAgIH1cblxuLy8gICBzZXQgZW5hYmxlZCh2YWx1ZTpib29sZWFuKSB7XG4vLyAgICAgY29uc29sZS5sb2coJy0gc2V0RW5hYmxlZDogJywgdmFsdWUpO1xuLy8gICAgIHRoaXMubm90aWZ5UHJvcGVydHlDaGFuZ2UoJ2VuYWJsZWQnLCB2YWx1ZSk7XG4vLyAgICAgLy8gdGhpcy5fZW5hYmxlZCA9IHZhbHVlO1xuLy8gICAgIHRoaXMuX2VuYWJsZWQgPSB0cnVlO1xuLy8gICAgIGlmICh2YWx1ZSkge1xuLy8gICAgICAgQmFja2dyb3VuZEdlb2xvY2F0aW9uLnN0YXJ0KCk7XG4vLyAgICAgfSBlbHNlIHtcbi8vICAgICAgIEJhY2tncm91bmRHZW9sb2NhdGlvbi5zdG9wKCk7XG4vLyAgICAgICB0aGlzLmlzTW92aW5nID0gZmFsc2U7XG4vLyAgICAgICBCYWNrZ3JvdW5kR2VvbG9jYXRpb24uc3RvcFdhdGNoUG9zaXRpb24oKTtcblxuLy8gICAgIH1cbi8vICAgfVxuXG5cbi8vIHB1YmxpYyBnZXQgbGJsX2xhdGl0dWRlKCkgOiBzdHJpbmcge1xuLy8gICAgIHJldHVybiB0aGlzLl9sYmxfbGF0aXR1ZGU7XG4vLyB9XG4vLyBwdWJsaWMgc2V0IGxibF9sYXRpdHVkZSh2IDogc3RyaW5nKSB7XG4vLyAgICAgdGhpcy5ub3RpZnlQcm9wZXJ0eUNoYW5nZSgnbGJsX2xhdGl0dWRlJywgdGhpcy5fbGJsX2xhdGl0dWRlKTtcbi8vICAgICB0aGlzLl9sYmxfbGF0aXR1ZGUgPSB2O1xuLy8gfVxuXG5cbi8vIHB1YmxpYyBnZXQgbGJsX2xvbmdpdHVkZSgpIDogc3RyaW5nIHtcbi8vICAgICB0aGlzLm5vdGlmeVByb3BlcnR5Q2hhbmdlKCdsYmxfbG9uZ2l0dWRlJywgdGhpcy5fbGJsX2xvbmdpdHVkZSk7XG4vLyAgICAgcmV0dXJuIHRoaXMuX2xibF9sb25naXR1ZGU7XG4vLyB9XG4vLyBwdWJsaWMgc2V0IGxibF9sb25naXR1ZGUodiA6IHN0cmluZykge1xuLy8gICAgIHRoaXMuX2xibF9sb25naXR1ZGUgPSB2O1xuLy8gfVxuXG5cbi8vICAgZ2V0IGVuYWJsZWQoKTpib29sZWFuIHtcbi8vICAgICByZXR1cm4gdGhpcy5fZW5hYmxlZDtcbi8vICAgfVxuXG4vLyAgIHNldCBpc01vdmluZyh2YWx1ZTpib29sZWFuKSB7XG4vLyAgICAgdGhpcy5faXNNb3ZpbmcgPSB2YWx1ZTtcbi8vICAgICAvL3RoaXMucGFjZUJ1dHRvbkljb24gPSAodGhpcy5faXNNb3ZpbmcgPT09IHRydWUpID8gSUNPTlMucGF1c2UgOiBJQ09OUy5wbGF5O1xuLy8gICB9XG5cbi8vICAgZ2V0IGlzTW92aW5nKCk6Ym9vbGVhbiB7XG4vLyAgICAgcmV0dXJuIHRoaXMuX2lzTW92aW5nO1xuLy8gICB9XG5cbi8vICAgZ2V0IGlzUG93ZXJTYXZlTW9kZSgpOmJvb2xlYW4ge1xuLy8gICAgIHJldHVybiB0aGlzLl9pc1Bvd2VyU2F2ZU1vZGU7XG4vLyAgIH1cbi8vICAgc2V0IGlzUG93ZXJTYXZlTW9kZSh2YWx1ZTpib29sZWFuKSB7XG4vLyAgICAgdGhpcy5faXNQb3dlclNhdmVNb2RlID0gdmFsdWU7XG4vLyAgICAgdGhpcy5ub3RpZnlQcm9wZXJ0eUNoYW5nZSgnaXNQb3dlclNhdmVNb2RlJywgdmFsdWUpO1xuLy8gICB9XG5cbi8vICAgc2V0IGxvY2F0aW9uKGxvY2F0aW9uOnN0cmluZykge1xuLy8gICAgIHRoaXMuX2xvY2F0aW9uID0gbG9jYXRpb247XG4vLyAgICAgdGhpcy5ub3RpZnlQcm9wZXJ0eUNoYW5nZSgnbG9jYXRpb24nLCB0aGlzLl9sb2NhdGlvbik7XG4vLyAgIH1cbi8vICAgZ2V0IGxvY2F0aW9uKCk6c3RyaW5nIHtcbi8vICAgICByZXR1cm4gdGhpcy5fbG9jYXRpb247XG4vLyAgIH1cblxuLy8gICBnZXQgb2RvbWV0ZXIoKSB7XG4vLyAgICAgcmV0dXJuIHRoaXMuX29kb21ldGVyO1xuLy8gICB9XG4vLyAgIHNldCBvZG9tZXRlcih2YWx1ZSkge1xuLy8gICAgICB0aGlzLl9vZG9tZXRlciA9IE1hdGgucm91bmQoKHZhbHVlLzEwMDApKjEwKS8xMCArICdrbSdcbi8vICAgICAgdGhpcy5ub3RpZnlQcm9wZXJ0eUNoYW5nZSgnb2RvbWV0ZXInLCB0aGlzLl9vZG9tZXRlcik7XG4vLyAgIH1cblxuLy8gICBnZXQgbW90aW9uQWN0aXZpdHkoKTpzdHJpbmcge1xuLy8gICAgIHJldHVybiB0aGlzLl9tb3Rpb25BY3Rpdml0eTtcbi8vICAgfVxuLy8gICBzZXQgbW90aW9uQWN0aXZpdHkoYWN0aXZpdHkpIHtcbi8vICAgICBpZiAodGhpcy5tb3Rpb25BY3Rpdml0eSAhPT0gYWN0aXZpdHkpIHtcbi8vICAgICAgIHRoaXMuX21vdGlvbkFjdGl2aXR5ID0gYWN0aXZpdHk7XG4vLyAgICAgICB0aGlzLm5vdGlmeVByb3BlcnR5Q2hhbmdlKCdtb3Rpb25BY3Rpdml0eScsIGFjdGl2aXR5KTtcbi8vICAgICB9XG4vLyAgIH1cbi8vICAgcHVibGljIEFkZE5vdGlmaWNhdGlvbihfdGl0bGUsIF9ib2R5LCBfaWQpe1xuLy8gICAgIExvY2FsTm90aWZpY2F0aW9ucy5zY2hlZHVsZShbe1xuLy8gICAgICAgICBpZDogX2lkLFxuLy8gICAgICAgICB0aXRsZTogX3RpdGxlLFxuLy8gICAgICAgICBib2R5Ol9ib2R5LFxuLy8gICAgICAgICB0aWNrZXI6IF9ib2R5LFxuLy8gICAgICAgICBiYWRnZTogX2lkLFxuLy8gICAgICAgICBzbWFsbEljb246ICdyZXM6Ly9oZWFydCcsXG4vLyAgICAgICAgIGludGVydmFsOiAnc2Vjb25kJyxcbi8vICAgICAgICAgc291bmQ6IG51bGwvLyxcbi8vICAgICAgICAgLy9hdDogbmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgKyAoMTAgKiAxMDAwKSlcbi8vICAgICAgIH1dKS50aGVuKFxuLy8gICAgICAgICAgIGZ1bmN0aW9uKCkge1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coXCJOb3RpZmljYXRpb24gc2NoZWR1bGVkXCIpO1xuLy8gICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgZnVuY3Rpb24oZXJyb3IpIHtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2NoZWR1bGluZyBlcnJvcjogXCIgKyBlcnJvcik7XG4vLyAgICAgICAgICAgfVxuLy8gICAgICAgKVxuLy8gICAgIH1cbiAgXG4vLyAgIHB1YmxpYyBvbkdldEN1cnJlbnRQb3NpdGlvbigpIHsgICBcbi8vICAgICBCYWNrZ3JvdW5kR2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKChsb2NhdGlvbikgPT4ge1xuLy8gICAgICAgY29uc29sZS5sb2coJ1tqc10gZ2V0Q3VycmVudFBvc2l0aW9uJywgbG9jYXRpb24pO1xuLy8gICAgIH0sIChlcnJvcikgPT4ge1xuLy8gICAgICAgY29uc29sZS53YXJuKCdbanNdIGxvY2F0aW9uIGVycm9yOiAnLCBlcnJvcik7XG4vLyAgICAgICAvL0JHU2VydmljZS5nZXRJbnN0YW5jZSgpLnRvYXN0KCdMb2NhdGlvbiBlcnJvcjogJyArIGVycm9yKTtcbi8vICAgICB9LCB7XG4vLyAgICAgICBzYW1wbGVzOiAzLFxuLy8gICAgICAgcGVyc2lzdDogdHJ1ZVxuLy8gICAgIH0pO1xuLy8gICB9XG4vLyAgIC8vVWkgZXZlbnRzIFxuLy8gICBwcml2YXRlIEFkZEZlbmNlX29uVGFwKClcbi8vICAge1xuLy8gICAgICAgQmFja2dyb3VuZEdlb2xvY2F0aW9uLmFkZEdlb2ZlbmNlcyhbe1xuLy8gICAgICAgICAgICAgICBpZGVudGlmaWVyOiB0aGlzLmdldChcInR4dF9mZW5jZU5hbWVcIiksXG4vLyAgICAgICAgICAgICAgIHJhZGl1czogMTAwLFxuLy8gICAgICAgICAgICAgICBsYXRpdHVkZTogdGhpcy5nZXQoXCJ0eHRfbGF0aXR1ZGVcIiksXG4vLyAgICAgICAgICAgICAgIGxvbmdpdHVkZTogdGhpcy5nZXQoXCJ0eHRfbG9uZ2l0dWRlXCIpLFxuLy8gICAgICAgICAgICAgICBub3RpZnlPbkVudHJ5OiB0cnVlLFxuLy8gICAgICAgICAgICAgICBub3RpZnlPbkV4aXQ6IHRydWUsXG4vLyAgICAgICAgICAgICAgIG5vdGlmeU9uRHdlbGw6IGZhbHNlLFxuLy8gICAgICAgICAgICAgICBsb2l0ZXJpbmdEZWxheTogMzAwMC8vLCAgIC8vIDMwIHNlY29uZHNcbi8vICAgICAgICAgICAgICAgLy8gZXh0cmFzOiB7ICAgICAgICAgICAgICAgIC8vIE9wdGlvbmFsIGFyYml0cmFyeSBtZXRhLWRhdGFcbi8vICAgICAgICAgICAgICAgLy8gICAgIHpvbmVfaWQ6IDEyMzZcbi8vICAgICAgICAgICAgICAgLy8gfVxuLy8gICAgICAgICAgICAgICB9XSwgZnVuY3Rpb24oKSB7XG4vLyAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN1Y2Nlc3NmdWxseSBhZGRlZCBnZW9mZW5jZVwiKTtcbi8vICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbi8vICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkZhaWxlZCB0byBhZGQgZ2VvZmVuY2VcIiwgZXJyb3IpO1xuLy8gICAgICAgfSk7XG4vLyAgIH1cbi8vICAgcHJpdmF0ZSBzZW5kTG9nKG5ld0xvY2F0aW9uOnN0cmluZyl7XG4vLyAgICAgQmFja2dyb3VuZEdlb2xvY2F0aW9uLmVtYWlsTG9nKFwibGd0b21peWFtYUBnbWFpbC5jb21cIik7XG4vLyAgIH1cbi8vICAgcHJpdmF0ZSBHZXRDdXJyZW50TG9jYXRpb25fb25UYXAoKXtcbi8vICAgICAgIHRoaXMuc2V0KFwidHh0X2xvbmdpdHVkZVwiLHRoaXMuZ2V0KFwibGJsX2xvbmdpdHVkZVwiKSk7XG4vLyAgICAgICB0aGlzLnNldChcInR4dF9sYXRpdHVkZVwiLHRoaXMuZ2V0KFwibGJsX2xhdGl0dWRlXCIpKTtcbi8vICAgfVxuLy8gICAvKipcbi8vICAgKiBFdmVudC1saXN0ZW5lcnNcbi8vICAgKi9cbi8vICAgcHJpdmF0ZSBvbkxvY2F0aW9uKGxvY2F0aW9uOmFueSkge1xuLy8gICAgIGNvbnNvbGUubG9nKCdbZXZlbnRdIGxvY2F0aW9uOiAnLCBsb2NhdGlvbik7XG4vLyAgICAgdGhpcy5sb2NhdGlvbiA9IEpTT04uc3RyaW5naWZ5KGxvY2F0aW9uLCBudWxsLCAyKTtcbi8vICAgICB0aGlzLmxibF9sYXRpdHVkZSA9IGxvY2F0aW9uLmNvb3Jkcy5sYXRpdHVkZTtcbi8vICAgICB0aGlzLmxibF9sb25naXR1ZGUgPSBsb2NhdGlvbi5jb29yZHMubG9uZ2l0dWRlO1xuLy8gICAgIGNvbnNvbGUubG9nKCdbZXZlbnRdIGxibF9sYXRpdHVkZTogJywgdGhpcy5sYmxfbG9uZ2l0dWRlKTtcbi8vICAgICBjb25zb2xlLmxvZygnW2V2ZW50XSBsYmxfbG9uZ2l0dWRlOiAnLCB0aGlzLmxibF9sYXRpdHVkZSk7XG4vLyAgICAgdGhpcy5vZG9tZXRlciA9IGxvY2F0aW9uLm9kb21ldGVyO1xuLy8gICAgIHRoaXMuQWRkTm90aWZpY2F0aW9uKFwib25Mb2NhdGlvblwiLCBcIkxhdGl0dWRlOiBcIiArIGxvY2F0aW9uLmNvb3Jkcy5sYXRpdHVkZSArIFwiIExvbmdpdHVkZTogXCIgKyBsb2NhdGlvbi5jb29yZHMubG9uZ2l0dWRlLDEpO1xuICAgIFxuLy8gICAgIEJhY2tncm91bmRHZW9sb2NhdGlvbi5sb2dnZXIubm90aWNlKCdMb2NhdGlvbiByZWNlaXZlZCBpbiBjbGllbnQnKTtcblxuLy8gICB9XG5cbi8vICAgcHJpdmF0ZSBvbk1vdGlvbkNoYW5nZShpc01vdmluZzpib29sZWFuLCBsb2NhdGlvbjphbnkpIHtcbi8vICAgICBjb25zb2xlLmxvZygnW2V2ZW50XSBtb3Rpb25jaGFuZ2U6ICcsIGlzTW92aW5nLCBsb2NhdGlvbik7XG5cbi8vICAgICB0aGlzLmlzTW92aW5nID0gaXNNb3Zpbmc7XG4vLyAgIH1cblxuLy8gICBwcml2YXRlIG9uQWN0aXZpdHlDaGFuZ2UoZXZlbnQ6YW55KSB7XG4vLyAgICAgY29uc29sZS5sb2coJ1tldmVudF0gYWN0aXZpdHljaGFuZ2U6ICcsIGV2ZW50LmFjdGl2aXR5LCBldmVudC5jb25maWRlbmNlKTtcbi8vICAgICAvL3RoaXMuQWRkTm90aWZpY2F0aW9uKFwiQWN0aXZpdHlcIiwgIHRoaXMubGJsX2xhdGl0dWRlICsgXCJ8XCIgKyB0aGlzLmxibF9sb25naXR1ZGUgKyBcInxcIiArIGV2ZW50LmNvbmZpZGVuY2UsIDQpXG4vLyAgICAgdGhpcy5tb3Rpb25BY3Rpdml0eSA9IGV2ZW50LmFjdGl2aXR5O1xuLy8gICB9XG5cbi8vICAgcHJpdmF0ZSBvblByb3ZpZGVyQ2hhbmdlKHByb3ZpZGVyOmFueSkge1xuLy8gICAgIGNvbnNvbGUubG9nKCdbZXZlbnRdIHByb3ZpZGVyY2hhbmdlOiAnLCBwcm92aWRlcik7XG4vLyAgIH1cblxuLy8gICBwcml2YXRlIG9uR2VvZmVuY2UoZ2VvZmVuY2U6YW55KSB7XG4vLyAgICAvLyBjb25zb2xlLmxvZygnW2V2ZW50XSBnZW9mZW5jZScsIGdlb2ZlbmNlKTtcbi8vICAgICB2YXIgaWRlbnRpZmllciAgPSBnZW9mZW5jZS5pZGVudGlmaWVyO1xuLy8gICAgIHZhciBhY3Rpb24gICAgICA9IGdlb2ZlbmNlLmFjdGlvbjtcbi8vICAgICBjb25zb2xlLmxvZyhhY3Rpb24rJyBBIGdlb2ZlbmNlIGhhcyBiZWVuIGNyb3NzZWQ6ICcrIGlkZW50aWZpZXIpO1xuLy8gICAgIGNvbnNvbGUubG9nKCdFTlRFUiBvciBFWElUPzogJywgYWN0aW9uKTtcbi8vICAgICBjb25zb2xlLmxvZygnZ2VvZmVuY2U6ICcsIEpTT04uc3RyaW5naWZ5KGdlb2ZlbmNlKSk7XG4vLyAgICAgdGhpcy5BZGROb3RpZmljYXRpb24oJ0EgZ2VvZmVuY2UgaGFzIGJlZW4gY3Jvc3NlZDonLCAgYWN0aW9uKycgZnJvbSBnZW9mZW5jZTogJytpZGVudGlmaWVyLDIpO1xuLy8gICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIik7XG4vLyAgIH1cblxuLy8gICBwcml2YXRlIG9uR2VvZmVuY2VzQ2hhbmdlKGV2ZW50OmFueSkge1xuLy8gICAgIGNvbnNvbGUubG9nKCdbZXZlbnRdIGdlb2ZlbmNlc2NoYW5nZSBPTjonLCBKU09OLnN0cmluZ2lmeShldmVudC5vbiksICcsIE9GRjonLCBKU09OLnN0cmluZ2lmeShldmVudC5vZmYpKTtcbi8vICAgfVxuXG4vLyAgIHByaXZhdGUgb25IdHRwKHJlc3BvbnNlOmFueSkge1xuLy8gICAgIGNvbnNvbGUubG9nKCdbZXZlbnRdIGh0dHA6ICcsIHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2UucmVzcG9uc2VUZXh0KTtcbi8vICAgfVxuXG4vLyAgIHByaXZhdGUgb25IZWFydGJlYXQoZXZlbnQ6YW55KSB7XG4vLyAgICAgY29uc29sZS5sb2coJ1tldmVudF0gaGVhcnRiZWF0JywgZXZlbnQpO1xuXG4vLyAgICAgLy9jb25zb2xlLmxvZygnLSBoZWFydGJlYXQgZXZlbnQgcmVjZWl2ZWQnKTtcbi8vICAgICAvLyBCYWNrZ3JvdW5kR2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKGZ1bmN0aW9uKGxvY2F0aW9uKSB7XG4vLyAgICAgLy8gICAgIGlmIChsb2NhdGlvbiAhPSBudWxsKXtcbi8vICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKCctIEN1cnJlbnQgcG9zaXRpb24gcmVjZWl2ZWQ6ICcsIGxvY2F0aW9uKTtcbi8vICAgICAvLyAgICAgfVxuLy8gICAgIC8vIH0sIGZ1bmN0aW9uKGVycm9yQ29kZSkge1xuLy8gICAgIC8vICAgICB0aGlzLkFkZE5vdGlmaWNhdGlvbignb25IZWFydEJlYXRbZXJyb3JdJyxcImVycm9yXCIsNSk7XG4vLyAgICAgLy8gfSwge1xuLy8gICAgIC8vICAgICB0aW1lb3V0OiAzMCwgICAgICAvLyAzMCBzZWNvbmQgdGltZW91dCB0byBmZXRjaCBsb2NhdGlvblxuLy8gICAgIC8vICAgICBtYXhpbXVtQWdlOiA1MDAwLCAvLyBBY2NlcHQgdGhlIGxhc3Qta25vd24tbG9jYXRpb24gaWYgbm90IG9sZGVyIHRoYW4gNTAwMCBtcy5cbi8vICAgICAvLyAgICAgZGVzaXJlZEFjY3VyYWN5OiAxMCwgIC8vIFRyeSB0byBmZXRjaCBhIGxvY2F0aW9uIHdpdGggYW4gYWNjdXJhY3kgb2YgYDEwYCBtZXRlcnMuXG4vLyAgICAgLy8gICAgIHNhbXBsZXM6IDMsICAgLy8gSG93IG1hbnkgbG9jYXRpb24gc2FtcGxlcyB0byBhdHRlbXB0LlxuLy8gICAgIC8vICAgICBleHRyYXM6IHsgICAgICAgICAvLyBbT3B0aW9uYWxdIEF0dGFjaCB5b3VyIG93biBjdXN0b20gYG1ldGFEYXRhYCB0byB0aGlzIGxvY2F0aW9uLiAgVGhpcyBtZXRhRGF0YSB3aWxsIGJlIHBlcnNpc3RlZCB0byBTUUxpdGUgYW5kIFBPU1RlZCB0byB5b3VyIHNlcnZlclxuLy8gICAgIC8vICAgICBmb286IFwiYmFyXCIgIFxuLy8gICAgIC8vICAgICB9XG4vLyAgICAgLy8gfSk7XG5cbi8vICAgfVxuXG4vLyAgIHByaXZhdGUgb25TY2hlZHVsZShzdGF0ZTphbnkpIHtcbi8vICAgICBjb25zb2xlLmxvZygnW2V2ZW50XSBzY2hlZHVsZTogJywgc3RhdGUuZW5hYmxlZCk7XG4vLyAgIH1cblxuLy8gICBwcml2YXRlIG9uUG93ZXJTYXZlQ2hhbmdlKGlzUG93ZXJTYXZlTW9kZTpib29sZWFuKSB7XG4vLyAgICAgY29uc29sZS5sb2coJ1tldmVudF0gcG93ZXJzYXZlY2hhbmdlOiAnLCBpc1Bvd2VyU2F2ZU1vZGUpO1xuLy8gICAgIHRoaXMuaXNQb3dlclNhdmVNb2RlID0gaXNQb3dlclNhdmVNb2RlO1xuLy8gICB9XG4vLyB9XG4vLyBleHBvcnQgZGVmYXVsdCBjcmVhdGVWaWV3TW9kZWw7XG4iXX0=