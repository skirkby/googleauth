const usersModel = require('./usersModel.js');
const db = require('../data/dbconfig.js');

describe('crud operations', () => {
    describe('adding users', () => {
        beforeEach(async () => {
            await db('users').truncate();
        });

        test('add user with exact schema', async () => {
            const newUser = {
                username: 'test user',
                password: 'password',
                email: 'testuser@example.com'
            };

            await usersModel.addUser(newUser);

            const users = await db('users');
            const user = users[0];
            const count = users.length;

            newUser.id = user.id;
            expect(user).toEqual(newUser);
            expect(count).toBe(1);
        });

        test('delete an added user', async () => {
            const newUser = {
                username: 'test user',
                email: 'testuser@example.com',
                password: 'password'
            };

            await db('users').insert(newUser);

            await usersModel.deleteUser(1);

            const users = await db('users');

            expect(users.length).toBe(0);
        });

        test('return all users', async () => {
            const newUser1 = {
                username: 'test user1',
                email: 'testuser1@example.com',
                password: 'password'
            };
            const newUser2 = {
                username: 'test user2',
                email: 'testuser2@example.com',
                password: 'password'
            };

            await db('users').insert(newUser1);
            await db('users').insert(newUser2);

            const users = await usersModel.getUsers();

            expect(users.length).toBe(2);
        });

        test('return specific users by id', async () => {
            const newUser1 = {
                username: 'test user1',
                email: 'testuser1@example.com',
                password: 'password'
            };
            const newUser2 = {
                username: 'test user2',
                email: 'testuser2@example.com',
                password: 'password'
            };

            await db('users').insert(newUser1);
            await db('users').insert(newUser2);

            const user1 = await usersModel.getUser({ id: 1 });
            const user2 = await usersModel.getUser({ id: 2 });

            newUser1.id = user1.id;
            newUser2.id = user2.id;

            expect(user1).toEqual(newUser1);
            expect(user2).toEqual(newUser2);
        });

        test('update a user', async () => {
            const newUser = {
                username: 'test user',
                email: 'testuser@example.com',
                password: 'password'
            };

            await db('users').insert(newUser);

            newUser.email = 'newuser@new.example.com';

            await usersModel.updateUser(1, newUser);

            const user = await db('users').where({ id: 1 });
            console.log(user);
            console.log(user.email, newUser.email);

            expect(user.email).toMatch(newUser.email);
        })
    })
})