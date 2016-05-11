// Module for counters and actions with them
define(['./dataBase', './foo'], function(dataBase, foo) {
  return {
    //countersList: null,

    // Sets counters list
    getCountersList: function(callback) {
      countersList = [];
      dataBase.select(['*'], 'COUNTERS', '', '', function(tx, results) {
        //this.countersList = [];
        var reqRes = results.rows;
        console.log(reqRes);
        for (var i = 0; i < reqRes.length; i++) {
          countersList.push(reqRes.item(i));
        }
        callback();
      });
    },

    // Adds new counter into data base
    addCounter: function(counterNumber, location, temp, htmlCallback) {
      if (counterNumber === false) {
        alert('Необходимо ввести номер счетчика!');
      } else {
        dataBase.select(['id'], 'COUNTERS', 'WHERE temp="' + temp + '"', '',
        function(tx, results) {
          var reqRes = results.rows;
          var i = reqRes.length;
          var tempAmount = 0;
          var idValue = '';
          var idRes = '';
          var idInfo = '';
          if (i === 0) {
            tempAmount = 0;
          } else {
            tempAmount = reqRes.item(i - 1).id;
          }
          tempNumber = tempAmount + 1;
          tempNumberTxt = tempNumber.toString();
          if (temp === 'cold') {
            idValue = 'coldValue' + tempNumberTxt;
            idRes = 'coldRes' + tempNumberTxt;
            idInfo = 'coldInfo' + tempNumberTxt;
          } else if (temp === 'hot') {
            idValue = 'hotValue' + tempNumberTxt;
            idRes = 'hotRes' + tempNumberTxt;
            idInfo = 'hotInfo' + tempNumberTxt;
          }
          dataBase.insert
          (['counterNumber', 'temp', 'idValue', 'idRes', 'idInfo'],
          'COUNTERS', [counterNumber + ', ' + location, temp, idValue, idRes, idInfo], function() {});
          htmlCallback();
        });
      }
    },

    // Deletes counter from data base
    // TODO: доделать удаление из всех таблиц
    delCounter: function(counterNumber, htmlCallback) {
      dataBase.db.transaction(function(tx) {
        tx.executeSql
        ('DELETE FROM COUNTERS WHERE counterNumber="' + counterNumber + '"');
      });
      htmlCallback();
    },

    // Gets counter object from table's row in COUNTERS table
    getCounterObject: function(counterNumber, callback) {
      return dataBase.select(['*'], 'COUNTERS',
      'WHERE counterNumber="' + counterNumber + '"', '', function(tx, results) {
        var counterObject = results.rows.item(0);
        callback(counterObject);
      });
    }
  };
});
