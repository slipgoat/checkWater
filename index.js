var getEntryYear = function() {
  var y = new Date();
  return y.getFullYear();
};
var getEntryMonth = function() {
  var m = new Date();
  return m.getMonth();
};

var Counter = function(name) {
  this.name = name;
  this.retrieveValue = function() {
    return document.getElementById(this.name).value;
  };
  this.addEntry = function(year, month, entry) {
    db.transaction(function(tx) {
      tx.executeSql
      ('INSERT INTO ENTRIES (id, year, month, counter, entry) ' +
      'VALUES (null, ?, ?, ?, ?)',
      [year, month, name, entry]);
    });
  };
};

var showResult = function(counter, entry) {
  document.getElementById('values').style.display = 'none';
  document.getElementById('result').style.display = 'block';
  var res = document.getElementById(counter).innerHTML = counter + ': ' + entry;
  return res;
};

var submitValues = function() {
  var counters = [];
  var coldCounter1 = counters.push(new Counter('coldCounter1'));
  var coldCounter2 = counters.push(new Counter('coldCounter2'));
  var heatCounter1 = counters.push(new Counter('heatCounter1'));
  var heatCounter2 = counters.push(new Counter('heatCounter2'));

  for (var i = 0; i < counters.length; i++) {
    counters[i].addEntry(getEntryYear(), getEntryMonth(),
    counters[i].retrieveValue());
  }
  for (var x = 0; x < counters.length; x++) {
    showResult(counters[x].name, counters[x].retrieveValue());
  }
};
