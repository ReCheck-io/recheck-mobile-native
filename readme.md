# recheck-mobile-native

### To build project you need env file
*Each (production/development) script load it's env variables for itself* <br />
`.env.production.local` for production settings <br />
`.env.development.local` for development settings

```bash
# Example `.env.production.local` file:

VUE_APP_LOGGER_MODE=production              # Log status: production(disabled) - debug(enabled) (default: 'production')
VUE_APP_NETWORK=ae                          # Blockchain Network for init function (default: 'ae')
VUE_APP_API_URL=                            # API endpoint for init function (default: '')

```

## Project setup
```sh
### Prepare project

### Isntall all dependencies both for Vuejs and Cordova project
npm install && cd src-cordova && npm install

### Prepare Cordova project (install platforms and plugins)
cd src-cordova && cordova prepare


### Scripts

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

