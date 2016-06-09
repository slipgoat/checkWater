define(['./e', './counter', './foo'],
  function(e, counter, foo) {
  return {
    entriesList: [],

    entriesByMonth: function(year, month) {
      var entriesByYear =  foo.getObjectsFromArrayByProperty(this.entriesList, 'year', year);
      return foo.getObjectsFromArrayByProperty(entriesByYear, 'month', month);
    },

    getEntriesList: function(callback) {
      this.entriesList = [];
      var entriesLc = foo.getItem('entries');
      if (entriesLc !== []) {
        this.entriesList = foo.getItem('entries');
      }
      callback();
    },

    // Deletes entry
    deleteEntry: function(year, month) {
      //
      var len = this.entriesList.length;
      var indexes = [];
      for (var i = 0; i < len; i++) {
        if (this.entriesList[i].year === year && this.entriesList[i].month === month) {
          indexes.push(i);
        }
      }
      for (var x = indexes.length - 1; x >= 0; x--) {
        this.entriesList.splice(indexes[x], 1);
      }
      return this.entriesList;
    },

    // Adds raw entry into data base.
    // Also calculates difference between last month raw entry and
    // current month raw entry. Adds this entry into data base (addEntry)
    getDataOfNewEntry: function(year, month, counterNumber, rawEntry) {
      var that = this,
          counterByNumber;
      var lastMonth = month - 1;
      counterByNumber = foo.getObjectsFromArrayByProperty(counter.countersList, 'counterNumber', counterNumber);
          that.getLastRawEntry(year, lastMonth, counterByNumber[0].counterId,
          function(lastRawEntry) {
            that.calculateEntry(lastRawEntry, rawEntry, function(entry) {
              var record = {
                year: year,
                month: month,
                counterId: counterByNumber[0].counterId,
                entry: entry,
                rawEntry: rawEntry
              };
                that.entriesList.push(record);
            });
          });
      return this.entriesList;
    },

    // Checks last month value in data base
    checkRawEntryForMonth: function(year, month) {
      var entriesByMonth = this.entriesByMonth(year, month);
      return entriesByMonth.length > 0;
    },

    // Gets last raw entry from data base
    getLastRawEntry: function(year, lastMonth, counterId, callback) {
      var entriesByMonth = this.entriesByMonth(year, lastMonth);
      var len = entriesByMonth.length;
      var lastRawEntry = 0;
      if (len !== 0) {
        for (var i = 0; i < len; i++) {
          if (entriesByMonth[i].year === year && entriesByMonth[i].month === lastMonth && entriesByMonth[i].counterId === counterId) {
            lastRawEntry = entriesByMonth[i].rawEntry;
          }
        }
      }
      callback(lastRawEntry);
      return lastRawEntry;
    },

    // Also calculates difference between last month raw entry and current
    // month raw entry
    calculateEntry: function(lastRawEntry, rawEntry,
    callback) {
      var entry;
      if (lastRawEntry === 0) {
        entry = 0;
      } else {
        entry = rawEntry - lastRawEntry;
      }
      callback(entry);
      return entry;
    },

currentEntry: {
      year: '',
      month: ''
    },

    // Shows information for specific month
    getEntriesByMonth: function(year, month) {
      var entriesByMonth = this.entriesByMonth(year, month);

      if (entriesByMonth.length === 0) {
        return null;
      } else {
        return entriesByMonth;
      }
    }
  };
});
