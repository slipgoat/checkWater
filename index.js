var addCounter = function(counterNumber, type) {
  db.transaction(function(tx) {
    tx.executeSql('SELECT id FROM COUNTERS WHERE type="' +
    type + '"', [], function(tx, results) {
      var typeAmount;
      var idValue;
      var idRes;
      var idInfo;
      typeAmount = results.rows.length;
      if (typeAmount === 0) {
        if (type === 'cold') {
          idValue = 'coldValue1';
          idRes = 'coldRes1';
          idInfo = 'coldInfo1';
        } else if (type === 'hot') {
          idValue = 'hotValue1';
          idRes = 'hotRes1';
          idInfo = 'hotInfo1';
        }
        db.transaction(function(tx) {
          tx.executeSql
          ('INSERT INTO COUNTERS ' +
          '(id, counterNumber, type, idValue, idRes, idInfo) ' +
          'VALUES (null, ?, ?, ?, ?, ?)',
          [counterNumber, type, idValue, idRes, idInfo]);
        });
      } else {
        typeNumber = typeAmount + 1;
        typeNumberTxt = typeNumber.toString();
        if (type === 'cold') {

          idValue = 'coldValue' + typeNumberTxt;
          idRes = 'coldRes' + typeNumberTxt;
          idInfo = 'coldInfo' + typeNumberTxt;
        } else if (type === 'hot') {
          idValue = 'hotValue' + typeNumberTxt;
          idRes = 'hotRes' + typeNumberTxt;
          idInfo = 'hotInfo' + typeNumberTxt;
        }
        db.transaction(function(tx) {
          tx.executeSql
          ('INSERT INTO COUNTERS ' +
          '(id, counterNumber, type, idValue, idRes, idInfo) ' +
          'VALUES (null, ?, ?, ?, ?, ?)',
          [counterNumber, type, idValue, idRes, idInfo]);
        });
      }
    });
  });
};

//TODO динамическое создание объектов счетчиков
var Counter = function(counterNumber, temp, idValue, idRes, idInfo) {
  this.counterNumber = counterNumber;
  this.temp = temp;
  this.idValue = idValue;
  this.idRes = idRes;
  this.idInfo = idInfo;
};

var coldCounter1 = new Counter
('coldNumber1', 'cold', 'coldCounter1', 'coldRes1', 'coldInfo1');
var coldCounter2 = new Counter
('coldNumber2', 'cold', 'coldCounter2', 'coldRes2', 'coldInfo2');
var hotCounter1 = new Counter
('hotNumber1', 'hot', 'hotCounter1', 'hotRes1', 'hotInfo1');
var hotCounter2 = new Counter
('hotNumber2', 'hot', 'hotCounter2', 'hotRes2', 'hotInfo2');
//TODO автоматичское добавление счетчиков в массив
var countersList = [coldCounter1, coldCounter2, hotCounter1, hotCounter2];
var monthsList = [
    'jan', 'feb',
    'march', 'apr', 'may',
    'june', 'jule', 'aug',
    'sep', 'oct', 'nov',
    'dec'
];

var getEntryYear = function() {
  var y = new Date();
  return y.getFullYear();
};
var getEntryMonth = function() {
  var m = new Date();
  return m.getMonth();
};

var retrieveNewCounterValue = function() {
  return document.getElementById('newCounter').value;
};

var retrieveNewCounterTypeValue = function() {
  return document.getElementById('type').value;
};

var retrieveEntryValue = function(idValue) {
  return document.getElementById(idValue).value;
};

var retrieveParamsValue = function() {
  return monthsList.indexOf(document.getElementById('months').value);
};

/*Функция выбора последней записи из ДБ
Скорей всего надо реализовать две таблицы: одна для сырых показаний,
другая для вычисленных показаний потребления.
Таким образом данная функция преобразуется во что-то другое.
*/
/*var getLastEntry = function() {
  db.transaction(function(tx) {
    tx.executeSql
    ('SELECT counter, entry, MAX(month), MAX(year) FROM ENTRIES' +
    'GROUP BY counter, entry', [], function(tx, results) {
      var reqRes = results.rows;
      for (var i = 0; i < reqRes.length; i++) {
        var counterNumber = reqRes.item(i).counter;
        var lastEntry = reqRes.item(i).entry;
        var lastEntryArray = [counterNumber, lastEntry];
        return lastEntryArray;
      }
    });
  });
};*/

var addEntry = function(year, month, counterNumber, entry) {
  db.transaction(function(tx) {
    tx.executeSql
    ('INSERT INTO ENTRIES (id, year, month, counter, entry) ' +
    'VALUES (null, ?, ?, ?, ?)',
    [year, month, counterNumber, entry]);
  });
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

//TODO вычисление потребления воды (тек. результаты)
var submitValues = function() {
  document.getElementById('enterEntryView').style.display = 'none';
  document.getElementById('resultView').style.display = 'block';

  for (var i = 0; i < countersList.length; i++) {
    addEntry(getEntryYear(), getEntryMonth(),
    countersList[i].counterNumber,
    retrieveEntryValue(countersList[i].idValue));

    showResult(countersList[i].counterNumber, countersList[i].idRes,
    retrieveEntryValue(countersList[i].idValue));
  }
};

var submitParams = function() {
  document.getElementById('info').style.display = 'none';
  document.getElementById('invalidMonth').style.display = 'none';
  if (retrieveParamsValue() <= getEntryMonth()) {
    document.getElementById('info').style.display = 'block';
    showInfo(retrieveParamsValue(), 2016);
  } else {
    document.getElementById('invalidMonth').style.display = 'block';
    document.getElementById('errorMsg')
    .innerHTML = 'Месяц еще не наступил!';
  }
};

var submmitNewCounter = function() {
  addCounter(retrieveNewCounterValue(), retrieveNewCounterTypeValue());
};
