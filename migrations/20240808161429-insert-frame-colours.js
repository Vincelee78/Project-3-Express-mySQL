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
  return db.insert('frame_colours', ['name'], ['White'])
    .then(function() {
      return db.insert('frame_colours', ['name'], ['Black']);
    })
    .then(function() {
      return db.insert('frame_colours', ['name'], ['Grey']);
    })
    .then(function() {
      return db.insert('frame_colours', ['name'], ['Brown']);
    });
};

exports.down = function(db) {
  return db.runSql('DELETE FROM frame_colours WHERE name IN (?, ?, ?, ?)', ['White', 'Black', 'Grey', 'Brown']);
};

exports._meta = {
  "version": 1
};
