var retrieveNewCounterValue = function() {
  var v = document.getElementById('newCounter').value;
  if (!v) {
    return false;
  } else {
    return v;
  }
};

var retrieveNewCounterTempValue = function() {
  return document.getElementById('temp').value;
};

var retrieveDelCounter = function() {
  return document.getElementById('selectCounter').value;
};

var getCurrentMonth = function() {
  var m = new Date();
  return m.getMonth();
};

var retrieveEntryMonthValue = function() {
  var v = document.getElementById('monthEntry').value;
  if (v === 'none') {
    return getCurrentMonth();
  } else {
    return monthsList.indexOf(v);
  }
};

var retrieveEntryValue = function(idValue) {
  var v = document.getElementById(idValue).value;
  if (!v) {
    return false;
  } else {
    return v;
  }
};

var retrieveParamsValue = function() {
  return monthsList.indexOf(document.getElementById('months').value);
};
