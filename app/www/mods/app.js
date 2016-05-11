define(['./r', './e', './dataBase', './counter', './entry'],
function(r, e, dataBase, counter, entry) {
  var _tables = [
    'CREATE TABLE IF NOT EXISTS COUNTERS ' +
    '(id INTEGER PRIMARY KEY AUTOINCREMENT, counterNumber TEXT, temp TEXT, ' +
    'idValue TEXT, idRes TEXT, idInfo TEXT)',
    'CREATE TABLE IF NOT EXISTS RAWENTRIES ' +
    '(id INTEGER PRIMARY KEY AUTOINCREMENT, year INTEGER, month INTEGER, ' +
    'counterId INTEGER, entry INTEGER, ' +
    'FOREIGN KEY (counterId) REFERENCES COUNTERS(id))',
    'CREATE TABLE IF NOT EXISTS ENTRIES ' +
    '(id INTEGER PRIMARY KEY AUTOINCREMENT, year INTEGER, month INTEGER, ' +
    'counterId INTEGER, entry INTEGER, ' +
    'FOREIGN KEY (counterId) REFERENCES COUNTERS(id))'
  ];
  return {
    status: {
      entries: 0,
      counters: 0
    },
    checkStatus: function() {
      var that = this;
      counter.getCountersList(function() {
        if (countersList.length !== 0) {
          that.status.counters = 1;
        } else if (countersList.length === 0) {
          that.status.counters = 0;
        }
        entry.getEntriesList(function() {
          if (entry.entriesList.length !== 0) {
            that.status.entries = 1;
          } else if (entry.entriesList.length === 0) {
            that.status.entries = 0;
          }
          that.renderHtml();
        });
      });
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
      dataBase.init('dbApp', '0.1', 'Data Base', 10 * 1024 * 1024)
      .check()
      .createTables(_tables);
      this.checkStatus();
      return this;
    }
  };
});
