(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function CheckList(selector) {
    if (!selector) {
      throw new Error('No selector provided');

    }
    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);

    }
  }

  CheckList.prototype.addClickHandler = function(fn) {
    // you also passed in a filtering selector as the second argument. The filtering selector tells the event handler to run the callback function only if the event was triggered by an <input> element.
    // This is a pattern called event delegation. It works because some events, like clicks and keypresses, propagate through the DOM, meaning each ancestor element is informed about the event.
    // Any time you need to listen for an event on elements that are dynamically created and removed, such as the checklist items, you should use event delegation. It is easier and more performant to add a single listener to the dynamic elements’ container and then run the handler function based on what element triggered the event.
    this.$element.on('click', 'input', function(event) {
      var email = event.target.value;
      this.removeRow(email);
      fn(email);
    }.bind(this));
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
