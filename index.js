var Counter = function(counterNumber, temp, idValues, idRes, idInfo) {
  this.counterNumber = counterNumber;
  this.temp = temp;
  this.idValues = idValues;
  this.idRes = idRes;
  this.idInfo = idInfo;
};
//TODO динамическое создание объектов счетчиков
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

var retrieveEntryValue = function(idValues) {
  return document.getElementById(idValues).value;
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
//TODO сделать проверку месяца (уже был или нет)
var showInfo = function(month, year) {
  if (retrieveParamsValue() < getEntryMonth()) {
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
  } else {
    document.getElementById(countersList[i].idInfo)
    .innerHTML = 'Месяц еще не наступил!';
  }
};

//TODO вычисление потребления воды (тек. результаты)
var submitValues = function() {
  document.getElementById('enterEntryView').style.display = 'none';
  document.getElementById('resultView').style.display = 'block';

  for (var i = 0; i < countersList.length; i++) {
    addEntry(getEntryYear(), getEntryMonth(),
    countersList[i].counterNumber,
    retrieveEntryValue(countersList[i].idValues));

    showResult(countersList[i].counterNumber, countersList[i].idRes,
    retrieveEntryValue(countersList[i].idValues));
  }
};

var submitParams = function() {
  document.getElementById('info').style.display = 'block';
  showInfo(retrieveParamsValue(), 2016);
};
