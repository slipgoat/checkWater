define(['./dataBase', './e', './counter', './foo'],
  function(dataBase, e, counter, foo) {
  return {
    entriesList: [],
    getEntriesList: function(callback) {
      var that = this;
      dataBase.select(['*'], 'ENTRIES', '', '', function(tx, results) {
        that.entriesList = [];
        var reqRes = results.rows;
        console.log(reqRes);
        for (var i = 0; i < reqRes.length; i++) {
          that.entriesList.push(reqRes.item(i));
        }
        callback();
      });
    },

    // Adds raw entry into data base.
    // Also calculates difference between last month raw entry and
    // current month raw entry. Adds this entry into data base (addEntry)
    addEntry: function(year, month, counterNumber, rawEntry, callback) {
      var that = this;
      this.checkRawEntryForMonth(year, month, function() {
        var lastMonth = month - 1;
        counter.getCounterObject(counterNumber, function(counterObject) {
            that.getLastRawEntry(year, lastMonth, counterObject.id,
            function(lastRawEntry) {
              that.calculateEntry(lastRawEntry, rawEntry, function(entry) {
                e.result.render(counterNumber, counterObject.temp,
                counterObject.id, entry, rawEntry, month);
              },
              function(entry) {
                that.insertEntry(year, month, counterObject.id, entry, rawEntry,
                function() {
                  callback();
                });
              });
            });
          document.getElementById(counterObject.idValue).value = '';
          document.getElementById('months_entry_select').value = 'none';
        });
      });
    },

    // Adds calculated entry into data base
    insertEntry: function(year, month, counterId, entry, rawEntry, callback) {
      dataBase.insert(['year', 'month', 'counterId', 'entry', 'rawEntry'], 'ENTRIES',
      [year, month, counterId, entry, rawEntry], function() {});
      callback();
    },

    // Checks last month value in data base
    checkRawEntryForMonth: function(year, month, callback) {
      dataBase.select(['entry'], 'ENTRIES', 'WHERE year="' +
      year + '" AND month="' + month + '"', '', function(tx, results) {
        var reqRes = results.rows;
        if (reqRes.length > 0) {
          e.result.renderErr();
        } else {
          callback();
        }
      });
    },

    // Gets last raw entry from data base
    getLastRawEntry: function(year, lastMonth, counterId, callback) {
      dataBase.select(['rawEntry'], 'ENTRIES', 'WHERE year="' +
      year + '" AND month="' + lastMonth + '" AND counterId="' +
      counterId + '"', '', function(tx, results) {
        var reqRes = results.rows;
        var lastRawEntry;
        if (reqRes.length === 0) {
          lastRawEntry = 0;
        } else {
          lastRawEntry = reqRes.item(0).rawEntry;
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

    // Shows information for specific month
    showInfo: function(month, year) {
      month = foo.monthsList.indexOf(month);
      dataBase.select(['*'], 'ENTRIES', 'WHERE month="' + month +
      '" AND year="' + year + '"', '', function(tx, results) {
        var reqRes = results.rows;
        if (reqRes.length === 0) {
          e.info.renderErr(month);
        } else {
          for (var i = 0; i < reqRes.length; i++) {
            e.info.render(counter.countersList[i].counterNumber,
            counter.countersList[i].temp, counter.countersList[i].idInfo, reqRes.item(i).entry,
            reqRes.item(i).rawEntry, month);
          }
        }
      });
    }
  };
});
