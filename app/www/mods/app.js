define(['./r', './e', './counter', './entry', './foo'],
function(r, e, counter, entry, foo) {
  return {
    status: {
      entries: 0,
      counters: 0
    },
    checkStatus: function() {
      var that = this;
      counter.getCountersList(function() {
        if (counter.countersList.length !== 0) {
          that.status.counters = 1;
        } else if (counter.countersList.length === 0) {
          that.status.counters = 0;
        }
      });
      entry.getEntriesList(function() {
        if (entry.entriesList.length !== 0) {
          that.status.entries = 1;
        } else if (entry.entriesList.length === 0) {
          that.status.entries = 0;
        }
      });
      this.renderHtml();
      return this;
    },
    renderHtml: function() {
      e.viewMode.render(this.status.counters, this.status.entries);
      e.addEntry.render();
      e.infoParams.render();
      e.manageCounters.render();
      e.deleteCounter.render();
      return this;
    },
    init: function() {
      if (!localStorage.getItem('counters')) {
        foo.setItem('counters', []);
      }
      if (!localStorage.getItem('entries')) {
        foo.setItem('entries', []);
      }
      this.checkStatus();
      return this;
    }
  };
});
