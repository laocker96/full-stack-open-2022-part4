const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
    await User.deleteMany({})

    const userObjects = helper.initialUsers.map(user => new User(user))
    const promiseArray = userObjects.map(user => user.save())

    await Promise.all(promiseArray)
})

test('username is required', async () => {
    await api.post('/api/users').send(helper.userWithNoUsername).expect(400).expect(helper.usernameRequireError)
    const usersAfterSave = await helper.usersInDb()
    expect(usersAfterSave).toHaveLength(1)
})

test('password is required', async () => {
    await api.post('/api/users').send(helper.userWithNoPassword).expect(400).expect(helper.passwordRequireError)
    const usersAfterSave = await helper.usersInDb()
    expect(usersAfterSave).toHaveLength(1)

})

test('username must be at least 3 characters long', async () => {
    await api.post('/api/users').send(helper.userWithInvalidUsername).expect(400).expect(helper.usernameMinLengthError)
    const usersAfterSave = await helper.usersInDb()
    expect(usersAfterSave).toHaveLength(1)
})

test('password must be at least 3 characters long', async () => {
    await api.post('/api/users').send(helper.userWithInvalidPassword).expect(400).expect(helper.passwordMinLengthError)
    const usersAfterSave = await helper.usersInDb()
    expect(usersAfterSave).toHaveLength(1)
})

test('username must be unique', async () => {
    await api.post('/api/users').send(helper.user).expect(400).expect(helper.uniqueUsernameError)
    const usersAfterSave = await helper.usersInDb()
    expect(usersAfterSave).toHaveLength(1)
})

afterAll(() => {
    mongoose.connection.close()
})


