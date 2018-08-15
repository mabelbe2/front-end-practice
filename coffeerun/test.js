foo('outside');  // TypeError: foo is not a function

  function foo(location) {
   console.log('foo is called ' + location);
  }
  foo('inside'); // works correctly and logs 'foo is called inside'
