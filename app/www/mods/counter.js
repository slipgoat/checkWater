// Module for counters and actions with them
define(['./foo'], function(foo) {
  return {
    countersList: [],

    // Sets counters list
    getCountersList: function(callback) {
      this.countersList = [];
      var countersLc = foo.getItem('counters');
      if (countersLc !== []) {
        this.countersList = foo.getItem('counters');
      }
      callback();
    },

    // Adds new counter into data base
    addCounter: function(counterNumber, location, temp) {
      if (counterNumber === null) {
        return null;
      } else {
        var record,
            len,
            len1,
            counterByTemp,
            tempAmount,
            counterId,
            idValue,
            idRes,
            idInfo;

        len1 = this.countersList.length;
        if (len1 === 0) {
          counterId = 0;
        } else {
          counterId = this.countersList[len1 - 1].counterId;
        }

        counterByTemp = foo.getObjectsFromArrayByProperty(this.countersList, 'temp', temp);
        len = counterByTemp.length;

        if (len === 0) {
          tempAmount = 0;
        } else {
          tempAmount = this.countersList[len - 1].counterId;
        }

        counterId += 1;
        var tempNumber = tempAmount + 1;
        var tempNumberTxt = tempNumber.toString();
        if (temp === 'cold') {
          idValue = 'coldValue' + tempNumberTxt;
          idRes = 'coldRes' + tempNumberTxt;
          idInfo = 'coldInfo' + tempNumberTxt;
        } else if (temp === 'hot') {
          idValue = 'hotValue' + tempNumberTxt;
          idRes = 'hotRes' + tempNumberTxt;
          idInfo = 'hotInfo' + tempNumberTxt;
        }

        record = {
          counterId: counterId,
          counterNumber: counterNumber + ', ' + location,
          temp: temp,
          idValue: idValue,
          idRes: idRes,
          idInfo: idInfo
        };
        this.countersList.push(record);
        return this.countersList;
      }
    },

    // Deletes counter from data base
    // TODO: доделать удаление из всех таблиц
    delCounter: function(counterNumber) {
      var indexOfCounterByNumber;
      indexOfCounterByNumber = foo.getIndexOfObjectFromArrayByProperty
      (this.countersList, 'counterNumber', counterNumber);

      this.countersList.splice(indexOfCounterByNumber, 1);
      return this.countersList;
    }
  };
});
