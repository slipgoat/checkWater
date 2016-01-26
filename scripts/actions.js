var addCounter = function(counterNumber, temp) {
  db.transaction(function(tx) {
    tx.executeSql('SELECT id FROM COUNTERS WHERE temp="' +
    temp + '"', [], function(tx, results) {
      var tempAmount;
      var idValue;
      var idRes;
      var idInfo;
      tempAmount = results.rows.length;
      if (tempAmount === 0) {
        if (temp === 'cold') {
          idValue = 'coldValue1';
          idRes = 'coldRes1';
          idInfo = 'coldInfo1';
        } else if (temp === 'hot') {
          idValue = 'hotValue1';
          idRes = 'hotRes1';
          idInfo = 'hotInfo1';
        }
        db.transaction(function(tx) {
          tx.executeSql
          ('INSERT INTO COUNTERS ' +
          '(id, counterNumber, temp, idValue, idRes, idInfo) ' +
          'VALUES (null, ?, ?, ?, ?, ?)',
          [counterNumber, temp, idValue, idRes, idInfo]);
        });
      } else {
        tempNumber = tempAmount + 1;
        tempNumberTxt = tempNumber.toString();
        if (temp === 'cold') {

          idValue = 'coldValue' + tempNumberTxt;
          idRes = 'coldRes' + tempNumberTxt;
          idInfo = 'coldInfo' + tempNumberTxt;
        } else if (temp === 'hot') {
          idValue = 'hotValue' + tempNumberTxt;
          idRes = 'hotRes' + tempNumberTxt;
          idInfo = 'hotInfo' + tempNumberTxt;
        }
        db.transaction(function(tx) {
          tx.executeSql
          ('INSERT INTO COUNTERS ' +
          '(id, counterNumber, temp, idValue, idRes, idInfo) ' +
          'VALUES (null, ?, ?, ?, ?, ?)',
          [counterNumber, temp, idValue, idRes, idInfo]);
        });
      }
      clearHtml();
      getCountersList(function() {
        loadGenHtml();
      });
      //generateHtml(counterNumber, 'idValue');
    });
  });
};
// TODO: доделать удаление из всех таблиц
var delCounter = function(counterNumber, callback) {
  db.transaction(function(tx) {
    tx.executeSql
    ('DELETE FROM COUNTERS WHERE counterNumber="' + counterNumber + '"');
  });
  clearHtml();
  getCountersList(function() {
    loadGenHtml();
  });
  showDelResult(counterNumber);
};

var addRawEntry = function(year, month, counterNumber, rawEntry) {
  var lastMonth = month - 1;
  getCounterObject(counterNumber, function(counterObject) {
    db.transaction(function(tx) {
      tx.executeSql
      ('INSERT INTO RAWENTRIES (id, year, month, counterId, entry) ' +
      'VALUES (null, ?, ?, ?, ?)',
      [year, month, counterObject.id, rawEntry], function() {
        getLastRawEntry(year, lastMonth, counterObject.id,
          function(lastRawEntry) {
            calculateEntry(lastRawEntry, rawEntry, function(entry) {
              addEntry(year, month, counterObject.id, entry);
            });
          });
      });
    });
  });
};

var addEntry = function(year, month, counterId, entry) {
  db.transaction(function(tx) {
    tx.executeSql
    ('INSERT INTO ENTRIES (id, year, month, counterId, entry) ' +
    'VALUES (null, ?, ?, ?, ?)',
    [year, month, counterId, entry]);
  });
};

var getLastRawEntry = function(year, lastMonth, counterId, callback) {
  db.transaction(function(tx) {
    tx.executeSql('SELECT entry FROM RAWENTRIES WHERE year="' +
    year + '" AND month="' + lastMonth + '" AND counterId="' +
    counterId + '"', [], function(tx, results) {
      var reqRes = results.rows;
      var lastRawEntry;
      if (reqRes.length === 0) {
        lastRawEntry = 0;
      } else {
        lastRawEntry = reqRes.item(0).entry;
      }
      callback(lastRawEntry);
    });
  });
};
var calculateEntry = function(lastRawEntry, rawEntry, callback) {
  var entry;
  if (lastRawEntry === 0) {
    entry = 0;
  } else {
    entry = rawEntry - lastRawEntry;
  }
  callback(entry);
};

var convertTemp = function(temp) {
  if (temp === 'cold') {
    return 'Хол';
  } else if (temp === 'hot') {
    return 'Гор';
  }
};

var showDelResult = function(counterNumber) {
  document.getElementById('countersList').innerHTML = '<p>Счетчик ' +
  counterNumber + ' удален</p>';
};

var showResult = function(counterNumber, idRes, entry) {
  document.getElementById(idRes).innerHTML = 'Счетчик ' +
  counterNumber + ': ' + entry + ' м3';
};

//TODO вычисление потребления воды (инфо)
var showInfo = function(month, year) {
  db.transaction(function(tx) {
    tx.executeSql('SELECT counter, entry FROM ENTRIES WHERE month="' +
    month + '" and year="' + year + '"', [], function(tx, results) {
      var reqRes = results.rows;
      for (var i = 0; i < reqRes.length; i++) {
        document.getElementById(countersList[i].idInfo)
        .innerHTML = 'Счетчик ' + reqRes.item(i).counter + ': ' +
        reqRes.item(i).entry + ' м3';
      }
    });
  });
};
