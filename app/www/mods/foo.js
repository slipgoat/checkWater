define(function() {
  return {
    monthsList: [
      'jan', 'feb',
      'march', 'apr', 'may',
      'june', 'jule', 'aug',
      'sep', 'oct', 'nov',
      'dec'
    ],
    monthsListFull: [
      'Январь', 'Февраль',
      'Март', 'Апрель', 'Май',
      'Июнь', 'Июль', 'Август',
      'Сентябрь', 'Октябрь', 'Ноябрь',
      'Декабрь'
    ],
    getCurrentMonth: function() {
      var m = new Date();
      return m.getMonth();
    },
    convertTemp: function(temp) {
      if (temp === 'cold') {
        return 'Хол';
      } else if (temp === 'hot') {
        return 'Гор';
      }
    },
    getObjectsFromArrayByProperty: function(array, property, value) {
      var len = array.length;
      var newArray = [];

      if (len === 0) {
        return newArray;
      } else {
        for (var i = 0; i < len; i++) {
          if (array[i][property] === value) newArray.push(array[i]);
        }
        return newArray;
      }
    },
    getIndexOfObjectFromArrayByProperty: function(array, property, value) {
      var len = array.length;
      if (len === 0) {
        return null;
      } else {
        for (var i = 0; i < len; i++) {
          if (array[i][property] === value) return i;
        }
      }
    },
    setItem: function(key, value) {
      return localStorage.setItem(key, JSON.stringify(value));
    },
    getItem: function(key) {
      return JSON.parse(localStorage.getItem(key));
    }
  };
});
