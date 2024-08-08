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

exports.up = function(db) {
  return db.insert('wood_colours', ['name'], ['Oak'])
    .then(function() {
      return db.insert('wood_colours', ['name'], ['Cherry']);
    })
    .then(function() {
      return db.insert('wood_colours', ['name'], ['Walnut']);
    })
    .then(function() {
      return db.insert('wood_colours', ['name'], ['Maple']);
    });
};

exports.down = function(db) {
  return db.runSql('DELETE FROM wood_colours WHERE name IN (?, ?, ?, ?)', ['Oak', 'Cherry', 'Walnut', 'Maple']);
};

exports._meta = {
  "version": 1
};
