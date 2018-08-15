
(function (window) {
  'use strict';
  var FORM_SELECTOR='[data-coffee-order="form"]';
  var CHECKLIST_SELECTOR='[data-coffee-order="checklist"]';
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var FormHandler=App.FormHandler;
  //import the CheckList module from the App namespace to a local variable,
  var CheckList=App.CheckList;
  var myTruck = new Truck('ncc-1701', new DataStore());
  window.myTruck = myTruck;
  var checkList=new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  var formHandler= new FormHandler(FORM_SELECTOR);

  //you cannot just pass a reference to createOrder to formHandler.addSubmitHandler. This is because createOrder’s owner changes when it is invoked inside of the event handling callback. With a different owner, the value of this inside the body of createOrder will not be the Truck instance
  formHandler.addSubmitHandler(function(data){

    myTruck.createOrder.call(myTruck, data);
    checkList.addRow.call(checkList, data);
  });
  console.log(formHandler);
})(window);
