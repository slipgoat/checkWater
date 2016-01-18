var submmitNewCounter = function() {
  addCounter(retrieveNewCounterValue(), retrieveNewCounterTempValue());
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
