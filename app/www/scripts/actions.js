var addCounter = function(counterNumber, temp) {
  if (counterNumber === false) {
    alert('Необходимо ввести номер счетчика!');
  } else {
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
      });
    });
    showAddCounterResult(counterNumber, temp);
  }
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
      document.getElementById(counterObject.idValue).value = '';
      document.getElementById('monthEntry').value = 'none';
    });
  });
  document.getElementById('addEntry').style.display = 'none';
  document.getElementById('resultView').style.display = 'block';
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
        var div = document.getElementById('resList');
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
  document.getElementById('countersList').style.display = 'none';
  document.getElementById('delMsg').style.display = 'block';
  document.getElementById('delMsg').innerHTML = '<p>Счетчик ' + counterNumber +
  ' удален</p><button onclick="anotherDel()">Удалить еще</button>';
};

var showAddCounterResult = function(counterNumber, temp) {
  document.getElementById('addNewForm').style.display = 'none';
  document.getElementById('addNewMsg').style.display = 'block';
  document.getElementById('addNewMsg').innerHTML = '<p>Счетчик ' +
  counterNumber + ' (' + convertTemp(temp).toLowerCase() +
  ') добавлен</p><button onclick="anotherAddNew()">Добавить еще</button>';
};

var anotherAddNew = function() {
  document.getElementById('addNewMsg').style.display = 'none';
  document.getElementById('addNewForm').style.display = 'block';
};

var anotherDel = function() {
  document.getElementById('delMsg').style.display = 'none';
  document.getElementById('countersList').style.display = 'block';
};

var anotherEntry = function() {
  document.getElementById('resultView').style.display = 'none';
  document.getElementById('addEntry').style.display = 'block';
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
