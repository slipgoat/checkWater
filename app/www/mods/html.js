define(['./counter', './foo'], function(counter, foo) {
  return {
    generateHtml: function(counterNumber, idType) {
      var div;
      var element;
      switch (idType) {
        case 'idValue':
          counter.getCounterObject(counterNumber, function(counterObject) {
            switch (counterObject.temp) {
              case 'cold':
                div = document.getElementById('coldValues');
                element = document.createElement('p');
                element.innerHTML = 'Счетчик ' + counterObject.counterNumber +
                ': <input type="number" id="' +
                counterObject.idValue + '" min="0">';
                div.appendChild(element);
                break;
              case 'hot':
                div = document.getElementById('hotValues');
                element = document.createElement('p');
                element.innerHTML = 'Счетчик ' + counterObject.counterNumber +
                ': <input type="number" id="' +
                counterObject.idValue + '" min="0">';
                div.appendChild(element);
                break;
            }
          });
          break;
        case 'idRes':
          counter.getCounterObject(counterNumber, function(counterObject) {
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
          counter.getCounterObject(counterNumber, function(counterObject) {
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
        case 'idDel':
          counter.getCounterObject(counterNumber, function(counterObject) {
            div = document.getElementById('selectCounter');
            element = document.createElement('option');
            element.setAttribute('value', counterObject.counterNumber);
            element.innerHTML = counterObject.counterNumber +
            ', ' + foo.convertTemp(counterObject.temp);
            div.appendChild(element);
          });
          break;
        case 'idMonth':
          div = document.getElementById('monthEntry');
          for (var i = 0; i < foo.getCurrentMonth(); i++) {
            element = document.createElement('option');
            element.setAttribute('value', foo.monthsList[i]);
            element.innerHTML = foo.monthsListFull[i];
            div.appendChild(element);
          }
      }
    },

    clearHtml: function() {
      document.getElementById('coldValues').innerHTML = '';
      document.getElementById('hotValues').innerHTML = '';
      document.getElementById('coldRes').innerHTML = '';
      document.getElementById('hotRes').innerHTML = '';
      document.getElementById('coldInfo').innerHTML = '';
      document.getElementById('hotInfo').innerHTML = '';
      document.getElementById('selectCounter').innerHTML = '';
    },

    loadGenHtml: function() {
      for (var i = 0; i < countersList.length; i++) {
        this.generateHtml(countersList[i].counterNumber, 'idValue');
        this.generateHtml(countersList[i].counterNumber, 'idRes');
        this.generateHtml(countersList[i].counterNumber, 'idInfo');
        this.generateHtml(countersList[i].counterNumber, 'idDel');
      }
    }
  };
});
