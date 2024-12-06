/* eslint-disable func-names */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/**
 * This hook overrides a function check at runtime. Currently, cordova-android 7+
 * incorrectly detects that we are using an eclipse style project. This causes a
 * lot of plugins to fail at install time due to paths actually being setup for
 * an Android Studio project. Some plugins choose to install things into
 * 'platforms/android/libs' which makes this original function assume it is an ecplise project.
 */

const path = require('path');

module.exports = function (context) {
  if (context.opts.cordova.platforms.indexOf('android') < 0) {
    return;
  }

  const androidStudioPath = path.join(context.opts.projectRoot, 'platforms/android/cordova/lib/AndroidStudio');

  const androidStudio = require(androidStudioPath);
  androidStudio.isAndroidStudioProject = function () { return true; };
};
