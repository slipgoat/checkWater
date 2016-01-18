var retrieveNewCounterValue = function() {
  return document.getElementById('newCounter').value;
};

var retrieveNewCounterTempValue = function() {
  return document.getElementById('temp').value;
};

var getEntryYear = function() {
  var y = new Date();
  return y.getFullYear();
};
var getEntryMonth = function() {
  var m = new Date();
  return m.getMonth();
};

var retrieveEntryValue = function(idValue) {
  return document.getElementById(idValue).value;
};

var retrieveParamsValue = function() {
  return monthsList.indexOf(document.getElementById('months').value);
};
