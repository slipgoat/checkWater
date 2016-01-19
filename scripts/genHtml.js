var generateHtml = function(counterNumber, idType) {
  var div;
  var element;
  switch (idType) {
    case 'idValue':
      getCounterObject(counterNumber, function(counterObject) {
        switch (counterObject.temp) {
          case 'cold':
            div = document.getElementById('coldValues');
            element = document.createElement('p');
            element.innerHTML = 'Счетчик ' + counterObject.counterNumber +
            ': <input type="text" id="' +
            counterObject.idValue + '">';
            div.appendChild(element);
            break;
          case 'hot':
            div = document.getElementById('hotValues');
            element = document.createElement('p');
            element.innerHTML = 'Счетчик ' + counterObject.counterNumber +
            ': <input type="text" id="' +
            counterObject.idValue + '">';
            div.appendChild(element);
            break;
        }
      });
      break;
    case 'idRes':
      getCounterObject(counterNumber, function(counterObject) {
        switch (counterObject.temp) {
          case 'cold':
            div = document.getElementById('coldRes');
            element = document.createElement('p');
            element.setAttribute('id', counterObject.idRes);
            div.appendChild(element);
            break;
          case 'hot':
            div = document.getElementById('hotRes');
            element = document.createElement('p');
            element.setAttribute('id', counterObject.idRes);
            div.appendChild(element);
            break;
        }
      });
      break;
    case 'idInfo':
      getCounterObject(counterNumber, function(counterObject) {
        switch (counterObject.temp) {
          case 'cold':
            div = document.getElementById('coldInfo');
            element = document.createElement('p');
            element.setAttribute('id', counterObject.idInfo);
            div.appendChild(element);
            break;
          case 'hot':
            div = document.getElementById('hotInfo');
            element = document.createElement('p');
            element.setAttribute('id', counterObject.idInfo);
            div.appendChild(element);
            break;
        }
      });
      break;
  }
};

var loadGenHtml = function() {
  for (var i = 0; i < countersList.length; i++) {
    generateHtml(countersList[i].counterNumber, 'idValue');
    generateHtml(countersList[i].counterNumber, 'idRes');
    generateHtml(countersList[i].counterNumber, 'idInfo');
  }
};
