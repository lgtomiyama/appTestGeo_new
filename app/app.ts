// /*
// In NativeScript, the app.ts file is the entry point to your application.
// You can use this file to perform app-level initialization, but the primary
// purpose of the file is to pass control to the app’s first module.
// */

// import "./bundle-config";
// import * as application from 'application';

// application.start({ moduleName: 'main-page' });

// /*
// Do not place any code after the application has been started as it will not
// be executed on iOS.
// */

import * as app from 'application';
import "./bundle-config";
import {BackgroundFetch} from "nativescript-background-fetch";

if (app.ios) {
  class MyDelegate extends UIResponder implements UIApplicationDelegate {
    public static ObjCProtocols = [UIApplicationDelegate];
    public applicationPerformFetchWithCompletionHandler(application: UIApplication, completionHandler:any) {
      BackgroundFetch.performFetchWithCompletionHandler(application, completionHandler);
    }
  }
  app.ios.delegate = MyDelegate;
}

app.start({ moduleName: 'main-page' });