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
  return db.createTable('beds_admin', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    wall_bed_id: {
      type: 'int',
      notNull: true,
      unsigned: true,
      foreignKey: {
        name: 'beds_admin_fk',
        table: 'wall_beds',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    admin_id: {
      type: 'int',
      notNull: true,
      unsigned:true,
      foreignKey: {
          name: 'admin_beds_fk',
          table: 'admin',
          rules: {
              onDelete: 'CASCADE',
              onUpdate: 'RESTRICT'
          },
          mapping: 'id'
        }
      }
  })
}

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
