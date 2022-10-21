# Mijn Erkenningen APP/PWA

Mobile and Web app (PWA) for "Mijn Bureau Erkenningen"

## Installation

Have nvm (Node Version Manager) installed.
`.nvmrc` contains the version of Node that will be used.

Install Ionic CLI: `npm install -g @ionic/cli`

To have support for devices/simulators run:
`npm install -g @ionic/cli native-run cordova-res`

Capacitor is the new Cordova, which is bridging between JavaScript and native platform.
Install Capacitor: `ionic integrations enable capacitor`

Run the following commands:

```bash
ionic build
ionic cap add ios
ionic cap add android
npx cap sync android
```

Finally run: `npm i` start.

### Open XCode and Android Studio

`npx cap open ios` or `npx cap open android` to open the IDE's.

In `capacitor.config.json` add this where the IP address is the local IP of your computer:

```json

"server": {
    "url": "http://192.168.1.109:8100",
    "cleartext": true
  }

```

## Run

Run `npm start` and `npm run ms` to run the mock server.

Run `npx cap run android` to open an Android emulator. Or check the [docs](https://capacitorjs.com/docs/android).

## Build

Run `npm run build`.

## Release on play store

To release an app, run:

- `npm run build`
- `npx cap sync android`
- `npx cap open android`

Select the build variant to Release.
In Android studio build, go to `Build`, then `Build bundle APK` > `Build bundle APK`.
Next, `Build` > `Generate signed APK/Bundle`. Choose `apk` and continue.

The APK will be generated here:
`/Users/[user]/Projects/BE/mijn-erkenningen/android/app/release/app-release.apk`

Open the [Play store](https://play.google.com/console/u/0/developers/5665722384988108401) with the AOCRaadICT gmail account.

## Release on App store

To release an app, run:

- `npm run build`
- `npx cap sync ios`
- `npx cap open ios`

Then, XCode will open and you can use the Product > Archive option to upload to the App store.
