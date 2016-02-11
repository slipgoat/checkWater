define(['./dataBase', './counter', './foo'], function(dataBase, counter, foo) {
  return {
    // Adds raw entry into data base.
    // Also calculates difference between last month raw entry and
    // current month raw entry. Adds this entry into data base (addEntry)
    addRawEntry: function(year, month, counterNumber, rawEntry) {
      debugger;
      var that = this;
      this.checkRawEntryForMonth(year, month, function() {
        var lastMonth = month - 1;
        counter.getCounterObject(counterNumber, function(counterObject) {
          dataBase.insert(['year', 'month', 'counterId', 'entry'], 'RAWENTRIES',
          [year, month, counterObject.id, rawEntry], function() {
            that.getLastRawEntry(year, lastMonth, counterObject.id,
            function(lastRawEntry) {
              that.calculateEntry(lastRawEntry, rawEntry, function(entry) {
                that.showResult(counterObject.counterNumber, counterObject.idRes,
                entry);
              },
              function(entry) {
                that.addEntry(year, month, counterObject.id, entry);
              });
            });
          });
          document.getElementById(counterObject.idValue).value = '';
          document.getElementById('monthEntry').value = 'none';
        });
      });
      document.getElementById('addEntry').style.display = 'none';
      document.getElementById('resultView').style.display = 'block';
    },

    // Adds calculated entry into data base
    addEntry: function(year, month, counterId, entry) {
      dataBase.insert(['year', 'month', 'counterId', 'entry'], 'ENTRIES',
      [year, month, counterId, entry], function() {});
    },

    // Checks last month value in data base
    checkRawEntryForMonth: function(year, month, callback) {
      dataBase.select(['entry'], 'RAWENTRIES', 'WHERE year="' +
      year + '" AND month="' + month + '"', '', function(tx, results) {
        var reqRes = results.rows;
        if (reqRes.length > 0) {
          var div = document.getElementById('resList');
          div.innerHTML = '<h2>Данные за этот месяц уже внесены!</h2>';
        } else {
          callback();
        }
      });
    },

    // Gets last raw entry from data base
    getLastRawEntry: function(year, lastMonth, counterId, callback) {
      dataBase.select(['entry'], 'RAWENTRIES', 'WHERE year="' +
      year + '" AND month="' + lastMonth + '" AND counterId="' +
      counterId + '"', '', function(tx, results) {
        var reqRes = results.rows;
        var lastRawEntry;
        if (reqRes.length === 0) {
          lastRawEntry = 0;
        } else {
          lastRawEntry = reqRes.item(0).entry;
        }
        callback(lastRawEntry);
      });
    },

    // Also calculates difference between last month raw entry and current
    // month raw entry
    calculateEntry: function(lastRawEntry, rawEntry,
    callbackShow, callbackAdd) {
      var entry;
      if (lastRawEntry === 0) {
        entry = 0;
      } else {
        entry = rawEntry - lastRawEntry;
      }
      callbackShow(entry);
      callbackAdd(entry);
    },

    // Shows result for added entry (calculated)
    showResult: function(counterNumber, idRes, entry) {
      document.getElementById(idRes).innerHTML = 'Счетчик ' +
      counterNumber + ': ' + entry + ' м3';
    },

    // Shows information for specific month
    showInfo: function(month, year, callback) {
      document.getElementById('h4_info').innerHTML = 'Результат за ' +
      foo.monthsListFull[month].toLowerCase() + ' месяц';
      dataBase.select(['*'], 'ENTRIES', 'WHERE month="' + month +
      '" AND year="' + year + '"', '', function(tx, results) {
        var reqRes = results.rows;
        for (var i = 0; i < reqRes.length; i++) {
          document.getElementById(countersList[i].idInfo)
          .innerHTML = 'Счетчик ' + countersList[i].counterNumber + ': ' +
          reqRes.item(i).entry + ' м3';
        }
      });
    }
  };
});
