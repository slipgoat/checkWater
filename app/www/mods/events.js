define(['./app', './e', './retrieve', './entry', './counter', './foo'],
function(app, e, retrieve, entry, counter, foo) {
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
        var checkMonth = entry.checkRawEntryForMonth(2016, month);

        if (checkMonth === true) {
          e.result.renderErr();
        }
         else {
          for (var i = 0; i < counter.countersList.length; i++) {
            var currentCounter = counter.countersList[i];
            var entryRecord = entry.getDataOfNewEntry(2016, month,
              currentCounter.counterNumber,
              retrieve.byId(currentCounter.idValue));
            for (var y = 0; y < entryRecord.length; y++) {
              e.result.render(currentCounter.counterNumber, currentCounter.temp,
                currentCounter.idRes, entryRecord[y].entry, entryRecord[y].rawEntry, month);
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
      var month = foo.monthsList.indexOf(retrieve.byId('months_info_params_select'));
      var entriesByMonth = entry.getEntriesByMonth
      (2016, month);

      if (entriesByMonth === null) {
        e.info.renderErr(month);
      } else {
        for (var i = 0, len = entriesByMonth.length; i < len; i++) {
          var currentCounter = foo.getObjectsFromArrayByProperty
          (counter.countersList, 'counterId', entriesByMonth[i].counterId);
          e.info.render(currentCounter[0].counterNumber, currentCounter[0].temp, currentCounter[0].idInfo,
          entriesByMonth[i].entry, entriesByMonth[i].rawEntry, entriesByMonth[i].month);
        }
      }
    });

    // Visible add new counter popup
    $('.submit_add_counter_popup').click(function() {
      $('.add_counter').addClass('visible_popup');
      $('.popup_overlay').fadeToggle();
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
