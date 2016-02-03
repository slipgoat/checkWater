(function() {
  checkDB();
  createTables();
  getCountersList(function() {
    loadGenHtml();
  });
  generateHtml('', 'idMonth');
})();

$(document).ready(function() {
  $('#toggleMenu').click(function() {
    $('#menu').slideToggle('slow');
  });
});
