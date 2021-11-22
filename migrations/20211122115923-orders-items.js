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
  return db.createTable('orders_items', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    wall_bed_id: {
      type: 'int',
      notNull: true,
      unsigned: true,
      foreignKey: {
        name: 'bed_orders_fk',
        table: 'wall_beds',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    quantity: {
      type: 'int',
      notNull: true,
      unsigned:true,
    },
    cost: {
      type: 'int',
      notNull: true,
      unsigned:true,
    },

    order_id: {
      type: 'int',
      notNull: true,
      unsigned:true,
      foreignKey: {
          name: 'orders_beds_fk',
          table: 'orders',
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
            name: 'woodcolours_orders_beds_fk',
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

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
