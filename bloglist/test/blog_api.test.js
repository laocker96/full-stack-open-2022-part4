const { pick, last } = require('lodash')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
let token;

beforeEach(async () => {
    await User.deleteMany({})

    await api.post('/api/users').send(helper.initialUsers[0]);

    const userAuthenticated = await api.post('/api/login').send(helper.userToAuthenticate);

    token = userAuthenticated.body.token;

    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const blogsPromiseArray = blogObjects.map(blog => blog.save())

    await Promise.all(blogsPromiseArray)
})

test('there are seven blogs', async () => {
    const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier property of blogs is \'id\'', async () => {
    const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)
    response.body.forEach(blog => expect(blog.id).toBeDefined())
})

test('blog is saved correctly to the database', async () => {
    await api.post('/api/blogs').send(helper.newBlog).set('Authorization', `Bearer ${token}`).expect(201).expect('Content-Type', /application\/json/)
    const blogsAfterSave = await helper.blogsInDb()
    expect(blogsAfterSave).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsAfterSave.map(blog => pick(blog, ['title', 'author', 'likes', 'url']))).toContainEqual(helper.newBlog)
})

test('if the likes property is missing from the request, it will default to the value 0', async () => {
    await api.post('/api/blogs').send(helper.blogWithoutLikesProperty).set('Authorization', `Bearer ${token}`)
    const blogsAfterSave = await helper.blogsInDb()
    expect(last(blogsAfterSave).likes).toBe(0)
})

test('if the title and url properties are missing then 400 Bad Request', async () => {
    await api.post('/api/blogs').send(helper.blogWithoutTitleAndUrl).set('Authorization', `Bearer ${token}`).expect(400)
})

test('if authorization token is not provided then 401 Unauthorized', async () => {
    await api.post('/api/blogs').send(helper.newBlog).expect(401)
})

afterAll(() => {
    mongoose.connection.close()
})