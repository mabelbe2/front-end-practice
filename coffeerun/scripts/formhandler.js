(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;
  var SLIDER_VALUE_SELECTOR = '[data-form-role="value"]';
  var SLIDER_LOW_CLASS = 'lowValue';
  var SLIDER_MID_CLASS = 'midValue';
  var SLIDER_HIG_CLASS = 'higValue';
  var MODAL_CONFIRM_SELECTOR='[data-confirm="modal"]';
  var POWER_FORM_SELECTOR='[data-form-role = "powerUp"]';
  var achievement=0;
  var powerUpField=document.querySelector(POWER_FORM_SELECTOR);

  function FormHandler(selector) { // Code will go here
    if (!selector) {
      throw new Error('No selector provided');
    }

    //Declare an instance variable named $formElement,$ is just a indicator of using jquery
    //it returns a single object, and the object contains references to the selected elements
    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  FormHandler.prototype.addSubmitHandler = function(fn) {
    console.log('Setting submit handler for form');

    this.$formElement.on('submit', function(event) {
      event.preventDefault();

      // jQuery provides a convenience method (serializeArray) for getting the values from the form. In order to use serializeArray, you need to “wrap” the form using jQuery. Calling $(this) gives you a wrapped object, which has access to the serializeArray method.
      //serializeArray returns the form data as an array of objects.
      var data = {};
      $(this).serializeArray().forEach(function(item) {
        data[item.name] = item.value;
        console.log(item.name + ' is ' + item.value);
      });

      console.log(data);


      //unlock the achievement and show modal
      if(data['size']==='Coffee-zilla'&& data['flavor']!==''&& data['strength']==="100"&&achievement===0){
        //if(1){
        console.log("all matched");
        $('.modal').modal('show');
        var confirmButton=document.querySelector(MODAL_CONFIRM_SELECTOR);
        achievement=1;
        confirmButton.addEventListener('click',function(event){

          if(data['emailAddress']){
            powerUpField.classList.remove("hidden-form-group");
          }
          $('.modal').modal('hide');

        });
      }else{
        //after unlock achievement or no achievement activated
        if(achievement){
          powerUpField.classList.add("hidden-form-group");

        }
        achievement=0;
        var sliderValue = document.querySelector(SLIDER_VALUE_SELECTOR);

        sliderValue.classList.remove(SLIDER_LOW_CLASS);
        sliderValue.classList.remove(SLIDER_MID_CLASS);
        sliderValue.classList.remove(SLIDER_HIG_CLASS);
        fn(data);

        this.reset();
        //elements is the array of the form fields
        this.elements[0].focus();
      }

    });

  };

  FormHandler.prototype.addSliderHandler=function() {
    console.log('Setting slider handler for form');

    this.$formElement.on('change', function() {
      var sliderValue = document.querySelector(SLIDER_VALUE_SELECTOR);
      sliderValue.innerHTML=this.value;
      sliderValue.value=this.value;
      console.log('value is now '+this.value);

      if(sliderValue.value<30){
        sliderValue.classList.remove(SLIDER_HIG_CLASS);
        sliderValue.classList.remove(SLIDER_MID_CLASS);

        sliderValue.classList.add(SLIDER_LOW_CLASS);

      }else if(sliderValue.value>=30 && sliderValue.value<60){
        sliderValue.classList.remove(SLIDER_LOW_CLASS);
        sliderValue.classList.remove(SLIDER_HIG_CLASS);

        sliderValue.classList.add(SLIDER_MID_CLASS);

      }else{
        sliderValue.classList.remove(SLIDER_LOW_CLASS);
        sliderValue.classList.remove(SLIDER_MID_CLASS);

        sliderValue.classList.add(SLIDER_HIG_CLASS);

      }
      //  if(){
      //}
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
