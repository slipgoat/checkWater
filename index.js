(function() {
  db = openDatabase('dbApp', '0.1', 'Data Base', 10 * 1024 * 1024);
  checkDB();
  createTables();
  getCountersList(function() {
    loadGenHtml();
  });
})();
