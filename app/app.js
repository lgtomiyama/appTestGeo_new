"use strict";
// /*
// In NativeScript, the app.ts file is the entry point to your application.
// You can use this file to perform app-level initialization, but the primary
// purpose of the file is to pass control to the app’s first module.
// */
Object.defineProperty(exports, "__esModule", { value: true });
// import "./bundle-config";
// import * as application from 'application';
// application.start({ moduleName: 'main-page' });
// /*
// Do not place any code after the application has been started as it will not
// be executed on iOS.
// */
var app = require("application");
require("./bundle-config");
var nativescript_background_fetch_1 = require("nativescript-background-fetch");
if (app.ios) {
    var MyDelegate = (function (_super) {
        __extends(MyDelegate, _super);
        function MyDelegate() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MyDelegate.prototype.applicationPerformFetchWithCompletionHandler = function (application, completionHandler) {
            nativescript_background_fetch_1.BackgroundFetch.performFetchWithCompletionHandler(application, completionHandler);
        };
        MyDelegate.ObjCProtocols = [UIApplicationDelegate];
        return MyDelegate;
    }(UIResponder));
    app.ios.delegate = MyDelegate;
}
app.start({ moduleName: 'main-page' });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxLQUFLO0FBQ0wsMkVBQTJFO0FBQzNFLDZFQUE2RTtBQUM3RSxvRUFBb0U7QUFDcEUsS0FBSzs7QUFFTCw0QkFBNEI7QUFDNUIsOENBQThDO0FBRTlDLGtEQUFrRDtBQUVsRCxLQUFLO0FBQ0wsOEVBQThFO0FBQzlFLHNCQUFzQjtBQUN0QixLQUFLO0FBRUwsaUNBQW1DO0FBQ25DLDJCQUF5QjtBQUN6QiwrRUFBOEQ7QUFFOUQsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDWjtRQUF5Qiw4QkFBVztRQUFwQzs7UUFLQSxDQUFDO1FBSFEsaUVBQTRDLEdBQW5ELFVBQW9ELFdBQTBCLEVBQUUsaUJBQXFCO1lBQ25HLCtDQUFlLENBQUMsaUNBQWlDLENBQUMsV0FBVyxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFDcEYsQ0FBQztRQUhhLHdCQUFhLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBSXhELGlCQUFDO0tBQUEsQUFMRCxDQUF5QixXQUFXLEdBS25DO0lBQ0QsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0FBQ2hDLENBQUM7QUFFRCxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAvKlxuLy8gSW4gTmF0aXZlU2NyaXB0LCB0aGUgYXBwLnRzIGZpbGUgaXMgdGhlIGVudHJ5IHBvaW50IHRvIHlvdXIgYXBwbGljYXRpb24uXG4vLyBZb3UgY2FuIHVzZSB0aGlzIGZpbGUgdG8gcGVyZm9ybSBhcHAtbGV2ZWwgaW5pdGlhbGl6YXRpb24sIGJ1dCB0aGUgcHJpbWFyeVxuLy8gcHVycG9zZSBvZiB0aGUgZmlsZSBpcyB0byBwYXNzIGNvbnRyb2wgdG8gdGhlIGFwcOKAmXMgZmlyc3QgbW9kdWxlLlxuLy8gKi9cblxuLy8gaW1wb3J0IFwiLi9idW5kbGUtY29uZmlnXCI7XG4vLyBpbXBvcnQgKiBhcyBhcHBsaWNhdGlvbiBmcm9tICdhcHBsaWNhdGlvbic7XG5cbi8vIGFwcGxpY2F0aW9uLnN0YXJ0KHsgbW9kdWxlTmFtZTogJ21haW4tcGFnZScgfSk7XG5cbi8vIC8qXG4vLyBEbyBub3QgcGxhY2UgYW55IGNvZGUgYWZ0ZXIgdGhlIGFwcGxpY2F0aW9uIGhhcyBiZWVuIHN0YXJ0ZWQgYXMgaXQgd2lsbCBub3Rcbi8vIGJlIGV4ZWN1dGVkIG9uIGlPUy5cbi8vICovXG5cbmltcG9ydCAqIGFzIGFwcCBmcm9tICdhcHBsaWNhdGlvbic7XG5pbXBvcnQgXCIuL2J1bmRsZS1jb25maWdcIjtcbmltcG9ydCB7QmFja2dyb3VuZEZldGNofSBmcm9tIFwibmF0aXZlc2NyaXB0LWJhY2tncm91bmQtZmV0Y2hcIjtcblxuaWYgKGFwcC5pb3MpIHtcbiAgY2xhc3MgTXlEZWxlZ2F0ZSBleHRlbmRzIFVJUmVzcG9uZGVyIGltcGxlbWVudHMgVUlBcHBsaWNhdGlvbkRlbGVnYXRlIHtcbiAgICBwdWJsaWMgc3RhdGljIE9iakNQcm90b2NvbHMgPSBbVUlBcHBsaWNhdGlvbkRlbGVnYXRlXTtcbiAgICBwdWJsaWMgYXBwbGljYXRpb25QZXJmb3JtRmV0Y2hXaXRoQ29tcGxldGlvbkhhbmRsZXIoYXBwbGljYXRpb246IFVJQXBwbGljYXRpb24sIGNvbXBsZXRpb25IYW5kbGVyOmFueSkge1xuICAgICAgQmFja2dyb3VuZEZldGNoLnBlcmZvcm1GZXRjaFdpdGhDb21wbGV0aW9uSGFuZGxlcihhcHBsaWNhdGlvbiwgY29tcGxldGlvbkhhbmRsZXIpO1xuICAgIH1cbiAgfVxuICBhcHAuaW9zLmRlbGVnYXRlID0gTXlEZWxlZ2F0ZTtcbn1cblxuYXBwLnN0YXJ0KHsgbW9kdWxlTmFtZTogJ21haW4tcGFnZScgfSk7Il19