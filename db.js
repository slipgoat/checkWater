var db = openDatabase('dbApp', '0.1', 'Data Base App', 20000);

if (!db) {
  alert('Failed to connect to database.');
}

db.transaction(function(tx) {
  tx.executeSql
  ('CREATE TABLE IF NOT EXISTS COUNTERS ' +
  '(id INTEGER PRIMARY KEY AUTOINCREMENT, counterNumber TEXT, type TEXT, ' +
  'idValues TEXT, idRes TEXT, idInfo TEXT)');
});

db.transaction(function(tx) {
  tx.executeSql
  ('CREATE TABLE IF NOT EXISTS RAWENTRIES ' +
  '(id INTEGER PRIMARY KEY AUTOINCREMENT, year INTEGER, month INTEGER, ' +
  'counterId INTEGER, entry INTEGER, ' +
  'FOREIGN KEY (counterId) REFERENCES (COUNTERS))');
});

db.transaction(function(tx) {
  tx.executeSql
  ('CREATE TABLE IF NOT EXISTS ENTRIES ' +
  '(id INTEGER PRIMARY KEY AUTOINCREMENT, year INTEGER, month INTEGER, ' +
  'counterId INTEGER, entry INTEGER, ' +
  'FOREIGN KEY (counterId) REFERENCES (COUNTERS))');
});
