define(function() {
  return {
    db: null,

    init: function(dbName, version, descr, size) {
      this.db = openDatabase(dbName, version, descr, size);
    },

    check: function() {
      if (!this.db) {
        console.log('Failed to connect to database.');
      } else {
        console.log('WebSql is ready!');
      }
    },

    createTables: function(statements) {
      this.db.transaction(function(tx) {
        for (var i = 0; i < statements.length; i++) {
          tx.executeSql(statements[i]);
        }
      });
    },
    insert: function(cols, table, values, insertCallback) {
      var numberCols = [];
      for (var i = 0; i < cols.length; i++) {
        numberCols.push('?');
      }
      console.log('INSERT INTO ' + table + '(' + cols.join(', ') +
      ') VALUES (' + numberCols.join(', ') + ')');
      this.db.transaction(function(tx) {
        tx.executeSql
        ('INSERT INTO ' + table + '(' + cols.join(', ') +
        ') VALUES (' + numberCols.join(', ') + ')', values, function() {
          insertCallback();
        });
      });
    },
    select: function(cols, table, condition, additional, selectCallback) {
      console.log('SELECT ' + cols.join(', ') + ' FROM ' + table + ' ' +
      condition + ' ' + additional);
      this.db.transaction(function(tx) {
        tx.executeSql
        ('SELECT ' + cols.join(', ') + ' FROM ' + table + ' ' +
        condition + ' ' + additional, [], function(tx, results) {
          selectCallback(tx, results);
        });
      });
    }
  };
});
