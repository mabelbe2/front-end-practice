(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

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
          fn(data);
          this.reset();
          //elements is the array of the form fields
          this.elements[0].focus();
      });


  };

  App.FormHandler = FormHandler; window.App = App;
})(window);
