cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-dialogs.notification",
      "file": "plugins/cordova-plugin-dialogs/www/notification.js",
      "pluginId": "cordova-plugin-dialogs",
      "merges": [
        "navigator.notification"
      ]
    },
    {
      "id": "cordova-plugin-permission.Permission",
      "file": "plugins/cordova-plugin-permission/www/index.js",
      "pluginId": "cordova-plugin-permission",
      "clobbers": [
        "window.plugins.Permission"
      ]
    },
    {
      "id": "cordova-plugin-permission.tests",
      "file": "plugins/cordova-plugin-permission/tests/index.spec.js",
      "pluginId": "cordova-plugin-permission"
    },
    {
      "id": "cordova-plugin-qrscanner.QRScanner",
      "file": "plugins/cordova-plugin-qrscanner/www/www.min.js",
      "pluginId": "cordova-plugin-qrscanner",
      "clobbers": [
        "QRScanner"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-dialogs": "2.0.2",
    "cordova-plugin-permission": "0.1.0",
    "cordova-plugin-add-swift-support": "2.0.2",
    "cordova-plugin-qrscanner": "3.0.1",
    "cordova-plugin-whitelist": "1.3.4"
  };
});