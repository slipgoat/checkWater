var submmitNewCounter = function() {
  addCounter(retrieveNewCounterValue(), retrieveNewCounterTempValue());
};

var submmitDelCounter = function() {
  delCounter(retrieveDelCounter());
};

var submitValues = function() {
  document.getElementById('enterEntryView').style.display = 'none';
  document.getElementById('resultView').style.display = 'block';

  for (var i = 0; i < countersList.length; i++) {
    addRawEntry(getEntryYear(), getEntryMonth(),
    countersList[i].counterNumber,
    retrieveEntryValue(countersList[i].idValue));

    showResult(countersList[i].counterNumber, countersList[i].idRes);
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
