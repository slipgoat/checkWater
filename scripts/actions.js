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
  checkRawEntryForMonth(year, month, function() {
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
              showResult(counterObject.counterNumber, counterObject.idRes,
              entry);
            },
            function(entry) {
              addEntry(year, month, counterObject.id, entry);
            });
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

var checkRawEntryForMonth = function(year, month, callback) {
  db.transaction(function(tx) {
    tx.executeSql
    ('SELECT entry FROM RAWENTRIES WHERE year="' +
    year + '" AND month="' + month + '"', [], function(tx, results) {
      var reqRes = results.rows;
      if (reqRes.length > 0) {
        var div = document.getElementById('resultView');
        div.innerHTML = '<h2>Данные за этот месяц уже внесены!</h2>';
      } else {
        callback();
      }
    });
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
var calculateEntry = function(lastRawEntry, rawEntry,
callbackShow, callbackAdd) {
  var entry;
  if (lastRawEntry === 0) {
    entry = 0;
  } else {
    entry = rawEntry - lastRawEntry;
  }
  callbackShow(entry);
  callbackAdd(entry);
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

var showInfo = function(month, year, callback) {
  document.getElementById('h1_info').innerHTML = 'Результат за ' +
  monthsListFull[month].toLowerCase() + ' месяц';
  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM ENTRIES WHERE month="' +
    month + '" AND year="' + year + '"', [], function(tx, results) {
      var reqRes = results.rows;
      for (var i = 0; i < reqRes.length; i++) {
        document.getElementById(countersList[i].idInfo)
        .innerHTML = 'Счетчик ' + countersList[i].counterNumber + ': ' +
        reqRes.item(i).entry + ' м3';
      }
    });
  });
};
