var Counter = function(counterNumber, temp, idValues, idRes, idInfo) {
  this.counterNumber = counterNumber;
  this.temp = temp;
  this.idValues = idValues;
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

var countersList = [coldCounter1, coldCounter2, hotCounter1, hotCounter2];

var getEntryYear = function() {
  var y = new Date();
  return y.getFullYear();
};
var getEntryMonth = function() {
  var m = new Date();
  return m.getMonth();
};

var retrieveValue = function(idValues) {
  return document.getElementById(idValues).value;
};

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

var submitValues = function() {

  document.getElementById('values').style.display = 'none';
  document.getElementById('result').style.display = 'block';

  for (var i = 0; i < countersList.length; i++) {
    addEntry(getEntryYear(), getEntryMonth(),
    countersList[i].counterNumber,
    retrieveValue(countersList[i].idValues));

    showResult(countersList[i].counterNumber, countersList[i].idRes,
    retrieveValue(countersList[i].idValues));
  }
};
