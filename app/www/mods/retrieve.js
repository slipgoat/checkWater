define(['../lib/jquery', './foo'], function(jquery, foo) {
  return {
    byId: function(id) {
      var v = document.getElementById(id).value;
      if (!v) {
        return null;
      } else {
        return v;
      }
    },

    byAttr: function(target, attribute) {
      return $(target).attr(attribute);
    },

    entryMonthValue: function() {
      var v = $('#months_entry_select').val();
      if (v === 'none') {
        return foo.getCurrentMonth();
      } else {
        return foo.monthsList.indexOf(v);
      }
    }
  };
});
