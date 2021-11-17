'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable('beds_wood_colours', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    wall_bed_id: {
      type: 'int',
      notNull: true,
      unsigned: true,
      foreignKey: {
        name: 'beds_woodcolours_fk',
        table: 'wall_beds',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    wood_colour_id: {
      type: 'int',
      notNull: true,
      unsigned:true,
      foreignKey: {
          name: 'woodcolours_beds_fk',
          table: 'wood_colours',
          rules: {
              onDelete: 'CASCADE',
              onUpdate: 'RESTRICT'
          },
          mapping: 'id'
        }
      }
  })
}
exports.down = function (db) {
  return db.dropTable('products_tag')
};

exports._meta = {
  "version": 1
};
