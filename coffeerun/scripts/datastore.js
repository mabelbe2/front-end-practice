(function(window) {
  'use strict';
  // If there is already an App property of the window, you assign the local App to it. If not, the label App will refer to a new, empty object,represented by {}.
  //The || is the default operator, otherwise known as the logical or operator. It can be used to provide a valid value (in this case, {}) if the first choice (window.App) has not yet been created.
  // If the window.App is falsy (one of the following):
  //
  // false
  // 0
  // '' (empty string)
  // null
  // undefined
  // NaN
  // ..then set it to {} (an empty object - it's the same as new Object()).
  var App = window.App || {};

  //constructors
  function DataStore() {

    var data = {};
    this.add = function(key, val) {
      data[key] = val;
    };
    this.get = function(key) {
      return data[key];
    };
    this.getAll = function() {
      return data;
    };

    this.remove = function (key) {
      delete data[key];
    };
  }
  //methods

  App.DataStore = DataStore;
  window.App = App;
})(window);
