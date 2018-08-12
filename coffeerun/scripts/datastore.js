(function(window) {
  'use strict';
  // If there is already an App property of the window, you assign the local App to it. If not, the label App will refer to a new, empty object,represented by {}.
  //The || is the default operator, otherwise known as the logical or operator. It can be used to provide a valid value (in this case, {}) if the first choice (window.App) has not yet been created.
  var App = window.App || {};

  //constructors
  function DataStore() {

    this.data = {};
  }
  //methods
  DataStore.prototype.add = function(key, val) {
    this.data[key] = val;
  };
  DataStore.prototype.get = function(key) {
    return this.data[key];
  };
  DataStore.prototype.getAll = function() {
    return this.data;
  };

  DataStore.prototype.remove = function (key) {
    delete this.data[key];
  };
  App.DataStore = DataStore;
  window.App = App;
})(window);
