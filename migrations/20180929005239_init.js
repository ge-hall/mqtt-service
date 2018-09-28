exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable("topic", table => {
            table.uuid("id").unique();
            table.string("topic");
            table.string("value");
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable("topic")
    ]);
};
