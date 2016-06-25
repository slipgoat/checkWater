define([], function() {
  return {
    addFirst: function(target, element, attr, val) {
      //
      var el = document.createElement(element);
      if (attr !== undefined && val !== undefined) {
        el.setAttribute(attr, val);
      }
      $(target).prepend(el);
      return this;
    },
    addEl: function(target, element, attr, val) {
      //
      var el = document.createElement(element);
      if (attr !== undefined && val !== undefined) {
        el.setAttribute(attr, val);
      }
      $(target).append(el);
      return this;
    },
    addHtml: function(target, html) {
      $(target).append(html);
      return this;
    },
    addBefore: function(target, element, attr, val) {
      //
      var el = document.createElement(element);
      if (attr !== undefined && val !== undefined) {
        el.setAttribute(attr, val);
      }
      $(target).before(el);
      return this;
    },
    addAfter: function(target, element, attr, val) {
      //
      var el = document.createElement(element);
      if (attr !== undefined && val !== undefined) {
        el.setAttribute(attr, val);
      }
      $(target).after(el);
      return this;
    },
    setCss: function(target, property, val) {
      //
      $(target).css(property, val);
      return this;
    },
    setAttr: function(target, attr, val) {
      //
      $(target).attr(attr, val);
    },
    setText: function(target, text) {
      //
      $(target).text(text);
      return this;
    },
    setHtml: function(target, html) {
      //
      $(target).html(html);
      return this;
    },
    setVal: function(target, val) {
      //
      $(target).val(val);
      return this;
    },
    remove: function(e) {
      //
    }
  };
});
