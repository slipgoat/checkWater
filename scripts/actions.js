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
      generateHtml(counterNumber, 'idValue');
    });
  });
};

var delCounter = function(counterNumber, callback) {
  db.transaction(function(tx) {
    tx.executeSql
    ('DELETE FROM COUNTERS WHERE counterNumber="' + counterNumber + '"');
  });
  showDelResult(counterNumber);
};

var addEntry = function(year, month, counterNumber, entry) {
  db.transaction(function(tx) {
    tx.executeSql
    ('INSERT INTO ENTRIES (id, year, month, counter, entry) ' +
    'VALUES (null, ?, ?, ?, ?)',
    [year, month, counterNumber, entry]);
  });
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
