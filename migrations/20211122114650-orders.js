"use strict";

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
  return db
    .createTable("orders", {
      id: {
        type: "int",
        unsigned: true,
        primaryKey: true,
        autoIncrement: true,
      },
      payment_reference: { type: "string", length: 100, notNull: false },
      date_ordered: { type: "timestamp" },
      user_id: {
        type: "int",
        unsigned: true,
        notNull: true,
      },
    })
    .then(() => {
      return db.addForeignKey("orders", "users", "orders_users", 
      {
        user_id: "id",
      },
      {
        onDelete:'cascade',
        onUpdate:'restrict'
      });
    });
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  version: 1,
};
