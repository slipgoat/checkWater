define(['./app', './e', './r', './retrieve', './entry', './counter', './foo'],
  function(app, e, r, retrieve, entry, counter, foo) {
    return $(document).ready(function() {

      // Minimize top bar while scrolling
      $(window).scroll(function() {
        var t = 50;
        if ($(this).scrollTop() >= t) {
          $('.top_bar').css('display', 'none');
          $('.top_bar_min').css('display', 'block');
        } else if ($(this).scrollTop() >= 0) {
          $('.top_bar').css('display', 'block');
          $('.top_bar_min').css('display', 'none');
        }
      });

      // Modify headline
      $('.li_enterEntry, .a_enterEntry').click(function() {
        $('.headline').text('Внести показания');
      });
      $('.li_info').click(function() {
        $('.headline').text('История показаний');
      });
      $('.li_manage').click(function() {
        $('.headline').text('Счетчики');
      });

      // Handle menu
      $('.toggle_menu_button img').click(function() {
        $('.menu').toggleClass('visible_menu');
        $('.overlay').fadeToggle();
      });
      $('.menu a').click(function() {
        $('.menu').removeClass('visible_menu');
        $('.overlay').fadeToggle();
      });

      // Handle menu overlay
      $('.overlay').click(function() {
        $('.menu').removeClass('visible_menu');
        $('.overlay').fadeToggle();
      });

      // Handle popup overlay
      $('.popup_overlay').click(function() {
        $('.popups *').removeClass('visible_popup');
        $('.popup_overlay').fadeToggle();
      });

      // Add new counter button
      $('.submit_add_counter').click(function() {
        var counterRecord = counter.addCounter(retrieve.byId('new_counter_number'),
          retrieve.byId('new_counter_location'), retrieve.byId('add_counter_temp_select'));
        if (counterRecord === null) {
          alert('Необходимо ввести номер счетчика!');
        } else {
          foo.setItem('counters', counterRecord);
          app.checkStatus();
          e.addCounter.render();
          document.getElementById('new_counter_number').value = '';
          document.getElementById('new_counter_location').value = '';
        }
      });

      //Change counter button
      $('.submit_change_counter').click(function() {
        var oldCounterNumber = retrieve.byAttr('.change_counter .main .change_header h4', 'data-counter-number');
        var oldTemp = retrieve.byAttr('.change_counter .main .change_header h4', 'data-temp');
        var newCounterNumber = retrieve.byId('change_counter_number');
        var newLocation = retrieve.byId('change_counter_location');
        var newTemp = retrieve.byId('change_counter_temp_select');

        var counterRecord = counter.changeCounter(oldCounterNumber, oldTemp, newCounterNumber, newLocation, newTemp);
        if (counterRecord === null) {
          alert('Необходимо ввести номер счетчика!');
        } else {
          foo.setItem('counters', counterRecord);
          app.checkStatus();
          e.changeCounter.renderRes();
          document.getElementById('change_counter_number').value = '';
          document.getElementById('change_counter_location').value = '';
        }
      });

      // Delete counter button
      $('.submit_delete_counter').click(function() {
        foo.setItem('counters', counter.delCounter(retrieve.byId('delete_counter_select')));
        app.checkStatus();
        e.deleteCounter.renderRes();
      });

      // Add new entry button
      $('.submit_add_entry').click(function() {
        var v = [];
        var validate;
        for (var x = 0; x < counter.countersList.length; x++) {
          v.push(retrieve.byId(counter.countersList[x].idValue));
          if (v[x] === null) {
            validate = false;
            break;
          }
        }
        if (validate === false) {
          alert('Заполните показания полностью!');
        } else {
          $('.result').addClass('visible_popup');
          $('.popup_overlay').fadeToggle();
          var month = retrieve.entryMonthValue();
          var year = retrieve.entryYearValue();
          var checkMonthErr = entry.checkRawEntryForMonth(year, month);

          if (checkMonthErr === true) {
            e.result.renderErr();
          } else {
            var entryRecord;

            for (var i = 0; i < counter.countersList.length; i++) {
              var currentCounter = counter.countersList[i];

              entryRecord = entry.getDataOfNewEntry(year, month,
                currentCounter.counterNumber,
                retrieve.byId(currentCounter.idValue));
              for (var y = 0; y < entryRecord.length; y++) {
                e.result.render(currentCounter.counterNumber, currentCounter.temp,
                  currentCounter.idRes, entryRecord[y].entry, entryRecord[y].rawEntry, month, year);
              }
            }
            foo.setItem('entries', entryRecord);
          }
          app.checkStatus();
        }
      });

      // Submit monthly info parameters button
      $('.submit_info_params').click(function() {
        $('.info').addClass('visible_popup');
        $('.popup_overlay').fadeToggle();
        entry.currentEntry.year = retrieve.byId('years_info_params_select');
        entry.currentEntry.month = foo.monthsList.indexOf(retrieve.byId('months_info_params_select'));
        var month = entry.currentEntry.month;
        var year = entry.currentEntry.year;
        var entriesByMonth = entry.getEntriesByMonth(year, month);

        if (entriesByMonth === null) {
          e.info.renderErr(month, year);
        } else {
          for (var i = 0, len = entriesByMonth.length; i < len; i++) {
            var currentCounter = foo.getObjectsFromArrayByProperty(counter.countersList, 'counterId', entriesByMonth[i].counterId);
            e.info.render(currentCounter[0].counterNumber, currentCounter[0].temp, currentCounter[0].idInfo,
              entriesByMonth[i].entry, entriesByMonth[i].rawEntry, entriesByMonth[i].month, entriesByMonth[i].year);
          }
        }
      });

      $('.submit_delete_entry').click(function() {
        r.setCss('.info .main', 'display', 'none')
          .setCss('.delete_entry_msg', 'display', 'block')
          .setCss('.submit_delete_entry', 'display', 'none');
        foo.setItem('entries', entry.deleteEntry(entry.currentEntry.year, entry.currentEntry.month));
        app.checkStatus();
      });

      // Visible add new counter popup
      $('.submit_add_counter_popup').click(function() {
        $('.add_counter').addClass('visible_popup');
        $('.popup_overlay').fadeToggle();
      });

      // Visible change new counter popup
      $(document).on('click', '.submit_change_counter_popup', function() {
        $('.change_counter').addClass('visible_popup');
        $('.popup_overlay').fadeToggle();
        counter.current.number = retrieve.byAttr(this, 'data-counter-number');
        counter.current.temp = retrieve.byAttr(this, 'data-temp');
        e.changeCounter.render(counter.current.number, counter.current.temp);
      });

      // Visible delete counter popup
      $('.submit_delete_counter_popup').click(function() {
        $('.delete_counter').addClass('visible_popup');
        $('.popup_overlay').fadeToggle();
      });

      // Another counter add button
      $('.submit_add_another_counter').click(function() {
        $('.add_counter_result').css('display', 'none');
        $('.add_counter .main').css('display', 'block');
      });

      // Another counter delete button
      $('.submit_delete_another_counter').click(function() {
        $('.delete_counter_result').css('display', 'none');
        $('.delete_counter .main').css('display', 'block');
      });

      // Another entry add button
      $(document).on('click', '#submitAnotherEntry', function() {
        $('#resultView').css('display', 'none');
        $('#addEntry').css('display', 'block');
      });
    });
  });