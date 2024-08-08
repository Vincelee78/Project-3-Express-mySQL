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
  return db.insert('bed_orientations', ['name'], ['Horizontal'])
    .then(function() {
      return db.insert('bed_orientations', ['name'], ['Vertical']);
    });
};

exports.down = function(db) {
  return db.runSql('DELETE FROM bed_orientations WHERE name IN (?, ?)', ['Horizontal', 'Vertical']);
};

exports._meta = {
  "version": 1
};
