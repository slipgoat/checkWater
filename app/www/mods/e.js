define(['./r', './foo', './counter', './entry'], function(r, foo, counter, entry) {
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
      htmlMonths: function(monthNum, monthName, selected) {
        var selectedSign = '';

        if (selected) {
          selectedSign = 'selected';
        }

        return '<option value="' + monthNum + '" ' + selectedSign + '>' + monthName + '</option>';
      },
      htmlYears: function(year, selected) {
        var selectedSign = '';

        if (selected) {
          selectedSign = 'selected';
        }
        return '<option value="' + year + '" ' + selectedSign + '>' + year + '</option>';
      },
      render: function() {
        var selected = false;


        r.setHtml('.add_cold_entry', '')
          .setHtml('.add_hot_entry', '')
          .setHtml('#months_entry_select', '')
          .setHtml('#years_entry_select', '');
        for (var y = 0; y < foo.yearsList.length; y++) {
          if (foo.yearsList[y] === foo.getCurrentYear()) {
            selected = true;
          }
          r.addHtml('#years_entry_select',
            this.htmlYears(foo.yearsList[y], selected));

          selected = false;
        }
        for (var m = 0; m < foo.monthsList.length; m++) {
          if (m === foo.getCurrentMonth()) {
            selected = true;
          }
          r.addHtml('#months_entry_select',
            this.htmlMonths(foo.monthsList[m], foo.monthsListFull[m], selected));

          selected = false;
        }
        for (var i = 0; i < counter.countersList.length; i++) {
          this.counterNumber = counter.countersList[i].counterNumber;
          this.idValue = counter.countersList[i].idValue;
          if (counter.countersList[i].temp === 'cold') {
            r.addHtml('.add_cold_entry', this.htmlInput());
          } else if (counter.countersList[i].temp === 'hot') {
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
      rawVal: 0,
      month: '',
      year: 0,
      txtResult: function() {
        return 'Счетчик ' + this.counterNumber + ': ' + this.val + ' (' + this.rawVal + ') м3';
      },
      txtMonth: function() {
        return 'Результат за ' + this.month.toLowerCase() + ' месяц ' + this.year + ' года';
      },
      render: function(counterNumber, temp, idRes, val, rawVal, month, year) {
        this.counterNumber = counterNumber;
        this.idRes = idRes;
        this.val = val;
        this.rawVal = rawVal;
        this.month = foo.monthsListFull[month];
        this.year = year;
        r.setCss('.result .main', 'display', 'block')
          .setCss('.result .error_msg', 'display', 'none')
          .setText('.result .main h4', this.txtMonth());
        if (temp === 'cold') {
          r.addEl('.result_cold', 'p', 'id', this.idRes)
            .setText('#' + this.idRes, this.txtResult());
        } else if (temp === 'hot') {
          r.addEl('.result_hot', 'p', 'id', this.idRes)
            .setText('#' + this.idRes, this.txtResult());
        }
      },
      renderErr: function() {
        r.setCss('.result .main', 'display', 'none')
          .setCss('.result .error_msg', 'display', 'block');
      },
      events: {
        click: 'click'
      }
    },

    infoParams: {
      htmlYears: function(year, selected) {
        var selectedSign = '';

        if (selected) {
          selectedSign = 'selected';
        }

        return '<option value="' + year + '" ' + selectedSign + '>' + year + '</option>';
      },
      htmlMonths: function(monthNum, monthName, selected) {
        var selectedSign = '';

        if (selected) {
          selectedSign = 'selected';
        }

        return '<option value="' + monthNum + '" ' + selectedSign + '>' + monthName + '</option>';
      },
      render: function() {
        var selected = false;

        r.setHtml('#months_info_params_select', '')
          .setHtml('#years_info_params_select', '');
        for (var y = 0; y < foo.yearsList.length; y++) {
          if (foo.yearsList[y] === foo.getCurrentYear()) {
            selected = true;
          }
          r.addHtml('#years_info_params_select',
            this.htmlYears(foo.yearsList[y], selected));

          selected = false;
        }
        for (var m = 0; m < foo.monthsList.length; m++) {
          if (m === foo.getCurrentMonth()) {
            selected = true;
          }

          r.addHtml('#months_info_params_select',
            this.htmlMonths(foo.monthsList[m], foo.monthsListFull[m], selected));

          selected = false;
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
      rawVal: 0,
      month: '',
      year: 0,
      txtInfo: function() {
        return 'Счетчик ' + this.counterNumber + ': ' + this.val +
          ' (' + this.rawVal + ')' + ' м3';
      },
      txtMonth: function() {
        return 'Информация за ' + foo.monthsListFull[this.month].toLowerCase() + ' месяц ' + this.year + ' ';
      },
      render: function(counterNumber, temp, idInfo, val, rawVal, month, year) {
        this.counterNumber = counterNumber;
        this.idInfo = idInfo;
        this.val = val;
        this.rawVal = rawVal;
        this.month = month;
        this.year = year;
        r.setCss('.submit_delete_entry', 'display', 'none');
        if (this.month === entry.getLastMonth()) {
          r.setCss('.submit_delete_entry', 'display', 'block');
        }
        r.setCss('.info .main', 'display', 'block')
          .setCss('.info .error_msg', 'display', 'none')
          .setCss('.delete_entry_msg', 'display', 'none')
          .setText('.info h4', this.txtMonth());
        if (temp === 'cold') {
          r.addEl('.info_cold', 'p', 'id', this.idInfo)
            .setText('#' + this.idInfo, this.txtInfo());
        } else if (temp === 'hot') {
          r.addEl('.info_hot', 'p', 'id', this.idInfo)
            .setText('#' + this.idInfo, this.txtInfo());
        }
      },
      renderErr: function(month, year) {
        this.month = month;
        this.year = year;
        r.setCss('.info .main', 'display', 'none')
          .setCss('.info .error_msg', 'display', 'block')
          .setCss('.delete_entry_msg', 'display', 'none')
          .setCss('.submit_delete_entry', 'display', 'none')
          .setText('.info h4', this.txtMonth());
      }
    },

    manageCounters: {
      counterNumber: '',
      temp: '',
      html: function() {
        return '<p>Счетчик ' + this.counterNumber +
          ' (' + foo.convertTemp(this.temp) + ') <button class="submit_change_counter_popup" data-counter-number="' +
          this.counterNumber + '" data-temp="' + this.temp + '">Изменить</button></p>';
      },
      render: function() {
        r.setHtml('.manage_counters_list', '');
        for (var i = 0; i < counter.countersList.length; i++) {
          this.counterNumber = counter.countersList[i].counterNumber;
          this.temp = counter.countersList[i].temp;
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
          .setHtml('.add_counter_result_msg', this.html());
      },
      events: {
        click: 'click'
      }
    },

    changeCounter: {
      counterNumber: '',
      temp: '',
      header: function() {
        return '<h4 data-counter-number="' + this.counterNumber + '" data-temp="' + this.temp + '">Изменение счетчика ' +
          this.counterNumber + ', (' + foo.convertTemp(this.temp) + ')</h4>';
      },
      htmlChangeRes: function() {
        return '<p>Счетчик изменен!</p>';
      },
      render: function(counterNumber, temp) {
        this.counterNumber = counterNumber;
        this.temp = temp;
        r.setCss('.change_counter .main', 'display', 'block')
          .setCss('.change_counter_result', 'display', 'none')
          .setHtml('.change_counter .main .change_header', this.header());
      },
      renderRes: function() {
        r.setCss('.change_counter .main', 'display', 'none')
          .setCss('.change_counter_result', 'display', 'block')
          .setHtml('.change_counter_result_msg', this.htmlChangeRes());
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
        for (var i = 0; i < counter.countersList.length; i++) {
          this.counterNumber = counter.countersList[i].counterNumber;
          this.temp = counter.countersList[i].temp;
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