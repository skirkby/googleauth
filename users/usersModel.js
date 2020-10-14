const db = require('../data/dbconfig.js');

module.exports = {
    addUser,
    deleteUser,
    updateUser,
    getUsers,
    getUser
}

async function addUser(newUser) {
    try {
        const add = await db('users').insert(newUser);
        return add;
    } catch (err) {
        console.log('error: ', err);
        throw err;
    }
}

async function deleteUser(id) {
    try {
        return await db('users').delete().where({ id });
    } catch (err) {
        throw err;
    }
}

async function updateUser(id, userChanges) {
    try {
        return await db('users').update(userChanges).where({ id });
    } catch (err) {
        throw err;
    }
}

async function getUsers() {
    try {
        return await db('users');
    } catch (err) {
        throw err;
    }
}

async function getUser(criteria) {
    try {
        return await db('users').where({ ...criteria }).first();
    } catch (err) {
        throw err;
    }
}