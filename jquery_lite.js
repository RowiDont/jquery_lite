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

  DOMNodeCollection.prototype.html = function (string) {
    if (typeof string === "undefined") {
      return this.collection[0].innerHTML;
    } else {
      this.collection.forEach( function (el) {
        el.innerHTML = string;
      });
    }
  };

  DOMNodeCollection.prototype.empty = function () {
    this.collection.forEach( function (el) {
      el.innerHTML = "";
    });
  };

  DOMNodeCollection.prototype.append = function (arg) {
    var html;
    // debugger
    if (typeof arg === "string") {
      html = [arg];
    } else if (arg instanceof HTMLElement) {
      html = [arg.outerHTML];
    } else {
      html = arg.collection.map( function (el) {
        return el.outerHTML;
      });
    }
    this.collection.forEach( function (el) {
      html.forEach( function (content) {
        el.innerHTML += content;
      });
    });
  };

  DOMNodeCollection.prototype.attr = function (key, value) {
    if (typeof value === "undefined") {
      return this.collection[0].getAttribute(key);
    } else {
      this.collection.forEach( function (el) {
        el.setAttribute(key, value);
      });
    }
  };


})();
