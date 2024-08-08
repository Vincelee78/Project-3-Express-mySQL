'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  return db.insert('mattress_types', ['name'], ['Foam'])
    .then(function() {
      return db.insert('mattress_types', ['name'], ['Innerspring']);
    })
    .then(function() {
      return db.insert('mattress_types', ['name'], ['Hybrid']);
    })
    .then(function() {
      return db.insert('mattress_types', ['name'], ['Latex']);
    })
    .then(function() {
      callback();
    })
    .catch(callback);
};

exports.down = function(db, callback) {
  return db.runSql('DELETE FROM mattress_types WHERE name IN (?, ?, ?, ?)', ['Foam', 'Innerspring', 'Hybrid', 'Latex'], callback);
};

exports._meta = {
  version: 1,
};
