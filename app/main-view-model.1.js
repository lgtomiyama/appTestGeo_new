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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLjEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYWluLXZpZXctbW9kZWwuMS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw4Q0FBOEM7QUFDOUMseUNBQXlDO0FBQ3pDLHlDQUF5QztBQUN6QyxnRkFBZ0Y7QUFDaEYsaUVBQWlFO0FBQ2pFLDBFQUEwRTtBQUMxRSwrQ0FBK0M7QUFDL0MsdURBQXVEO0FBRXZELDJDQUEyQztBQUMzQyw2Q0FBNkM7QUFDN0MsNENBQTRDO0FBQzVDLDJCQUEyQjtBQUMzQixpQ0FBaUM7QUFDakMsc0JBQXNCO0FBQ3RCLG1CQUFtQjtBQUNuQix1REFBdUQ7QUFDdkQsa0NBQWtDO0FBQ2xDLDZEQUE2RDtBQUM3RCxnQkFBZ0I7QUFDaEIsYUFBYTtBQUNiLDRDQUE0QztBQUM1Qyw0QkFBNEI7QUFDNUIsa0NBQWtDO0FBQ2xDLG9DQUFvQztBQUNwQyxrQ0FBa0M7QUFDbEMsOENBQThDO0FBQzlDLHFDQUFxQztBQUNyQyw2QkFBNkI7QUFDN0IsOEJBQThCO0FBQzlCLHdDQUF3QztBQUN4QyxxREFBcUQ7QUFDckQsb0JBQW9CO0FBQ3BCLGtCQUFrQjtBQUNsQiw0RUFBNEU7QUFDNUUsb0ZBQW9GO0FBQ3BGLDhFQUE4RTtBQUM5RSxnRkFBZ0Y7QUFDaEYseUNBQXlDO0FBQ3pDLFFBQVE7QUFDUixpRUFBaUU7QUFDakUseUNBQXlDO0FBQ3pDLGlDQUFpQztBQUNqQywrREFBK0Q7QUFDL0QsNkRBQTZEO0FBQzdELHNJQUFzSTtBQUN0SSxZQUFZO0FBQ1osUUFBUTtBQUNSLDhEQUE4RDtBQUM5RCxRQUFRO0FBQ1IsaUNBQWlDO0FBQ2pDLHlFQUF5RTtBQUN6RSxZQUFZO0FBQ1osUUFBUTtBQUNSLDBDQUEwQztBQUMxQyxpQ0FBaUM7QUFDakMsbURBQW1EO0FBQ25ELHFEQUFxRDtBQUNyRCxpREFBaUQ7QUFDakQsZ0ZBQWdGO0FBQ2hGLHVEQUF1RDtBQUN2RCxtRUFBbUU7QUFDbkUsOEdBQThHO0FBQzlHLHFFQUFxRTtBQUNyRSxZQUFZO0FBQ1osUUFBUTtBQUNSLG9DQUFvQztBQUNwQyxxREFBcUQ7QUFDckQsd0VBQXdFO0FBQ3hFLHFDQUFxQztBQUNyQywwRUFBMEU7QUFDMUUsZ0JBQWdCO0FBQ2hCLG1DQUFtQztBQUNuQyxvRUFBb0U7QUFDcEUsZUFBZTtBQUNmLHVFQUF1RTtBQUN2RSw2RkFBNkY7QUFDN0YsZ0dBQWdHO0FBQ2hHLHFFQUFxRTtBQUNyRSx1S0FBdUs7QUFDdkssMkJBQTJCO0FBQzNCLGdCQUFnQjtBQUNoQixjQUFjO0FBQ2QsUUFBUTtBQUNSLGdEQUFnRDtBQUNoRCwrQkFBK0I7QUFDL0IsUUFBUTtBQUNSLGdEQUFnRDtBQUNoRCx5REFBeUQ7QUFDekQsK0JBQStCO0FBQy9CLHNEQUFzRDtBQUN0RCx3REFBd0Q7QUFDeEQsdUNBQXVDO0FBQ3ZDLHNDQUFzQztBQUN0Qyx3Q0FBd0M7QUFDeEMseURBQXlEO0FBQ3pELDJFQUEyRTtBQUMzRSxvQ0FBb0M7QUFDcEMsb0JBQW9CO0FBQ3BCLG1DQUFtQztBQUNuQyxrRUFBa0U7QUFDbEUsdUNBQXVDO0FBQ3ZDLHFFQUFxRTtBQUNyRSxjQUFjO0FBQ2QsUUFBUTtBQUVSLDBDQUEwQztBQUMxQywrREFBK0Q7QUFDL0QsNkRBQTZEO0FBQzdELFFBQVE7QUFDUiwyQ0FBMkM7QUFDM0Msd0VBQXdFO0FBQ3hFLHNFQUFzRTtBQUN0RSxxQ0FBcUM7QUFDckMsdUVBQXVFO0FBQ3ZFLGlCQUFpQjtBQUNqQix1RUFBdUU7QUFDdkUsNkZBQTZGO0FBQzdGLGdHQUFnRztBQUNoRyxxRUFBcUU7QUFDckUsdUtBQXVLO0FBQ3ZLLDZCQUE2QjtBQUM3QixnQkFBZ0I7QUFDaEIsZ0JBQWdCO0FBQ2hCLFFBQVE7QUFDUiwwQ0FBMEM7QUFDMUMsbURBQW1EO0FBQ25ELHlDQUF5QztBQUN6Qyx1QkFBdUI7QUFDdkIsNkJBQTZCO0FBQzdCLDBCQUEwQjtBQUMxQixvQ0FBb0M7QUFDcEMsMEJBQTBCO0FBQzFCLHdDQUF3QztBQUN4QyxrQ0FBa0M7QUFDbEMsK0RBQStEO0FBQy9ELHNCQUFzQjtBQUN0Qiw2QkFBNkI7QUFDN0IseURBQXlEO0FBQ3pELG1CQUFtQjtBQUNuQixrQ0FBa0M7QUFDbEMsNkRBQTZEO0FBQzdELGtCQUFrQjtBQUNsQixjQUFjO0FBQ2QsUUFBUTtBQUNSLCtDQUErQztBQUMvQyx5REFBeUQ7QUFDekQsaUNBQWlDO0FBQ2pDLFFBQVE7QUFDUixJQUFJO0FBQ0osa0NBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xuLy8gaW1wb3J0IFBsYXRmb3JtID0gcmVxdWlyZSgncGxhdGZvcm0nKTtcbi8vIGltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcbi8vIGltcG9ydCB7QmFja2dyb3VuZEdlb2xvY2F0aW9ufSBmcm9tIFwibmF0aXZlc2NyaXB0LWJhY2tncm91bmQtZ2VvbG9jYXRpb24tbHRcIjtcbi8vIGltcG9ydCB7QmFja2dyb3VuZEZldGNofSBmcm9tIFwibmF0aXZlc2NyaXB0LWJhY2tncm91bmQtZmV0Y2hcIjtcbi8vIGltcG9ydCAqIGFzIExvY2FsTm90aWZpY2F0aW9ucyBmcm9tIFwibmF0aXZlc2NyaXB0LWxvY2FsLW5vdGlmaWNhdGlvbnNcIjtcbi8vIGltcG9ydCAqIGFzIFRvYXN0IGZyb20gJ25hdGl2ZXNjcmlwdC10b2FzdCc7XG4vLyBpbXBvcnQgeyBCb3JkZXIgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9ib3JkZXJcIjtcblxuLy8gaW1wb3J0IEJHU2VydmljZSBmcm9tIFwiLi9saWIvQkdTZXJ2aWNlXCI7XG4vLyBpbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xuLy8gY2xhc3MgY3JlYXRlVmlld01vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZXtcbi8vICAgICBwcml2YXRlIF9zdGF0ZTogYW55O1xuLy8gICAgIHByaXZhdGUgbG9jYXRpb25zOiBzdHJpbmc7XG4vLyAgICAgY29uc3RydWN0b3IoKSB7XG4vLyAgICAgICAgIHN1cGVyKCk7XG4vLyAgICAgICAgIExvY2FsTm90aWZpY2F0aW9ucy5yZXF1ZXN0UGVybWlzc2lvbigpLnRoZW4oXG4vLyAgICAgICAgICAgICBmdW5jdGlvbihncmFudGVkKSB7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBlcm1pc3Npb24gZ3JhbnRlZD8gXCIgKyBncmFudGVkKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgKTtcbi8vICAgICAgICAgQmFja2dyb3VuZEdlb2xvY2F0aW9uLmNvbmZpZ3VyZSh7XG4vLyAgICAgICAgICAgICBkZWJ1ZzogZmFsc2UsXG4vLyAgICAgICAgICAgICBkZXNpcmVkQWNjdXJhY3k6IDAsXG4vLyAgICAgICAgICAgICBzdGF0aW9uYXJ5UmFkaXVzOiAyNSxcbi8vICAgICAgICAgICAgIGRpc3RhbmNlRmlsdGVyOiAxMCxcbi8vICAgICAgICAgICAgIGFjdGl2aXR5UmVjb2duaXRpb25JbnRlcnZhbDogMCxcbi8vICAgICAgICAgICAgIGhlYXJ0YmVhdEludGVydmFsOiAzMCxcbi8vICAgICAgICAgICAgIGF1dG9TeW5jOiB0cnVlXG4vLyAgICAgICAgICAgICB9LCAoc3RhdGUpID0+IHtcbi8vICAgICAgICAgICAgICAgICBpZiAoIXN0YXRlLmVuYWJsZWQpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgQmFja2dyb3VuZEdlb2xvY2F0aW9uLnN0YXJ0KCk7XG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIEJhY2tncm91bmRHZW9sb2NhdGlvbi5vbihcImxvY2F0aW9uXCIsIHRoaXMub25Mb2NhdGlvbi5iaW5kKHRoaXMpKTtcbi8vICAgICAgICAgQmFja2dyb3VuZEdlb2xvY2F0aW9uLm9uKFwibW90aW9uY2hhbmdlXCIsIHRoaXMub25Nb3Rpb25DaGFuZ2UuYmluZCh0aGlzKSk7XG4vLyAgICAgICAgIEJhY2tncm91bmRHZW9sb2NhdGlvbi5vbignaGVhcnRiZWF0JywgdGhpcy5vbkhlYXJ0QmVhdC5iaW5kKHRoaXMpKTtcbi8vICAgICAgICAgQmFja2dyb3VuZEdlb2xvY2F0aW9uLm9uKFwiZ2VvZmVuY2VcIiwgdGhpcy5HZW9mZW5jZUNoYW5nZS5iaW5kKHRoaXMpKTtcbi8vICAgICAgICAgQmFja2dyb3VuZEdlb2xvY2F0aW9uLnN0YXJ0KCk7XG4vLyAgICAgfVxuLy8gICAgIC8vLy8vLy8vLy8vLy8vQmFja2dyb3VuZCBHZW8gTG9jYXRpb24gZXZlbnRzLy8vLy8vLy8vLy8vLy9cbi8vICAgICBwcml2YXRlIG9uTG9jYXRpb24obG9jYXRpb246YW55KSB7XG4vLyAgICAgICAgIGlmIChsb2NhdGlvbiAhPSBudWxsKXtcbi8vICAgICAgICAgdGhpcy5zZXQoXCJsYmxfbG9uZ2l0dWRlXCIsbG9jYXRpb24uY29vcmRzLmxvbmdpdHVkZSk7XG4vLyAgICAgICAgIHRoaXMuc2V0KFwibGJsX2xhdGl0dWRlXCIsbG9jYXRpb24uY29vcmRzLmxhdGl0dWRlKTtcbi8vICAgICAgICAgdGhpcy5BZGROb3RpZmljYXRpb24oXCJvbkxvY2F0aW9uXCIsIFwiTGF0aXR1ZGU6IFwiICsgbG9jYXRpb24uY29vcmRzLmxhdGl0dWRlICsgXCIgTG9uZ2l0dWRlOiBcIiArIGxvY2F0aW9uLmNvb3Jkcy5sb25naXR1ZGUsMSk7XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vLyAgICAgcHJpdmF0ZSBvbk1vdGlvbkNoYW5nZShpc01vdmluZzpib29sZWFuLCBsb2NhdGlvbjphbnkpIFxuLy8gICAgIHtcbi8vICAgICAgICAgaWYgKGxvY2F0aW9uICE9IG51bGwpe1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coJ1tldmVudF0gbW90aW9uY2hhbmdlOiAnLCBpc01vdmluZywgbG9jYXRpb24pO1xuLy8gICAgICAgICB9XG4vLyAgICAgfVxuLy8gICAgIHByaXZhdGUgR2VvZmVuY2VDaGFuZ2UgKGdlb2ZlbmNlKSB7XG4vLyAgICAgICAgIGlmIChsb2NhdGlvbiAhPSBudWxsKXtcbi8vICAgICAgICAgICAgIHZhciBsb2NhdGlvbiAgICA9IGdlb2ZlbmNlLmxvY2F0aW9uO1xuLy8gICAgICAgICAgICAgdmFyIGlkZW50aWZpZXIgID0gZ2VvZmVuY2UuaWRlbnRpZmllcjtcbi8vICAgICAgICAgICAgIHZhciBhY3Rpb24gICAgICA9IGdlb2ZlbmNlLmFjdGlvbjtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFjdGlvbisnIEEgZ2VvZmVuY2UgaGFzIGJlZW4gY3Jvc3NlZDogJysgaWRlbnRpZmllcik7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZygnRU5URVIgb3IgRVhJVD86ICcsIGFjdGlvbik7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZygnZ2VvZmVuY2U6ICcsIEpTT04uc3RyaW5naWZ5KGdlb2ZlbmNlKSk7XG4vLyAgICAgICAgICAgICB0aGlzLkFkZE5vdGlmaWNhdGlvbignQSBnZW9mZW5jZSBoYXMgYmVlbiBjcm9zc2VkOicsICBhY3Rpb24rJyBmcm9tIGdlb2ZlbmNlOiAnKyBpZGVudGlmaWVyLDIpO1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vICAgICBwcml2YXRlIG9uSGVhcnRCZWF0KHBhcmFtcykge1xuLy8gICAgICAgICBjb25zb2xlLmxvZygnLSBoZWFydGJlYXQgZXZlbnQgcmVjZWl2ZWQnKTtcbi8vICAgICAgICAgQmFja2dyb3VuZEdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihmdW5jdGlvbihsb2NhdGlvbikge1xuLy8gICAgICAgICAgICAgaWYgKGxvY2F0aW9uICE9IG51bGwpe1xuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCctIEN1cnJlbnQgcG9zaXRpb24gcmVjZWl2ZWQ6ICcsIGxvY2F0aW9uKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3JDb2RlKSB7XG4vLyAgICAgICAgICAgICB0aGlzLkFkZE5vdGlmaWNhdGlvbignb25IZWFydEJlYXRbZXJyb3JdJyxcImVycm9yXCIsNSk7XG4vLyAgICAgICAgIH0sIHtcbi8vICAgICAgICAgICAgIHRpbWVvdXQ6IDMwLCAgICAgIC8vIDMwIHNlY29uZCB0aW1lb3V0IHRvIGZldGNoIGxvY2F0aW9uXG4vLyAgICAgICAgICAgICBtYXhpbXVtQWdlOiA1MDAwLCAvLyBBY2NlcHQgdGhlIGxhc3Qta25vd24tbG9jYXRpb24gaWYgbm90IG9sZGVyIHRoYW4gNTAwMCBtcy5cbi8vICAgICAgICAgICAgIGRlc2lyZWRBY2N1cmFjeTogMTAsICAvLyBUcnkgdG8gZmV0Y2ggYSBsb2NhdGlvbiB3aXRoIGFuIGFjY3VyYWN5IG9mIGAxMGAgbWV0ZXJzLlxuLy8gICAgICAgICAgICAgc2FtcGxlczogMywgICAvLyBIb3cgbWFueSBsb2NhdGlvbiBzYW1wbGVzIHRvIGF0dGVtcHQuXG4vLyAgICAgICAgICAgICBleHRyYXM6IHsgICAgICAgICAvLyBbT3B0aW9uYWxdIEF0dGFjaCB5b3VyIG93biBjdXN0b20gYG1ldGFEYXRhYCB0byB0aGlzIGxvY2F0aW9uLiAgVGhpcyBtZXRhRGF0YSB3aWxsIGJlIHBlcnNpc3RlZCB0byBTUUxpdGUgYW5kIFBPU1RlZCB0byB5b3VyIHNlcnZlclxuLy8gICAgICAgICAgICAgZm9vOiBcImJhclwiICBcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSk7XG4vLyAgICAgfVxuLy8gICAgIC8vLy8vLy8vLy8vLy8vU2NyZWVuIGV2ZW50cy8vLy8vLy8vLy8vLy8vXG4vLyAgICAgcHJpdmF0ZSBBZGRGZW5jZV9vblRhcCgpXG4vLyAgICAge1xuLy8gICAgICAgICBCYWNrZ3JvdW5kR2VvbG9jYXRpb24uYWRkR2VvZmVuY2VzKFt7XG4vLyAgICAgICAgICAgICAgICAgaWRlbnRpZmllcjogdGhpcy5nZXQoXCJ0eHRfZmVuY2VOYW1lXCIpLFxuLy8gICAgICAgICAgICAgICAgIHJhZGl1czogMTAwLFxuLy8gICAgICAgICAgICAgICAgIGxhdGl0dWRlOiB0aGlzLmdldChcInR4dF9sYXRpdHVkZVwiKSxcbi8vICAgICAgICAgICAgICAgICBsb25naXR1ZGU6IHRoaXMuZ2V0KFwidHh0X2xvbmdpdHVkZVwiKSxcbi8vICAgICAgICAgICAgICAgICBub3RpZnlPbkVudHJ5OiB0cnVlLFxuLy8gICAgICAgICAgICAgICAgIG5vdGlmeU9uRXhpdDogdHJ1ZSxcbi8vICAgICAgICAgICAgICAgICBub3RpZnlPbkR3ZWxsOiBmYWxzZSxcbi8vICAgICAgICAgICAgICAgICBsb2l0ZXJpbmdEZWxheTogMzAwMDAsICAgLy8gMzAgc2Vjb25kc1xuLy8gICAgICAgICAgICAgICAgIGV4dHJhczogeyAgICAgICAgICAgICAgICAvLyBPcHRpb25hbCBhcmJpdHJhcnkgbWV0YS1kYXRhXG4vLyAgICAgICAgICAgICAgICAgICAgIHpvbmVfaWQ6IDEyMzZcbi8vICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgfV0sIGZ1bmN0aW9uKCkge1xuLy8gICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN1Y2Nlc3NmdWxseSBhZGRlZCBnZW9mZW5jZVwiKTtcbi8vICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuLy8gICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJGYWlsZWQgdG8gYWRkIGdlb2ZlbmNlXCIsIGVycm9yKTtcbi8vICAgICAgICAgfSk7XG4vLyAgICAgfVxuICAgIFxuLy8gICAgIHByaXZhdGUgR2V0Q3VycmVudExvY2F0aW9uX29uVGFwKCl7XG4vLyAgICAgICAgIHRoaXMuc2V0KFwidHh0X2xvbmdpdHVkZVwiLHRoaXMuZ2V0KFwibGJsX2xvbmdpdHVkZVwiKSk7XG4vLyAgICAgICAgIHRoaXMuc2V0KFwidHh0X2xhdGl0dWRlXCIsdGhpcy5nZXQoXCJsYmxfbGF0aXR1ZGVcIikpO1xuLy8gICAgIH1cbi8vICAgICBwcml2YXRlIHNlbmRMb2cobmV3TG9jYXRpb246c3RyaW5nKXtcbi8vICAgICAgICAgQmFja2dyb3VuZEdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihmdW5jdGlvbihsb2NhdGlvbikge1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coJy0gQ3VycmVudCBwb3NpdGlvbiByZWNlaXZlZDogJywgbG9jYXRpb24pO1xuLy8gICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yQ29kZSkge1xuLy8gICAgICAgICAgICAgICB0aGlzLkFkZE5vdGlmaWNhdGlvbihcIm9uSGVhcnRCZWF0W2Vycm9yXVwiLCBcImVycm9yXCIsNSk7XG4vLyAgICAgICAgICAgfSwge1xuLy8gICAgICAgICAgICAgdGltZW91dDogMzAsICAgICAgLy8gMzAgc2Vjb25kIHRpbWVvdXQgdG8gZmV0Y2ggbG9jYXRpb25cbi8vICAgICAgICAgICAgIG1heGltdW1BZ2U6IDEwMDAsIC8vIEFjY2VwdCB0aGUgbGFzdC1rbm93bi1sb2NhdGlvbiBpZiBub3Qgb2xkZXIgdGhhbiA1MDAwIG1zLlxuLy8gICAgICAgICAgICAgZGVzaXJlZEFjY3VyYWN5OiAxMCwgIC8vIFRyeSB0byBmZXRjaCBhIGxvY2F0aW9uIHdpdGggYW4gYWNjdXJhY3kgb2YgYDEwYCBtZXRlcnMuXG4vLyAgICAgICAgICAgICBzYW1wbGVzOiAzLCAgIC8vIEhvdyBtYW55IGxvY2F0aW9uIHNhbXBsZXMgdG8gYXR0ZW1wdC5cbi8vICAgICAgICAgICAgIGV4dHJhczogeyAgICAgICAgIC8vIFtPcHRpb25hbF0gQXR0YWNoIHlvdXIgb3duIGN1c3RvbSBgbWV0YURhdGFgIHRvIHRoaXMgbG9jYXRpb24uICBUaGlzIG1ldGFEYXRhIHdpbGwgYmUgcGVyc2lzdGVkIHRvIFNRTGl0ZSBhbmQgUE9TVGVkIHRvIHlvdXIgc2VydmVyXG4vLyAgICAgICAgICAgICAgIGZvbzogXCJiYXJcIiAgXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgfSk7XG4vLyAgICAgfVxuLy8gICAgIC8vLy8vLy8vLy8vLy8vTWV0aG9kcy8vLy8vLy8vLy8vLy8vXG4vLyAgICAgcHJpdmF0ZSBBZGROb3RpZmljYXRpb24oX3RpdGxlLCBfYm9keSwgX2lkKXtcbi8vICAgICAgICAgTG9jYWxOb3RpZmljYXRpb25zLnNjaGVkdWxlKFt7XG4vLyAgICAgICAgICAgICBpZDogX2lkLFxuLy8gICAgICAgICAgICAgdGl0bGU6IF90aXRsZSxcbi8vICAgICAgICAgICAgIGJvZHk6X2JvZHksXG4vLyAgICAgICAgICAgICB0aWNrZXI6ICdUaGUgdGlja2VyJyxcbi8vICAgICAgICAgICAgIGJhZGdlOiBfaWQsXG4vLyAgICAgICAgICAgICBzbWFsbEljb246ICdyZXM6Ly9oZWFydCcsXG4vLyAgICAgICAgICAgICBpbnRlcnZhbDogJ21pbnV0ZScsXG4vLyAgICAgICAgICAgICBhdDogbmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgKyAoMTAgKiAxMDAwKSlcbi8vICAgICAgICAgICB9XSkudGhlbihcbi8vICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJOb3RpZmljYXRpb24gc2NoZWR1bGVkXCIpO1xuLy8gICAgICAgICAgICAgICB9LFxuLy8gICAgICAgICAgICAgICBmdW5jdGlvbihlcnJvcikge1xuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2NoZWR1bGluZyBlcnJvcjogXCIgKyBlcnJvcik7XG4vLyAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICApXG4vLyAgICAgfVxuLy8gICAgIHByaXZhdGUgZ2V0TG9jYXRpb24obmV3TG9jYXRpb246c3RyaW5nKXtcbi8vICAgICAgICAgdGhpcy5sb2NhdGlvbnMgPSBuZXdMb2NhdGlvbiArIHRoaXMubG9jYXRpb25zO1xuLy8gICAgICAgICByZXR1cm4gdGhpcy5sb2NhdGlvbnM7XG4vLyAgICAgfVxuLy8gfVxuLy8gZXhwb3J0IGRlZmF1bHQgY3JlYXRlVmlld01vZGVsO1xuIl19