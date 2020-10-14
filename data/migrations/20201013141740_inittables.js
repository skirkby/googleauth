
exports.up = function (knex) {
    return knex.schema
        .createTable('users', tbl => {
            tbl.increments();
            tbl.string('username', 128);
            tbl.string('email', 512);
            tbl.string('password', 4096);
        })

};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('users');
};
