# recheck-mobile-native

### To build project you need env file
*Each (production/development) scripts loads file for itself* <br />
`.env.production.local` for production settings/scripts <br />
`.env.development.local` for development settings/scripts

Example `.env.production.local` file:
```bash
# production (logs disabled) or debug (logs enabled)
VUE_APP_LOGGER_MODE=production

# api endpoint,network needed for init function
VUE_APP_API_ENV=https://beta.recheck.io,ae
```

## Project setup
```sh
npm install

### Compiles and hot-reloads for development
npm run serve

### Compiles and minifies for production
npm run build

### Lints and fixes files
npm run lint

### Cordova part, serve in android emulator
npm run cordova-serve-android

### Cordova part, build for android (needs to be signed)
npm run cordova-build-android

### Cordova part, serve in ios emulator
npm run cordova-serve-ios

### Cordova part, build for ios (needs to be signed)
npm run cordova-build-ios
```

