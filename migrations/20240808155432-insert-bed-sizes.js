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
  return db.insert('bed_sizes', ['name'], ['Single'])
    .then(function() {
      return db.insert('bed_sizes', ['name'], ['Double']);
    })
    .then(function() {
      return db.insert('bed_sizes', ['name'], ['Queen']);
    })
    .then(function() {
      return db.insert('bed_sizes', ['name'], ['King']);
    });
};

exports.down = function(db) {
  // Optionally delete the inserted data if rolling back
  return db.runSql('DELETE FROM bed_sizes WHERE name IN (?, ?, ?, ?)', ['Single', 'Double', 'Queen', 'King']);
};

exports._meta = {
  "version": 1
};
