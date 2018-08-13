
(function (window) {
  'use strict';
  var FORM_SELECTOR='[data-coffee-order="form"]';
  var SLIDER_SELECTOR='[data-form-role="slider"]'
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var FormHandler=App.FormHandler;
  var myTruck = new Truck('ncc-1701', new DataStore());
  window.myTruck = myTruck;
  var formHandler= new FormHandler(FORM_SELECTOR);
  var sliderHandler=new FormHandler(SLIDER_SELECTOR);

  //you cannot just pass a reference to createOrder to formHandler.addSubmitHandler. This is because createOrder’s owner changes when it is invoked inside of the event handling callback. With a different owner, the value of this inside the body of createOrder will not be the Truck instance
  formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));
  sliderHandler.addSliderHandler();
  console.log(formHandler);
})(window);
