var submmitNewCounter = function() {
  addCounter(retrieveNewCounterValue(), retrieveNewCounterTempValue());
  document.getElementById('newCounter').value = '';
};

var submmitDelCounter = function() {
  delCounter(retrieveDelCounter());
};

var submitValues = function() {
  var v = [];
  var validate;
  for (var x = 0; x < countersList.length; x++) {
    v.push(retrieveEntryValue(countersList[x].idValue));
    if (v[x] === false) {
      validate = false;
      break;
    }
  }
  if (validate === false) {
    alert('Значение не должно быть пустым!');
  } else {
    for (var i = 0; i < countersList.length; i++) {
      addRawEntry(2016, retrieveEntryMonthValue(),
      countersList[i].counterNumber,
      retrieveEntryValue(countersList[i].idValue));

      showResult(countersList[i].counterNumber, countersList[i].idRes);
    }
  }
};

var submitParams = function() {
  document.getElementById('info').style.display = 'none';
  document.getElementById('invalidMonth').style.display = 'none';
  if (retrieveParamsValue() <= getCurrentMonth()) {
    document.getElementById('info').style.display = 'block';
    showInfo(retrieveParamsValue(), 2016);
  } else {
    document.getElementById('invalidMonth').style.display = 'block';
    document.getElementById('errorMsg')
    .innerHTML = 'Месяц еще не наступил!';
  }
};
