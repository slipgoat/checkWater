define(['../lib/jquery', './app', './retrieve', './entry', './counter'],
function(jquery, app, retrieve, entry, counter) {
  return $(document).ready(function() {

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

    $('.li_enterEntry').click(function() {
      $('.headline').text('Внести показания');
    });
    $('.li_info').click(function() {
      $('.headline').text('Статистика');
    });
    $('.li_manage').click(function() {
      $('.headline').text('Счетчики');
    });

    $('.toggle_menu_button img').click(function() {
      $('.menu').toggleClass('visible_menu');
      $('.overlay').fadeToggle();
    });
    $('.menu a').click(function() {
      $('.menu').removeClass('visible_menu');
      $('.overlay').fadeToggle();
    });

    $('.overlay').click(function() {
      $('.menu').removeClass('visible_menu');
      $('.overlay').fadeToggle();
    });

    $('.popup_overlay').click(function() {
      $('.popups *').removeClass('visible_popup');
      $('.popup_overlay').fadeToggle();
    });

    $('.submit_add_counter').click(function() {
      counter.addCounter(retrieve.byId('new_counter_number'), retrieve.byId('new_counter_location'),
      retrieve.byId('add_counter_temp_select'), function() {
        counter.getCountersList(function() {
          debugger;
          app.renderHtml();
        });
      });
      document.getElementById('new_counter_number').value = '';
    });

    $('#submitDelCounter').click(function() {
      counter.delCounter(retrieve.byId('selectCounter'),
      function() {
        html.clearHtml();
        counter.getCountersList(function() {
          app.renderHtml();
        });
      });
    });

    $('.submit_add_entry').click(function() {
      var v = [];
      var validate;
      for (var x = 0; x < countersList.length; x++) {
        v.push(retrieve.byId(countersList[x].idValue));
        if (v[x] === false) {
          validate = false;
          break;
        }
      }
      if (validate === false) {
        alert('Значение не должно быть пустым!');
      } else {
        $('.result').addClass('visible_popup');
        $('.popup_overlay').fadeToggle();
        for (var i = 0; i < countersList.length; i++) {
          entry.addRawEntry(2016, retrieve.entryMonthValue(),
          countersList[i].counterNumber,
          retrieve.byId(countersList[i].idValue));
          //entry.showResult(countersList[i].counterNumber,
          //countersList[i].idRes);
        }
      }
    });

    $('.submit_info_params').click(function() {
      $('.info').addClass('visible_popup');
      $('.popup_overlay').fadeToggle();
      /*
      document.getElementById('info').style.display = 'none';
      document.getElementById('invalidMonth').style.display = 'none';
      if (foo.monthsList.indexOf(retrieve.byId('months')) <= foo.getCurrentMonth()) {
        document.getElementById('info').style.display = 'block';
        entry.showInfo(foo.monthsList.indexOf(retrieve.byId('months')), 2016);
      } else {
        document.getElementById('invalidMonth').style.display = 'block';
        document.getElementById('errorMsg')
        .innerHTML = 'Месяц еще не наступил!';
      }*/
    });

    $('.submit_add_counter_popup').click(function() {
      $('.add_counter').addClass('visible_popup');
      $('.popup_overlay').fadeToggle();
    });

    $('.submit_delete_counter_popup').click(function() {
      $('.delete_counter').addClass('visible_popup');
      $('.popup_overlay').fadeToggle();
    });

    $(document).click(function() {
      $('#delMsg').css('display', 'none');
      $('#countersList').css('display', 'block');
      //document.getEleme1ntById('delMsg').style.display = 'none';
      //document.getElementById('countersList').style.display = 'block';
    });

    $(document).on('click', '#submitAnotherEntry', function() {
      $('#resultView').css('display', 'none');
      $('#addEntry').css('display', 'block');
      //document.getElementById('resultView').style.display = 'none';
      //document.getElementById('addEntry').style.display = 'block';
    });
  });
});
