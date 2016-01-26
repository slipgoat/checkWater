var db = openDatabase('dbApp', '0.1', 'Data Base', 10 * 1024 * 1024);

var monthsList = [
  'jan', 'feb',
  'march', 'apr', 'may',
  'june', 'jule', 'aug',
  'sep', 'oct', 'nov',
  'dec'
];

var monthsListFull = [
  'Январь', 'Февраль',
  'Март', 'Апрель', 'Май',
  'Июнь', 'Июль', 'Август',
  'Сентябрь', 'Октябрь', 'Ноябрь',
  'Декабрь'
];

var addRefreshHtml = document.getElementById('addRefresh');
var delRefreshHtml = document.getElementById('delRefresh');

var checkDB = function() {
  if (!db) {
    console.log('Failed to connect to database.');
  } else {
    console.log('WebSql is ready!');
  }
};

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
    'FOREIGN KEY (counterId) REFERENCES COUNTERS(id))'
  ];
  db.transaction(function(tx) {
    for (var i = 0; i < statements.length; i++) {
      tx.executeSql(statements[i]);
    }
  });
};

var getCounterObject = function(counterNumber, callback) {
  return db.transaction(function(tx) {
    tx.executeSql
    ('SELECT * FROM COUNTERS WHERE counterNumber = "' + counterNumber + '"',
    [], function(tx, results) {
      var counterObject = results.rows.item(0);
      callback(counterObject);
    });
  });
};
//getCounterObject(counterNumber, function(counterObject) {
//  console.log(counterObject.temp);
//});

var getCountersList = function(callback) {
  countersList = [];
  db.transaction(function(tx) {
    tx.executeSql
    ('SELECT * FROM COUNTERS', [], function(tx, results) {
      var reqRes = results.rows;
      for (var i = 0; i < reqRes.length; i++) {
        countersList.push(reqRes.item(i));
      }
      callback();
    });
  });
};
