(function () {
  // All the code!
  window.$l = function (input) {
    var collection;
    if (input instanceof Function) {
      document.addEventListener("DOMContentLoaded", input);
    } else if (input instanceof HTMLElement) {
      var argArray = [input];
      collection = new DOMNodeCollection(argArray);
    } else if (input instanceof Array) {
      collection = new DOMNodeCollection(input);
    } else {
      var nodeList = document.querySelectorAll(input);
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

  DOMNodeCollection.prototype.addClass = function (value) {
    this.collection.forEach( function (el) {
      el.classList.add(value);
    });
  };

  DOMNodeCollection.prototype.removeClass = function (value) {
    this.collection.forEach( function (el) {
      el.classList.remove(value);
    });
  };

  DOMNodeCollection.prototype.children = function () {
    var result = [];
    this.collection.forEach( function (el) {
      var children = [].slice.call(el.children);
      result = result.concat(children);
    });
    return new DOMNodeCollection(result);
  };

  DOMNodeCollection.prototype.parent = function () {
    var result = [];
    this.collection.forEach( function (el) {
      result.push(el.parentElement);
    });
    return new DOMNodeCollection(result);
  };

  DOMNodeCollection.prototype.find = function (selector) {
    var result = [];
    this.collection.forEach( function (el) {
      var nodeList = [].slice.call(el.querySelectorAll(selector));
      result = result.concat(nodeList);
    });
    return new DOMNodeCollection(result);
  };

  DOMNodeCollection.prototype.remove = function () {
    this.collection.forEach( function (el) {
      el.remove();
    });
  };

  DOMNodeCollection.prototype.on = function (event, callback) {
    this.collection.forEach( function (el) {
      el.addEventListener(event, callback);
    });
  };

  DOMNodeCollection.prototype.off = function (event, callback) {
    this.collection.forEach( function (el) {
      el.removeEventListener(event, callback);
    });
  };

  window.$l.extend = function () {
    var first = arguments[0];
    var objects = [].slice.call(arguments, 1);

    objects.forEach( function (obj) {
      // debugger
      Object.keys(obj).forEach( function (key) {
        first[key] = obj[key];
      });
    });

    return first;

  };

})();
