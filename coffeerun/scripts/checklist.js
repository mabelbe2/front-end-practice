(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;
  var delay = 200;
  var timer = 0;
  var clickCount = 0;
  var removeTimer=0;
  var removeDelay = 1000;

  function CheckList(selector) {
    if (!selector) {
      throw new Error('No selector provided');

    }
    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);

    }
  }

  CheckList.prototype.addClickHandler = function(coffeeOrder, fn) {
    var self=this;
    // you also passed in a filtering selector as the second argument. The filtering selector tells the event handler to run the callback function only if the event was triggered by an <input> element.
    // This is a pattern called event delegation. It works because some events, like clicks and keypresses, propagate through the DOM, meaning each ancestor element is informed about the event.
    // Any time you need to listen for an event on elements that are dynamically created and removed, such as the checklist items, you should use event delegation. It is easier and more performant to add a single listener to the dynamic elements’ container and then run the handler function based on what element triggered the event.
    this.$element.on('click', 'input', function(event) {
      clickCount++;
      if (clickCount === 1) {
        timer = setTimeout(function() {
          console.log("single click!");
          self.$element.css("background-color","grey");
          removeTimer=setTimeout(function(){
            var email = event.target.value;
            self.removeRow(email);
            fn(email);
          },removeDelay);

        }, delay);
      } else if (clickCount >= 2) {
        clearTimeout(timer);
        clickCount=0;
        console.log("double click!");
        var email = event.target.value;
        $('#coffeeOrder').val(coffeeOrder.coffee);
        $('#emailInput').val(email);
        $('#flavorShot').val(coffeeOrder.flavor);
        $('input[type=radio][val=' + coffeeOrder.size + ']').attr('checked', "checked");
        $('#strengthLevel').val(coffeeOrder.strength);
      }

    });


  };

  CheckList.prototype.addRow = function(coffeeOrder) {
    this.removeRow(coffeeOrder.emailAddress)
    var rowElement = new Row(coffeeOrder);
    this.$element.append(rowElement.$element);
  }

  CheckList.prototype.removeRow = function(email) {
    this.$element.find('[value="' + email + '"]')
      .closest('[data-coffee-order="checkbox"]')
      .remove();
  };

  function Row(coffeeOrder) {
    var $div = $('<div></div>', {
      'data-coffee-order': 'checkbox',
      'class': 'checkbox'
    });
    switch (coffeeOrder.flavor) {
      case "caramel":
        $div.css('background-color', 'brown');
        break;
      case "almond":
        $div.css('background-color', 'yellow');
        break;
      case "mocha":
        $div.css('background-color', 'green');
        break;

    }
    var $label = $('<label></label>');
    var $checkbox = $('<input></input>', {
      type: 'checkbox',
      value: coffeeOrder.emailAddress
    });
    var description = '[' + coffeeOrder.strength + 'x]';

    description += coffeeOrder.size + ' ';
    if (coffeeOrder.flavor) {
      description += coffeeOrder.flavor + ' ';

    }
    description += coffeeOrder.coffee + ', ';
    description += '(' + coffeeOrder.emailAddress + ')';

    $label.append($checkbox);
    $label.append(description);
    $div.append($label);

    this.$element = $div;
  }



  App.CheckList = CheckList;
  window.App = App;
})(window);
