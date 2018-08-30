// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  version:"0.0.1",
  firebase: {
    apiKey: "AIzaSyBEikkYSq_erY-4pKtmRVAXfnwnZT8kpb4",
    authDomain: "monkey-deal-5cd79.firebaseapp.com",
    databaseURL: "https://monkey-deal-5cd79.firebaseio.com",
    projectId: "monkey-deal-5cd79",
    storageBucket: "monkey-deal-5cd79.appspot.com",
    messagingSenderId: "822330096018"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
