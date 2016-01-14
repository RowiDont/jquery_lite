(function () {
  // All the code!
  window.$l = function (arg) {
    var collection;
    if (arg instanceof HTMLElement) {
      var argArray = [arg];
      collection = new DOMNodeCollection(argArray);
    } else if (arg instanceof Array) {
      collection = new DOMNodeCollection(arg);
    } else {
      var nodeList = document.querySelectorAll(arg);
      nodeList = [].slice.call(nodeList);
      collection = new DOMNodeCollection(nodeList);
    }
    return collection;
  };

  var DOMNodeCollection = function (array) {
    this.collection = array;
  };
})();
