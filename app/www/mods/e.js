define(['./r', './foo'], function(r, foo) {
  return {

    viewMode: {
      counters: function(status) {
        if (status === 0) {
          r.setCss('.default_counter', 'display', 'block')
            .setCss('.main_counter', 'display', 'none');
        } else if (status === 1) {
          r.setCss('.default_counter', 'display', 'none')
            .setCss('.main_counter', 'display', 'block');
        }
      },
      entries: function(status) {
        if (status === 0) {
          r.setCss('.default_entry', 'display', 'block')
            .setCss('.main_entry', 'display', 'none');
        } else if (status === 1) {
          r.setCss('.default_entry', 'display', 'none')
            .setCss('.main_entry', 'display', 'block');
        }
      },
      render: function(statusC, statusE) {
        this.counters(statusC);
        this.entries(statusE);
      }
    },

    addEntry: {
      counterNumber: '',
      idValue: '',
      htmlInput: function() {
        return '<p>Счетчик ' + this.counterNumber + ': ' +
                '<input type="number" id="' + this.idValue + '" min="0" /> м3' +
              '</p>';
      },
      htmlMonths: function(monthNum, monthName) {
        return '<option value="' + monthNum + '">' + monthName + '</option>';
      },
      render: function() {
        r.setHtml('.add_cold_entry', '')
         .setHtml('.add_hot_entry', '');
        for (var m = 0; m < foo.getCurrentMonth(); m++) {
          r.addHtml('.months_entry_select',
          this.htmlMonths(foo.monthsList[m], foo.monthsListFull[m]));
        }
        for (var i = 0; i < countersList.length; i++) {
          this.counterNumber = countersList[i].counterNumber;
          this.idValue = countersList[i].idValue;
          if (countersList[i].temp === 'cold') {
            r.addHtml('.add_cold_entry', this.htmlInput());
          } else if (countersList[i].temp === 'hot') {
            r.addHtml('.add_hot_entry', this.htmlInput());
          }
        }
      },
      events: {
        click: 'click'
      }
    },

    result: {
      counterNumber: '',
      idRes: '',
      val: 0,
      month: '',
      txtResult: function() {
        return 'Счетчик ' + this.counterNumber + ': ' + this.val + ' м3';
      },
      txtMonth: function() {
        return 'Результат за ' + this.month.toLowerCase() + ' месяц';
      },
      render: function(counterNumber, temp, idRes, val, month) {
        this.counterNumber = counterNumber;
        this.idRes = idRes;
        this.val = val;
        this.month = month;
        r.setText('#result .main h4', this.txtMonth());
        if (temp === 'cold') {
          r.addEl('.result_cold', 'p', 'id', this.idRes)
          .setText('#' + this.idRes, this.txtResult());
        } else if (temp === 'hot') {
          r.addEl('.result_hot', 'p', 'id', this.idRes)
          .setText('#' + this.idRes, this.txtResult());
        }
      },
      events: {
        click: 'click'
      }
    },

    infoParams: {
      htmlMonths: function(monthNum, monthName) {
        return '<option value="' + monthNum + '">' + monthName + '</option>';
      },
      render: function() {
        for (var m = 0; m <= foo.getCurrentMonth(); m++) {
          r.addHtml('.months_info_params_select',
          this.htmlMonths(foo.monthsList[m], foo.monthsListFull[m]));
        }
      },
      events: {
        click: 'click'
      }
    },

    info: {
      counterNumber: '',
      idInfo: '',
      val: 0,
      month: '',
      txtInfo: function() {
        return 'Счетчик ' + this.counterNumber + ': ' + this.val + ' м3';
      },
      txtMonth: function() {
        return 'Информация за ' + this.month.toLowerCase() + ' месяц';
      },
      render: function(counterNumber, temp, idInfo, val, month) {
        this.counterNumber = counterNumber;
        this.idInfo = idInfo;
        this.val = val;
        this.month = month;
        r.setText('#info .main h4', this.txtMonth());
        if (temp === 'cold') {
          r.addEl('.info_cold', 'p', 'id', this.idInfo)
          .setText('#' + this.idInfo, this.txtInfo());
        } else if (temp === 'hot') {
          r.addEl('.info_hot', 'p', 'id', this.idInfo)
          .setText('#' + this.idInfo, this.txtInfo());
        }
      }
    },

    manageCounters: {
      counterNumber: '',
      temp: '',
      html: function() {
        return '<p>Счетчик ' + this.counterNumber +
              ' (' + foo.convertTemp(this.temp) + ')</p>';
      },
      render: function() {
        r.setHtml('.manage_counters_list', '');
        for (var i = 0; i < countersList.length; i++) {
          this.counterNumber = countersList[i].counterNumber;
          this.temp = countersList[i].temp;
          r.addHtml('.manage_counters_list', this.html());
        }
      },
      events: {
        click: 'click'
      }
    },

    addCounter: {
      counterNumber: '',
      temp: '',
      html: function() {
        return '<p>Счетчик добавлен!</p>';
      },
      render: function() {
        r.setCss('.add_counter .main', 'display', 'none')
          .setCss('.add_counter_result', 'display', 'block')
          .addHtml('.add_counter_result_msg', this.html());
      },
      events: {
        click: 'click'
      }
    },

    deleteCounter: {
      counterNumber: '',
      temp: '',
      htmlDel: function() {
        return '<option value="' + this.counterNumber + '">' +
                  this.counterNumber + '(' + foo.convertTemp(this.temp) + ')' +
                  '</option>';
      },
      htmlDelRes: function() {
        return '<p>Счетчик удален</p>';
      },
      render: function() {
        r.setHtml('#delete_counter_select', '');
        for (var i = 0; i < countersList.length; i++) {
          this.counterNumber = countersList[i].counterNumber;
          this.temp = countersList[i].temp;
          r.addHtml('#delete_counter_select', this.htmlDel());
        }
      },
      renderRes: function() {
        r.setCss('.delete_counter .main', 'display', 'none')
          .setCss('.delete_counter_result', 'display', 'block')
          .addHtml('.delete_counter_result_msg', this.htmlDelRes());
      }
    }
  };
});
