'use strict';

angular.module('copayApp.services').service('popupService', function($log, $ionicPopup, platformInfo) {

  var isCordova = platformInfo.isCordova;

  /*************** Ionic ****************/

  var _ionicAlert = function(title, message, cb) {
    if (!cb) cb = function() {};
    $ionicPopup.alert({
      title: title,
      template: message
    }).then(cb);
  };

  var _ionicConfirm = function(title, message, cb) {
    $ionicPopup.confirm({
      title: title,
      template: message
    }).then(function(res) {
      return cb(res);
    });
  };

  var _ionicPrompt = function(title, message, opts, cb) {
    opts = opts || {};
    $ionicPopup.prompt({
      title: title,
      template: message,
      inputType: opts.inputType || 'password',
      inputPlaceholder: opts.inputPlaceholder || 'Your password'
    }).then(function(res) {
      return cb(res)
    });
  };

  /*************** Cordova ****************/

  var _cordovaAlert = function(title, message, cb) {
    if (!cb) cb = function() {};
    navigator.notification.alert(message, cb, title);
  };

  var _cordovaConfirm = function(title, message, cb) {
    var onConfirm = function (buttonIndex) {
      if (buttonIndex == 1) return cb(true);
      else return cb(false);
    }
    navigator.notification.confirm(message, onConfirm, title);
  };

  var _cordovaPrompt = function(title, message, cb) {
    var onPrompt = function (results) {
      if (results.buttonIndex == 1) return cb(results.input1);
      else return cb();
    }
    navigator.notification.prompt(message, onPrompt, title);
  };

  /**
   * Show a simple alert popup
   *
   * @param {String} Title
   * @param {String} Message
   * @param {Callback} Function (optional)
   */

  this.showAlert = function(title, msg, cb) {
    var message = msg.message ? msg.message : msg;
    $log.warn(title + ": " + message);

    if (isCordova)
      _cordovaAlert(title, message, cb);
    else
      _ionicAlert(title, message, cb);
  };

  /**
   * Show a simple confirm popup
   *
   * @param {String} Title
   * @param {String} Message
   * @param {Callback} Function
   * @returns {Callback} OK: true, Cancel: false
   */

  this.showConfirm = function(title, message, cb) {
    $log.warn(title + ": " + message);

    if (isCordova)
      _cordovaConfirm(title, message, cb);
    else
      _ionicConfirm(title, message, cb);
  };

  /**
   * Show a simple prompt popup
   *
   * @param {String} Title
   * @param {String} Message
   * @param {Object} Object{ inputType, inputPlaceholder } (optional)
   * @param {Callback} Function
   * @returns {Callback} Return the value of the input if user presses OK
   */

  this.showPrompt = function(title, message, opts, cb) {
    $log.warn(title + ": " + message);

    if (isCordova)
      _cordovaPrompt(title, message, cb);
    else
      _ionicPrompt(title, message, opts, cb);
  };


});
