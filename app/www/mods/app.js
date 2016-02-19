define(['./r', './e', './events', './dataBase', './counter'],
function(r, e, events, dataBase, counter) {
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
  var _renderHtml = function() {
    e.addEntry.render();
    e.infoParams.render();
    e.manageCounters.render();
    e.deleteCounter.render();
  };
  return {
    init: function() {
      dataBase.init('dbApp', '0.1', 'Data Base', 10 * 1024 * 1024)
      .check()
      .createTables(_tables);
      counter.getCountersList(function() {
        //html.loadGenHtml();
        _renderHtml();
      });
      return this;
    },
    events: function() {
      return events;
    }
  };
});
