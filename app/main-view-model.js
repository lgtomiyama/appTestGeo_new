"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var nativescript_background_geolocation_lt_1 = require("nativescript-background-geolocation-lt");
var nativescript_background_fetch_1 = require("nativescript-background-fetch");
var LocalNotifications = require("nativescript-local-notifications");
var BGService_1 = require("./lib/BGService");
var createViewModel = (function (_super) {
    __extends(createViewModel, _super);
    function createViewModel() {
        var _this = _super.call(this) || this;
        _this._mainMenuActivated = false;
        _this.odometer = 0;
        _this.motionActivity = 'unknown';
        // BackgroundFetch.status((status) => {
        //   console.log('- BackgroundFetch status: ', status);
        // });
        // Listen to iOS-only BackgroundFetch events. 
        nativescript_background_fetch_1.BackgroundFetch.configure({ stopOnTerminate: false }, function () {
            console.log('[event] BackgroundFetch');
            nativescript_background_fetch_1.BackgroundFetch.finish(UIBackgroundFetchResult.NewData);
        });
        // Ten optional events to listen to:
        nativescript_background_geolocation_lt_1.BackgroundGeolocation.on("location", _this.onLocation.bind(_this));
        nativescript_background_geolocation_lt_1.BackgroundGeolocation.on("motionchange", _this.onMotionChange.bind(_this));
        nativescript_background_geolocation_lt_1.BackgroundGeolocation.on('http', _this.onHttp.bind(_this));
        nativescript_background_geolocation_lt_1.BackgroundGeolocation.on('providerchange', _this.onProviderChange.bind(_this));
        nativescript_background_geolocation_lt_1.BackgroundGeolocation.on('powersavechange', _this.onPowerSaveChange.bind(_this));
        nativescript_background_geolocation_lt_1.BackgroundGeolocation.on('schedule', _this.onSchedule.bind(_this));
        nativescript_background_geolocation_lt_1.BackgroundGeolocation.on('activitychange', _this.onActivityChange.bind(_this));
        nativescript_background_geolocation_lt_1.BackgroundGeolocation.on('heartbeat', _this.onHeartbeat.bind(_this));
        nativescript_background_geolocation_lt_1.BackgroundGeolocation.on('geofence', _this.onGeofence.bind(_this));
        nativescript_background_geolocation_lt_1.BackgroundGeolocation.on('geofenceschange', _this.onGeofencesChange.bind(_this));
        // Fetch list of available sensors on this device.
        nativescript_background_geolocation_lt_1.BackgroundGeolocation.getSensors(function (sensors) {
            console.log('[js] sensors: ', JSON.stringify(sensors, null, 2));
            //BGService.getInstance().toast('Sensors: ' + JSON.stringify(sensors));
        });
        // Fetch current state of power-save mode.
        nativescript_background_geolocation_lt_1.BackgroundGeolocation.isPowerSaveMode(function (mode) {
            console.log('[js] isPowerSaveMode: ', mode);
            _this.isPowerSaveMode = mode;
        });
        // Fetch current config settings.
        BGService_1.default.getInstance().getConfig(function (config) {
            // Configure BackgroundGeolocation
            config.url = 'http://tracker.transistorsoft.com/locations/transistor-nativescript';
            nativescript_background_geolocation_lt_1.BackgroundGeolocation.configure(config, function (state) {
                console.log('[js] configure success: ', state);
                //this.paceButtonIcon = (state.isMoving) ? ICONS.pause : ICONS.play;
                _this.enabled = true;
                //this.enabled = state.enabled;
            });
        });
        return _this;
    }
    Object.defineProperty(createViewModel.prototype, "users", {
        /**
        * Properties
        */
        get: function () {
            return [{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(createViewModel.prototype, "enabled", {
        get: function () {
            return this._enabled;
        },
        set: function (value) {
            console.log('- setEnabled: ', value);
            this.notifyPropertyChange('enabled', value);
            // this._enabled = value;
            this._enabled = true;
            if (value) {
                nativescript_background_geolocation_lt_1.BackgroundGeolocation.start();
            }
            else {
                nativescript_background_geolocation_lt_1.BackgroundGeolocation.stop();
                this.isMoving = false;
                nativescript_background_geolocation_lt_1.BackgroundGeolocation.stopWatchPosition();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(createViewModel.prototype, "lbl_latitude", {
        get: function () {
            return this._lbl_latitude;
        },
        set: function (v) {
            this.notifyPropertyChange('lbl_latitude', this._lbl_latitude);
            this._lbl_latitude = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(createViewModel.prototype, "lbl_longitude", {
        get: function () {
            this.notifyPropertyChange('lbl_longitude', this._lbl_longitude);
            return this._lbl_longitude;
        },
        set: function (v) {
            this._lbl_longitude = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(createViewModel.prototype, "isMoving", {
        get: function () {
            return this._isMoving;
        },
        set: function (value) {
            this._isMoving = value;
            //this.paceButtonIcon = (this._isMoving === true) ? ICONS.pause : ICONS.play;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(createViewModel.prototype, "isPowerSaveMode", {
        get: function () {
            return this._isPowerSaveMode;
        },
        set: function (value) {
            this._isPowerSaveMode = value;
            this.notifyPropertyChange('isPowerSaveMode', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(createViewModel.prototype, "location", {
        get: function () {
            return this._location;
        },
        set: function (location) {
            this._location = location;
            this.notifyPropertyChange('location', this._location);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(createViewModel.prototype, "odometer", {
        get: function () {
            return this._odometer;
        },
        set: function (value) {
            this._odometer = Math.round((value / 1000) * 10) / 10 + 'km';
            this.notifyPropertyChange('odometer', this._odometer);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(createViewModel.prototype, "motionActivity", {
        get: function () {
            return this._motionActivity;
        },
        set: function (activity) {
            if (this.motionActivity !== activity) {
                this._motionActivity = activity;
                this.notifyPropertyChange('motionActivity', activity);
            }
        },
        enumerable: true,
        configurable: true
    });
    createViewModel.prototype.AddNotification = function (_title, _body, _id) {
        LocalNotifications.schedule([{
                id: _id,
                title: _title,
                body: _body,
                ticker: _body,
                badge: _id,
                smallIcon: 'res://heart',
                interval: 'second',
                sound: null //,
                //at: new Date(new Date().getTime() + (10 * 1000))
            }]).then(function () {
            console.log("Notification scheduled");
        }, function (error) {
            console.log("scheduling error: " + error);
        });
    };
    createViewModel.prototype.onGetCurrentPosition = function () {
        nativescript_background_geolocation_lt_1.BackgroundGeolocation.getCurrentPosition(function (location) {
            console.log('[js] getCurrentPosition', location);
        }, function (error) {
            console.warn('[js] location error: ', error);
            //BGService.getInstance().toast('Location error: ' + error);
        }, {
            samples: 3,
            persist: true
        });
    };
    //Ui events 
    createViewModel.prototype.AddFence_onTap = function () {
        nativescript_background_geolocation_lt_1.BackgroundGeolocation.addGeofences([{
                identifier: this.get("txt_fenceName"),
                radius: 100,
                latitude: this.get("txt_latitude"),
                longitude: this.get("txt_longitude"),
                notifyOnEntry: true,
                notifyOnExit: true,
                notifyOnDwell: false,
                loiteringDelay: 3000 //,   // 30 seconds
                // extras: {                // Optional arbitrary meta-data
                //     zone_id: 1236
                // }
            }], function () {
            console.log("Successfully added geofence");
        }, function (error) {
            console.warn("Failed to add geofence", error);
        });
    };
    createViewModel.prototype.sendLog = function (newLocation) {
        nativescript_background_geolocation_lt_1.BackgroundGeolocation.emailLog("lgtomiyama@gmail.com");
    };
    createViewModel.prototype.GetCurrentLocation_onTap = function () {
        this.set("txt_longitude", this.get("lbl_longitude"));
        this.set("txt_latitude", this.get("lbl_latitude"));
    };
    /**
    * Event-listeners
    */
    createViewModel.prototype.onLocation = function (location) {
        console.log('[event] location: ', location);
        this.location = JSON.stringify(location, null, 2);
        this.lbl_latitude = location.coords.latitude;
        this.lbl_longitude = location.coords.longitude;
        console.log('[event] lbl_latitude: ', this.lbl_longitude);
        console.log('[event] lbl_longitude: ', this.lbl_latitude);
        this.odometer = location.odometer;
        this.AddNotification("onLocation", "Latitude: " + location.coords.latitude + " Longitude: " + location.coords.longitude, 1);
        nativescript_background_geolocation_lt_1.BackgroundGeolocation.logger.notice('Location received in client');
    };
    createViewModel.prototype.onMotionChange = function (isMoving, location) {
        console.log('[event] motionchange: ', isMoving, location);
        this.isMoving = isMoving;
    };
    createViewModel.prototype.onActivityChange = function (event) {
        console.log('[event] activitychange: ', event.activity, event.confidence);
        //this.AddNotification("Activity",  this.lbl_latitude + "|" + this.lbl_longitude + "|" + event.confidence, 4)
        this.motionActivity = event.activity;
    };
    createViewModel.prototype.onProviderChange = function (provider) {
        console.log('[event] providerchange: ', provider);
    };
    createViewModel.prototype.onGeofence = function (geofence) {
        // console.log('[event] geofence', geofence);
        var identifier = geofence.identifier;
        var action = geofence.action;
        console.log(action + ' A geofence has been crossed: ' + identifier);
        console.log('ENTER or EXIT?: ', action);
        console.log('geofence: ', JSON.stringify(geofence));
        this.AddNotification('A geofence has been crossed:', action + ' from geofence: ' + identifier, 2);
        console.log("--------------------------------------");
    };
    createViewModel.prototype.onGeofencesChange = function (event) {
        console.log('[event] geofenceschange ON:', JSON.stringify(event.on), ', OFF:', JSON.stringify(event.off));
    };
    createViewModel.prototype.onHttp = function (response) {
        console.log('[event] http: ', response.status, response.responseText);
    };
    createViewModel.prototype.onHeartbeat = function (event) {
        console.log('[event] heartbeat', event);
        //console.log('- heartbeat event received');
        nativescript_background_geolocation_lt_1.BackgroundGeolocation.getCurrentPosition(function (location) {
            if (location != null) {
                console.log('- Current position received: ', location);
            }
        }, function (errorCode) {
            this.AddNotification('onHeartBeat[error]', "error", 5);
        }, {
            timeout: 30,
            maximumAge: 5000,
            desiredAccuracy: 10,
            samples: 3,
            extras: {
                foo: "bar"
            }
        });
    };
    createViewModel.prototype.onSchedule = function (state) {
        console.log('[event] schedule: ', state.enabled);
    };
    createViewModel.prototype.onPowerSaveChange = function (isPowerSaveMode) {
        console.log('[event] powersavechange: ', isPowerSaveMode);
        this.isPowerSaveMode = isPowerSaveMode;
    };
    return createViewModel;
}(observable_1.Observable));
exports.createViewModel = createViewModel;
exports.default = createViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTJDO0FBRzNDLGlHQUE2RTtBQUM3RSwrRUFBOEQ7QUFDOUQscUVBQXVFO0FBS3ZFLDZDQUF3QztBQUV4QztJQUFxQyxtQ0FBVTtJQWU3QztRQUFBLFlBQ0UsaUJBQU8sU0FpRFI7UUFoREMsS0FBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztRQUNoQyxLQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNsQixLQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQztRQUVoQyx1Q0FBdUM7UUFDdkMsdURBQXVEO1FBQ3ZELE1BQU07UUFDTiw4Q0FBOEM7UUFDOUMsK0NBQWUsQ0FBQyxTQUFTLENBQUMsRUFBQyxlQUFlLEVBQUUsS0FBSyxFQUFDLEVBQUU7WUFDbEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1lBQ3ZDLCtDQUFlLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFELENBQUMsQ0FBQyxDQUFDO1FBRUgsb0NBQW9DO1FBQ3BDLDhEQUFxQixDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQztRQUNqRSw4REFBcUIsQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDLENBQUM7UUFDekUsOERBQXFCLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3pELDhEQUFxQixDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFB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QUNSLEdBQUcsRUFBRSxLQUFLO2FBQ1Q7U0FDSixDQUFDLENBQUM7SUFFTCxDQUFDO0lBRU8sb0NBQVUsR0FBbEIsVUFBbUIsS0FBUztRQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRU8sMkNBQWlCLEdBQXpCLFVBQTBCLGVBQXVCO1FBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7SUFDekMsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0FBQyxBQXhTRCxDQUFxQyx1QkFBVSxHQXdTOUM7QUF4U1ksMENBQWU7QUF5UzVCLGtCQUFlLGVBQWUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcbmltcG9ydCBQbGF0Zm9ybSA9IHJlcXVpcmUoJ3BsYXRmb3JtJyk7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5pbXBvcnQge0JhY2tncm91bmRHZW9sb2NhdGlvbn0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1iYWNrZ3JvdW5kLWdlb2xvY2F0aW9uLWx0XCI7XG5pbXBvcnQge0JhY2tncm91bmRGZXRjaH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1iYWNrZ3JvdW5kLWZldGNoXCI7XG5pbXBvcnQgKiBhcyBMb2NhbE5vdGlmaWNhdGlvbnMgZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2NhbC1ub3RpZmljYXRpb25zXCI7XG5pbXBvcnQgKiBhcyBUb2FzdCBmcm9tICduYXRpdmVzY3JpcHQtdG9hc3QnO1xuaW1wb3J0IHsgQm9yZGVyIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvYm9yZGVyXCI7XG5pbXBvcnQgZnJhbWVzID0gcmVxdWlyZShcInVpL2ZyYW1lXCIpO1xuXG5pbXBvcnQgQkdTZXJ2aWNlIGZyb20gXCIuL2xpYi9CR1NlcnZpY2VcIjtcblxuZXhwb3J0IGNsYXNzIGNyZWF0ZVZpZXdNb2RlbCBleHRlbmRzIE9ic2VydmFibGV7XG5cbiAgcHJpdmF0ZSBfbG9jYXRpb246IHN0cmluZztcbiAgcHJpdmF0ZSBfY291bnRlcjogbnVtYmVyO1xuICBwcml2YXRlIF9tZXNzYWdlOiBzdHJpbmc7XG4gIHByaXZhdGUgX2lzTW92aW5nOiBib29sZWFuO1xuICBwcml2YXRlIF9lbmFibGVkOiBib29sZWFuO1xuICBwcml2YXRlIF9wYWNlQnV0dG9uSWNvbjogc3RyaW5nO1xuICBwcml2YXRlIF9tb3Rpb25BY3Rpdml0eTogc3RyaW5nO1xuICBwcml2YXRlIF9vZG9tZXRlcjogYW55O1xuICBwcml2YXRlIF9tYWluTWVudUFjdGl2YXRlZDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfaXNQb3dlclNhdmVNb2RlOmJvb2xlYW47XG4gIHByaXZhdGUgbG9jYXRpb25zOiBzdHJpbmc7XG4gIHByaXZhdGUgX2xibF9sYXRpdHVkZTogc3RyaW5nO1xuICBwcml2YXRlIF9sYmxfbG9uZ2l0dWRlOiBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fbWFpbk1lbnVBY3RpdmF0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLm9kb21ldGVyID0gMDtcbiAgICB0aGlzLm1vdGlvbkFjdGl2aXR5ID0gJ3Vua25vd24nO1xuXG4gICAgLy8gQmFja2dyb3VuZEZldGNoLnN0YXR1cygoc3RhdHVzKSA9PiB7XG4gICAgLy8gICBjb25zb2xlLmxvZygnLSBCYWNrZ3JvdW5kRmV0Y2ggc3RhdHVzOiAnLCBzdGF0dXMpO1xuICAgIC8vIH0pO1xuICAgIC8vIExpc3RlbiB0byBpT1Mtb25seSBCYWNrZ3JvdW5kRmV0Y2ggZXZlbnRzLiBcbiAgICBCYWNrZ3JvdW5kRmV0Y2guY29uZmlndXJlKHtzdG9wT25UZXJtaW5hdGU6IGZhbHNlfSwgKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ1tldmVudF0gQmFja2dyb3VuZEZldGNoJyk7XG4gICAgICBCYWNrZ3JvdW5kRmV0Y2guZmluaXNoKFVJQmFja2dyb3VuZEZldGNoUmVzdWx0Lk5ld0RhdGEpO1xuICAgIH0pO1xuXG4gICAgLy8gVGVuIG9wdGlvbmFsIGV2ZW50cyB0byBsaXN0ZW4gdG86XG4gICAgQmFja2dyb3VuZEdlb2xvY2F0aW9uLm9uKFwibG9jYXRpb25cIiwgdGhpcy5vbkxvY2F0aW9uLmJpbmQodGhpcykpO1xuICAgIEJhY2tncm91bmRHZW9sb2NhdGlvbi5vbihcIm1vdGlvbmNoYW5nZVwiLCB0aGlzLm9uTW90aW9uQ2hhbmdlLmJpbmQodGhpcykpOyAgICAgIFxuICAgIEJhY2tncm91bmRHZW9sb2NhdGlvbi5vbignaHR0cCcsIHRoaXMub25IdHRwLmJpbmQodGhpcykpO1xuICAgIEJhY2tncm91bmRHZW9sb2NhdGlvbi5vbigncHJvdmlkZXJjaGFuZ2UnLCB0aGlzLm9uUHJvdmlkZXJDaGFuZ2UuYmluZCh0aGlzKSk7XG4gICAgQmFja2dyb3VuZEdlb2xvY2F0aW9uLm9uKCdwb3dlcnNhdmVjaGFuZ2UnLCB0aGlzLm9uUG93ZXJTYXZlQ2hhbmdlLmJpbmQodGhpcykpO1xuICAgIEJhY2tncm91bmRHZW9sb2NhdGlvbi5vbignc2NoZWR1bGUnLCB0aGlzLm9uU2NoZWR1bGUuYmluZCh0aGlzKSk7XG4gICAgQmFja2dyb3VuZEdlb2xvY2F0aW9uLm9uKCdhY3Rpdml0eWNoYW5nZScsIHRoaXMub25BY3Rpdml0eUNoYW5nZS5iaW5kKHRoaXMpKTtcbiAgICBCYWNrZ3JvdW5kR2VvbG9jYXRpb24ub24oJ2hlYXJ0YmVhdCcsIHRoaXMub25IZWFydGJlYXQuYmluZCh0aGlzKSk7XG4gICAgQmFja2dyb3VuZEdlb2xvY2F0aW9uLm9uKCdnZW9mZW5jZScsIHRoaXMub25HZW9mZW5jZS5iaW5kKHRoaXMpKTtcbiAgICBCYWNrZ3JvdW5kR2VvbG9jYXRpb24ub24oJ2dlb2ZlbmNlc2NoYW5nZScsIHRoaXMub25HZW9mZW5jZXNDaGFuZ2UuYmluZCh0aGlzKSk7XG5cbiAgICAvLyBGZXRjaCBsaXN0IG9mIGF2YWlsYWJsZSBzZW5zb3JzIG9uIHRoaXMgZGV2aWNlLlxuICAgIEJhY2tncm91bmRHZW9sb2NhdGlvbi5nZXRTZW5zb3JzKChzZW5zb3JzKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnW2pzXSBzZW5zb3JzOiAnLCBKU09OLnN0cmluZ2lmeShzZW5zb3JzLCBudWxsLCAyKSk7XG4gICAgICAvL0JHU2VydmljZS5nZXRJbnN0YW5jZSgpLnRvYXN0KCdTZW5zb3JzOiAnICsgSlNPTi5zdHJpbmdpZnkoc2Vuc29ycykpO1xuICAgIH0pO1xuICAgIC8vIEZldGNoIGN1cnJlbnQgc3RhdGUgb2YgcG93ZXItc2F2ZSBtb2RlLlxuICAgIEJhY2tncm91bmRHZW9sb2NhdGlvbi5pc1Bvd2VyU2F2ZU1vZGUoKG1vZGUpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdbanNdIGlzUG93ZXJTYXZlTW9kZTogJywgbW9kZSk7XG4gICAgICB0aGlzLmlzUG93ZXJTYXZlTW9kZSA9IG1vZGU7XG4gICAgfSk7XG4gICAgLy8gRmV0Y2ggY3VycmVudCBjb25maWcgc2V0dGluZ3MuXG4gICAgQkdTZXJ2aWNlLmdldEluc3RhbmNlKCkuZ2V0Q29uZmlnKGNvbmZpZyA9PiB7XG4gICAgICAvLyBDb25maWd1cmUgQmFja2dyb3VuZEdlb2xvY2F0aW9uXG4gICAgICBjb25maWcudXJsID0gJ2h0dHA6Ly90cmFja2VyLnRyYW5zaXN0b3Jzb2Z0LmNvbS9sb2NhdGlvbnMvdHJhbnNpc3Rvci1uYXRpdmVzY3JpcHQnO1xuICAgICAgXG4gICAgICBCYWNrZ3JvdW5kR2VvbG9jYXRpb24uY29uZmlndXJlKGNvbmZpZywgKHN0YXRlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdbanNdIGNvbmZpZ3VyZSBzdWNjZXNzOiAnLCBzdGF0ZSk7XG4gICAgICAgIC8vdGhpcy5wYWNlQnV0dG9uSWNvbiA9IChzdGF0ZS5pc01vdmluZykgPyBJQ09OUy5wYXVzZSA6IElDT05TLnBsYXk7XG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XG4gICAgICAgIFxuICAgICAgICAvL3RoaXMuZW5hYmxlZCA9IHN0YXRlLmVuYWJsZWQ7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAqIFByb3BlcnRpZXNcbiAgKi9cbiAgZ2V0IHVzZXJzKCkge1xuICAgIHJldHVybiBbe25hbWU6ICdmb28nfSwge25hbWU6ICdiYXInfSwge25hbWU6ICdiYXonfV07XG4gIH1cblxuICBzZXQgZW5hYmxlZCh2YWx1ZTpib29sZWFuKSB7XG4gICAgY29uc29sZS5sb2coJy0gc2V0RW5hYmxlZDogJywgdmFsdWUpO1xuICAgIHRoaXMubm90aWZ5UHJvcGVydHlDaGFuZ2UoJ2VuYWJsZWQnLCB2YWx1ZSk7XG4gICAgLy8gdGhpcy5fZW5hYmxlZCA9IHZhbHVlO1xuICAgIHRoaXMuX2VuYWJsZWQgPSB0cnVlO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgQmFja2dyb3VuZEdlb2xvY2F0aW9uLnN0YXJ0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIEJhY2tncm91bmRHZW9sb2NhdGlvbi5zdG9wKCk7XG4gICAgICB0aGlzLmlzTW92aW5nID0gZmFsc2U7XG4gICAgICBCYWNrZ3JvdW5kR2VvbG9jYXRpb24uc3RvcFdhdGNoUG9zaXRpb24oKTtcblxuICAgIH1cbiAgfVxuXG5cbnB1YmxpYyBnZXQgbGJsX2xhdGl0dWRlKCkgOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9sYmxfbGF0aXR1ZGU7XG59XG5wdWJsaWMgc2V0IGxibF9sYXRpdHVkZSh2IDogc3RyaW5nKSB7XG4gICAgdGhpcy5ub3RpZnlQcm9wZXJ0eUNoYW5nZSgnbGJsX2xhdGl0dWRlJywgdGhpcy5fbGJsX2xhdGl0dWRlKTtcbiAgICB0aGlzLl9sYmxfbGF0aXR1ZGUgPSB2O1xufVxuXG5cbnB1YmxpYyBnZXQgbGJsX2xvbmdpdHVkZSgpIDogc3RyaW5nIHtcbiAgICB0aGlzLm5vdGlmeVByb3BlcnR5Q2hhbmdlKCdsYmxfbG9uZ2l0dWRlJywgdGhpcy5fbGJsX2xvbmdpdHVkZSk7XG4gICAgcmV0dXJuIHRoaXMuX2xibF9sb25naXR1ZGU7XG59XG5wdWJsaWMgc2V0IGxibF9sb25naXR1ZGUodiA6IHN0cmluZykge1xuICAgIHRoaXMuX2xibF9sb25naXR1ZGUgPSB2O1xufVxuXG5cbiAgZ2V0IGVuYWJsZWQoKTpib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZW5hYmxlZDtcbiAgfVxuXG4gIHNldCBpc01vdmluZyh2YWx1ZTpib29sZWFuKSB7XG4gICAgdGhpcy5faXNNb3ZpbmcgPSB2YWx1ZTtcbiAgICAvL3RoaXMucGFjZUJ1dHRvbkljb24gPSAodGhpcy5faXNNb3ZpbmcgPT09IHRydWUpID8gSUNPTlMucGF1c2UgOiBJQ09OUy5wbGF5O1xuICB9XG5cbiAgZ2V0IGlzTW92aW5nKCk6Ym9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzTW92aW5nO1xuICB9XG5cbiAgZ2V0IGlzUG93ZXJTYXZlTW9kZSgpOmJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc1Bvd2VyU2F2ZU1vZGU7XG4gIH1cbiAgc2V0IGlzUG93ZXJTYXZlTW9kZSh2YWx1ZTpib29sZWFuKSB7XG4gICAgdGhpcy5faXNQb3dlclNhdmVNb2RlID0gdmFsdWU7XG4gICAgdGhpcy5ub3RpZnlQcm9wZXJ0eUNoYW5nZSgnaXNQb3dlclNhdmVNb2RlJywgdmFsdWUpO1xuICB9XG5cbiAgc2V0IGxvY2F0aW9uKGxvY2F0aW9uOnN0cmluZykge1xuICAgIHRoaXMuX2xvY2F0aW9uID0gbG9jYXRpb247XG4gICAgdGhpcy5ub3RpZnlQcm9wZXJ0eUNoYW5nZSgnbG9jYXRpb24nLCB0aGlzLl9sb2NhdGlvbik7XG4gIH1cbiAgZ2V0IGxvY2F0aW9uKCk6c3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbG9jYXRpb247XG4gIH1cblxuICBnZXQgb2RvbWV0ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX29kb21ldGVyO1xuICB9XG4gIHNldCBvZG9tZXRlcih2YWx1ZSkge1xuICAgICB0aGlzLl9vZG9tZXRlciA9IE1hdGgucm91bmQoKHZhbHVlLzEwMDApKjEwKS8xMCArICdrbSdcbiAgICAgdGhpcy5ub3RpZnlQcm9wZXJ0eUNoYW5nZSgnb2RvbWV0ZXInLCB0aGlzLl9vZG9tZXRlcik7XG4gIH1cblxuICBnZXQgbW90aW9uQWN0aXZpdHkoKTpzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9tb3Rpb25BY3Rpdml0eTtcbiAgfVxuICBzZXQgbW90aW9uQWN0aXZpdHkoYWN0aXZpdHkpIHtcbiAgICBpZiAodGhpcy5tb3Rpb25BY3Rpdml0eSAhPT0gYWN0aXZpdHkpIHtcbiAgICAgIHRoaXMuX21vdGlvbkFjdGl2aXR5ID0gYWN0aXZpdHk7XG4gICAgICB0aGlzLm5vdGlmeVByb3BlcnR5Q2hhbmdlKCdtb3Rpb25BY3Rpdml0eScsIGFjdGl2aXR5KTtcbiAgICB9XG4gIH1cbiAgcHVibGljIEFkZE5vdGlmaWNhdGlvbihfdGl0bGUsIF9ib2R5LCBfaWQpe1xuICAgIExvY2FsTm90aWZpY2F0aW9ucy5zY2hlZHVsZShbe1xuICAgICAgICBpZDogX2lkLFxuICAgICAgICB0aXRsZTogX3RpdGxlLFxuICAgICAgICBib2R5Ol9ib2R5LFxuICAgICAgICB0aWNrZXI6IF9ib2R5LFxuICAgICAgICBiYWRnZTogX2lkLFxuICAgICAgICBzbWFsbEljb246ICdyZXM6Ly9oZWFydCcsXG4gICAgICAgIGludGVydmFsOiAnc2Vjb25kJyxcbiAgICAgICAgc291bmQ6IG51bGwvLyxcbiAgICAgICAgLy9hdDogbmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgKyAoMTAgKiAxMDAwKSlcbiAgICAgIH1dKS50aGVuKFxuICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJOb3RpZmljYXRpb24gc2NoZWR1bGVkXCIpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2NoZWR1bGluZyBlcnJvcjogXCIgKyBlcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgKVxuICAgIH1cbiAgXG4gIHB1YmxpYyBvbkdldEN1cnJlbnRQb3NpdGlvbigpIHsgICBcbiAgICBCYWNrZ3JvdW5kR2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKChsb2NhdGlvbikgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ1tqc10gZ2V0Q3VycmVudFBvc2l0aW9uJywgbG9jYXRpb24pO1xuICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS53YXJuKCdbanNdIGxvY2F0aW9uIGVycm9yOiAnLCBlcnJvcik7XG4gICAgICAvL0JHU2VydmljZS5nZXRJbnN0YW5jZSgpLnRvYXN0KCdMb2NhdGlvbiBlcnJvcjogJyArIGVycm9yKTtcbiAgICB9LCB7XG4gICAgICBzYW1wbGVzOiAzLFxuICAgICAgcGVyc2lzdDogdHJ1ZVxuICAgIH0pO1xuICB9XG4gIC8vVWkgZXZlbnRzIFxuICBwcml2YXRlIEFkZEZlbmNlX29uVGFwKClcbiAge1xuICAgICAgQmFja2dyb3VuZEdlb2xvY2F0aW9uLmFkZEdlb2ZlbmNlcyhbe1xuICAgICAgICAgICAgICBpZGVudGlmaWVyOiB0aGlzLmdldChcInR4dF9mZW5jZU5hbWVcIiksXG4gICAgICAgICAgICAgIHJhZGl1czogMTAwLFxuICAgICAgICAgICAgICBsYXRpdHVkZTogdGhpcy5nZXQoXCJ0eHRfbGF0aXR1ZGVcIiksXG4gICAgICAgICAgICAgIGxvbmdpdHVkZTogdGhpcy5nZXQoXCJ0eHRfbG9uZ2l0dWRlXCIpLFxuICAgICAgICAgICAgICBub3RpZnlPbkVudHJ5OiB0cnVlLFxuICAgICAgICAgICAgICBub3RpZnlPbkV4aXQ6IHRydWUsXG4gICAgICAgICAgICAgIG5vdGlmeU9uRHdlbGw6IGZhbHNlLFxuICAgICAgICAgICAgICBsb2l0ZXJpbmdEZWxheTogMzAwMC8vLCAgIC8vIDMwIHNlY29uZHNcbiAgICAgICAgICAgICAgLy8gZXh0cmFzOiB7ICAgICAgICAgICAgICAgIC8vIE9wdGlvbmFsIGFyYml0cmFyeSBtZXRhLWRhdGFcbiAgICAgICAgICAgICAgLy8gICAgIHpvbmVfaWQ6IDEyMzZcbiAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICB9XSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN1Y2Nlc3NmdWxseSBhZGRlZCBnZW9mZW5jZVwiKTtcbiAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkZhaWxlZCB0byBhZGQgZ2VvZmVuY2VcIiwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cbiAgcHJpdmF0ZSBzZW5kTG9nKG5ld0xvY2F0aW9uOnN0cmluZyl7XG4gICAgQmFja2dyb3VuZEdlb2xvY2F0aW9uLmVtYWlsTG9nKFwibGd0b21peWFtYUBnbWFpbC5jb21cIik7XG4gIH1cbiAgcHJpdmF0ZSBHZXRDdXJyZW50TG9jYXRpb25fb25UYXAoKXtcbiAgICAgIHRoaXMuc2V0KFwidHh0X2xvbmdpdHVkZVwiLHRoaXMuZ2V0KFwibGJsX2xvbmdpdHVkZVwiKSk7XG4gICAgICB0aGlzLnNldChcInR4dF9sYXRpdHVkZVwiLHRoaXMuZ2V0KFwibGJsX2xhdGl0dWRlXCIpKTtcbiAgfVxuICAvKipcbiAgKiBFdmVudC1saXN0ZW5lcnNcbiAgKi9cbiAgcHJpdmF0ZSBvbkxvY2F0aW9uKGxvY2F0aW9uOmFueSkge1xuICAgIGNvbnNvbGUubG9nKCdbZXZlbnRdIGxvY2F0aW9uOiAnLCBsb2NhdGlvbik7XG4gICAgdGhpcy5sb2NhdGlvbiA9IEpTT04uc3RyaW5naWZ5KGxvY2F0aW9uLCBudWxsLCAyKTtcbiAgICB0aGlzLmxibF9sYXRpdHVkZSA9IGxvY2F0aW9uLmNvb3Jkcy5sYXRpdHVkZTtcbiAgICB0aGlzLmxibF9sb25naXR1ZGUgPSBsb2NhdGlvbi5jb29yZHMubG9uZ2l0dWRlO1xuICAgIGNvbnNvbGUubG9nKCdbZXZlbnRdIGxibF9sYXRpdHVkZTogJywgdGhpcy5sYmxfbG9uZ2l0dWRlKTtcbiAgICBjb25zb2xlLmxvZygnW2V2ZW50XSBsYmxfbG9uZ2l0dWRlOiAnLCB0aGlzLmxibF9sYXRpdHVkZSk7XG4gICAgdGhpcy5vZG9tZXRlciA9IGxvY2F0aW9uLm9kb21ldGVyO1xuICAgIHRoaXMuQWRkTm90aWZpY2F0aW9uKFwib25Mb2NhdGlvblwiLCBcIkxhdGl0dWRlOiBcIiArIGxvY2F0aW9uLmNvb3Jkcy5sYXRpdHVkZSArIFwiIExvbmdpdHVkZTogXCIgKyBsb2NhdGlvbi5jb29yZHMubG9uZ2l0dWRlLDEpO1xuICAgIFxuICAgIEJhY2tncm91bmRHZW9sb2NhdGlvbi5sb2dnZXIubm90aWNlKCdMb2NhdGlvbiByZWNlaXZlZCBpbiBjbGllbnQnKTtcblxuICB9XG5cbiAgcHJpdmF0ZSBvbk1vdGlvbkNoYW5nZShpc01vdmluZzpib29sZWFuLCBsb2NhdGlvbjphbnkpIHtcbiAgICBjb25zb2xlLmxvZygnW2V2ZW50XSBtb3Rpb25jaGFuZ2U6ICcsIGlzTW92aW5nLCBsb2NhdGlvbik7XG5cbiAgICB0aGlzLmlzTW92aW5nID0gaXNNb3Zpbmc7XG4gIH1cblxuICBwcml2YXRlIG9uQWN0aXZpdHlDaGFuZ2UoZXZlbnQ6YW55KSB7XG4gICAgY29uc29sZS5sb2coJ1tldmVudF0gYWN0aXZpdHljaGFuZ2U6ICcsIGV2ZW50LmFjdGl2aXR5LCBldmVudC5jb25maWRlbmNlKTtcbiAgICAvL3RoaXMuQWRkTm90aWZpY2F0aW9uKFwiQWN0aXZpdHlcIiwgIHRoaXMubGJsX2xhdGl0dWRlICsgXCJ8XCIgKyB0aGlzLmxibF9sb25naXR1ZGUgKyBcInxcIiArIGV2ZW50LmNvbmZpZGVuY2UsIDQpXG4gICAgdGhpcy5tb3Rpb25BY3Rpdml0eSA9IGV2ZW50LmFjdGl2aXR5O1xuICB9XG5cbiAgcHJpdmF0ZSBvblByb3ZpZGVyQ2hhbmdlKHByb3ZpZGVyOmFueSkge1xuICAgIGNvbnNvbGUubG9nKCdbZXZlbnRdIHByb3ZpZGVyY2hhbmdlOiAnLCBwcm92aWRlcik7XG4gIH1cblxuICBwcml2YXRlIG9uR2VvZmVuY2UoZ2VvZmVuY2U6YW55KSB7XG4gICAvLyBjb25zb2xlLmxvZygnW2V2ZW50XSBnZW9mZW5jZScsIGdlb2ZlbmNlKTtcbiAgICB2YXIgaWRlbnRpZmllciAgPSBnZW9mZW5jZS5pZGVudGlmaWVyO1xuICAgIHZhciBhY3Rpb24gICAgICA9IGdlb2ZlbmNlLmFjdGlvbjtcbiAgICBjb25zb2xlLmxvZyhhY3Rpb24rJyBBIGdlb2ZlbmNlIGhhcyBiZWVuIGNyb3NzZWQ6ICcrIGlkZW50aWZpZXIpO1xuICAgIGNvbnNvbGUubG9nKCdFTlRFUiBvciBFWElUPzogJywgYWN0aW9uKTtcbiAgICBjb25zb2xlLmxvZygnZ2VvZmVuY2U6ICcsIEpTT04uc3RyaW5naWZ5KGdlb2ZlbmNlKSk7XG4gICAgdGhpcy5BZGROb3RpZmljYXRpb24oJ0EgZ2VvZmVuY2UgaGFzIGJlZW4gY3Jvc3NlZDonLCAgYWN0aW9uKycgZnJvbSBnZW9mZW5jZTogJytpZGVudGlmaWVyLDIpO1xuICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIik7XG4gIH1cblxuICBwcml2YXRlIG9uR2VvZmVuY2VzQ2hhbmdlKGV2ZW50OmFueSkge1xuICAgIGNvbnNvbGUubG9nKCdbZXZlbnRdIGdlb2ZlbmNlc2NoYW5nZSBPTjonLCBKU09OLnN0cmluZ2lmeShldmVudC5vbiksICcsIE9GRjonLCBKU09OLnN0cmluZ2lmeShldmVudC5vZmYpKTtcbiAgfVxuXG4gIHByaXZhdGUgb25IdHRwKHJlc3BvbnNlOmFueSkge1xuICAgIGNvbnNvbGUubG9nKCdbZXZlbnRdIGh0dHA6ICcsIHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2UucmVzcG9uc2VUZXh0KTtcbiAgfVxuXG4gIHByaXZhdGUgb25IZWFydGJlYXQoZXZlbnQ6YW55KSB7XG4gICAgY29uc29sZS5sb2coJ1tldmVudF0gaGVhcnRiZWF0JywgZXZlbnQpO1xuXG4gICAgLy9jb25zb2xlLmxvZygnLSBoZWFydGJlYXQgZXZlbnQgcmVjZWl2ZWQnKTtcbiAgICBCYWNrZ3JvdW5kR2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKGZ1bmN0aW9uKGxvY2F0aW9uKSB7XG4gICAgICAgIGlmIChsb2NhdGlvbiAhPSBudWxsKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCctIEN1cnJlbnQgcG9zaXRpb24gcmVjZWl2ZWQ6ICcsIGxvY2F0aW9uKTtcbiAgICAgICAgfVxuICAgIH0sIGZ1bmN0aW9uKGVycm9yQ29kZSkge1xuICAgICAgICB0aGlzLkFkZE5vdGlmaWNhdGlvbignb25IZWFydEJlYXRbZXJyb3JdJyxcImVycm9yXCIsNSk7XG4gICAgfSwge1xuICAgICAgICB0aW1lb3V0OiAzMCwgICAgICAvLyAzMCBzZWNvbmQgdGltZW91dCB0byBmZXRjaCBsb2NhdGlvblxuICAgICAgICBtYXhpbXVtQWdlOiA1MDAwLCAvLyBBY2NlcHQgdGhlIGxhc3Qta25vd24tbG9jYXRpb24gaWYgbm90IG9sZGVyIHRoYW4gNTAwMCBtcy5cbiAgICAgICAgZGVzaXJlZEFjY3VyYWN5OiAxMCwgIC8vIFRyeSB0byBmZXRjaCBhIGxvY2F0aW9uIHdpdGggYW4gYWNjdXJhY3kgb2YgYDEwYCBtZXRlcnMuXG4gICAgICAgIHNhbXBsZXM6IDMsICAgLy8gSG93IG1hbnkgbG9jYXRpb24gc2FtcGxlcyB0byBhdHRlbXB0LlxuICAgICAgICBleHRyYXM6IHsgICAgICAgICAvLyBbT3B0aW9uYWxdIEF0dGFjaCB5b3VyIG93biBjdXN0b20gYG1ldGFEYXRhYCB0byB0aGlzIGxvY2F0aW9uLiAgVGhpcyBtZXRhRGF0YSB3aWxsIGJlIHBlcnNpc3RlZCB0byBTUUxpdGUgYW5kIFBPU1RlZCB0byB5b3VyIHNlcnZlclxuICAgICAgICBmb286IFwiYmFyXCIgIFxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgfVxuXG4gIHByaXZhdGUgb25TY2hlZHVsZShzdGF0ZTphbnkpIHtcbiAgICBjb25zb2xlLmxvZygnW2V2ZW50XSBzY2hlZHVsZTogJywgc3RhdGUuZW5hYmxlZCk7XG4gIH1cblxuICBwcml2YXRlIG9uUG93ZXJTYXZlQ2hhbmdlKGlzUG93ZXJTYXZlTW9kZTpib29sZWFuKSB7XG4gICAgY29uc29sZS5sb2coJ1tldmVudF0gcG93ZXJzYXZlY2hhbmdlOiAnLCBpc1Bvd2VyU2F2ZU1vZGUpO1xuICAgIHRoaXMuaXNQb3dlclNhdmVNb2RlID0gaXNQb3dlclNhdmVNb2RlO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBjcmVhdGVWaWV3TW9kZWw7XG4iXX0=