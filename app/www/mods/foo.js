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
    }
  };
});
