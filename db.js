var db = openDatabase('dbApp', '0.1', 'Data Base', 10 * 1024 * 1024);

if (!db) {
  alert('Failed to connect to database.');
}

var createTables = function() {
  var statements = [
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
    'FOREIGN KEY (counterId) REFERENCES COUNTERS(id))',
    'CREATE TABLE IF NOT EXISTS HTML ' +
    '(id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
    'counterId INTEGER, markValue TEXT, markRes TEXT, markInfo TEXT ' +
    'FOREIGN KEY (counterId) REFERENCES COUNTERS(id))'
  ];
  db.transaction(function(tx) {
    for (var i = 0; i < statements.length; i++) {
      tx.executeSql(statements[i]);
    }
  });
};
createTables();
