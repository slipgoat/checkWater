var db = openDatabase('dbApp', '0.1', 'Data Base App', 20000);

if (!db) {
  alert('Failed to connect to database.');
}

db.transaction(function(tx) {
  tx.executeSql('DROP DATABASE dbApp');
  /*tx.executeSql
  ('CREATE TABLE IF NOT EXISTS ENTRIES (id INTEGER PRIMARY KEY AUTOINCREMENT,' +
    'year INTEGER, month INTEGER, counter TEXT, entry INTEGER)');*/
});
