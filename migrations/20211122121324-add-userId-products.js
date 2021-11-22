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
  return db.addColumn('wall_beds', 'user_id', {
    type: 'int',
    unsigned:true,
    notNull : true,
    foreignKey: {
        name: 'bed_user_fk',
        table: 'users',
        rules: {
            onDelete:'cascade',
            onUpdate:'restrict'
        },
        mapping: 'id'
    }
})
};

exports.down = function(db) {
  return db.removeForeignKey('wall_beds','bed_user_fk')
  .then(() =>{
    return db.removeColumn('wall_beds', 'user_id')
  })
};

exports._meta = {
  "version": 1
};
