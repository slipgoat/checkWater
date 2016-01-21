(function() {
  checkDB();
  createTables();
  getCountersList(function() {
    loadGenHtml();
  });
})();
