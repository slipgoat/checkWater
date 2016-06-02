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
