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
  return db.createTable('posters',{
      id: { type: 'int', primaryKey:true, autoIncrement:true, unsigned: true},
      title: { type: 'string', length:100, notNull:false},
      cost: 'int',
      description:{ type: 'string', length:300, notNull:false},
      date: 'datetime',
      stock:'int',
      height: {type: 'int', comment:'in cm'},
      width:{type: 'int', comment:' in cm'},
      
  })
};

exports.down = function(db) {
  return db.dropTable('posters');
};

exports._meta = {
  "version": 1
};
