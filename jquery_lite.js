(function () {
  // All the code!
  window.$l = function (arg) {
    var nodeList = document.querySelectorAll(arg);
    nodeList = [].slice.call(nodeList);
    return new DOMNodeCollection(nodeList);
  };

  var DOMNodeCollection = function (array) {
    this.collection = array;
  };
})();
