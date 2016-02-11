requirejs(['mods/dataBase', 'mods/counter', 'mods/entry', 'mods/foo',
'mods/html', 'mods/retrieve', 'lib/jquery'],
function(dataBase, counter, entry, foo, html, retrieve, jquery) {
  dataBase.init('dbApp', '0.1', 'Data Base', 10 * 1024 * 1024);
  dataBase.check();
  var statements = [
    'CREATE TABLE IF NOT EXISTS COUNTERS ' +
    '(id INTEGER PRIMARY KEY AUTOINCREMENT, counterNumber TEXT, temp TEXT, ' +
    'idValue TEXT, idRes TEXT, idInfo TEXT)',
    'CREATE TABLE IF NOT EXISTS RAWENTRIES ' +
    '(id INTEGER PRIMARY KEY AUTOINCREMENT, year INTEGER, month INTEGER, ' +
    'counterId INTEGER, entry INTEGER, ' +
    'FOREIGN KEY (counterId) REFERENCES COUNTERS(id))',
    'CREATE TABLE IF NOT EXISTS ENTRIES ' +
    '(id INTEGER PRIMARY KEY AUTOINCREMENT, year INTEGER, month INTEGER, ' +
    'counterId INTEGER, entry INTEGER, ' +
    'FOREIGN KEY (counterId) REFERENCES COUNTERS(id))'
  ];
  dataBase.createTables(statements);
  counter.getCountersList(function() {
    html.loadGenHtml();
  });
  html.generateHtml('', 'idMonth');

  $(document).ready(function() {
    $(function() {
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
    });

    $('.toggle_menu_button img').click(function() {
      $('.menu').toggleClass('visible_menu');
      $('.overlay').fadeToggle();
    });
    $('.menu a').click(function() {
      $('.menu').removeClass('visible_menu');
      $('.overlay').fadeToggle();
    });

    $('#submitNewCounter').click(function() {
      counter.addCounter(retrieve.byId('newCounter'), retrieve.byId('temp'),
      function() {
        html.clearHtml();
        counter.getCountersList(function() {
          html.loadGenHtml();
        });
      });
      document.getElementById('newCounter').value = '';
    });

    $('#submitDelCounter').click(function() {
      counter.delCounter(retrieve.byId('selectCounter'),
      function() {
        html.clearHtml();
        counter.getCountersList(function() {
          html.loadGenHtml();
        });
      });
    });

    $('#submitEntry').click(function() {
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
        for (var i = 0; i < countersList.length; i++) {
          entry.addRawEntry(2016, retrieve.entryMonthValue(),
          countersList[i].counterNumber,
          retrieve.byId(countersList[i].idValue));
          entry.showResult(countersList[i].counterNumber,
          countersList[i].idRes);
        }
      }
    });

    $('#submitParams').click(function() {
      document.getElementById('info').style.display = 'none';
      document.getElementById('invalidMonth').style.display = 'none';
      if (foo.monthsList.indexOf(retrieve.byId('months')) <= foo.getCurrentMonth()) {
        document.getElementById('info').style.display = 'block';
        entry.showInfo(foo.monthsList.indexOf(retrieve.byId('months')), 2016);
      } else {
        document.getElementById('invalidMonth').style.display = 'block';
        document.getElementById('errorMsg')
        .innerHTML = 'Месяц еще не наступил!';
      }
    });

    $(document).on('click', '#submitAnotherNewCounter', function() {
      $('#addNewMsg').css('display', 'none');
      $('#addNewForm').css('display', 'block');
      //document.getElementById('addNewMsg').style.display = 'none';
      //document.getElementById('addNewForm').style.display = 'block';
    });

    $(document).on('click', '#submitAnotherDelCounter', function() {
      $('#delMsg').css('display', 'none');
      $('#countersList').css('display', 'block');
      //document.getElementById('delMsg').style.display = 'none';
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
