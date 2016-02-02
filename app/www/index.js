(function() {
  checkDB();
  createTables();
  getCountersList(function() {
    loadGenHtml();
  });
  generateHtml('', 'idMonth');
})();
