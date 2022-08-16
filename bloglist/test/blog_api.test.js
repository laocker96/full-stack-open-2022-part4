const { pick } = require('lodash')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())

    await Promise.all(promiseArray)
})

test('there are seven blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier property of blogs is \'id\'', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => expect(blog.id).toBeDefined())
})

test('blog is saved correctly to the database', async () => {
    await api.post('/api/blogs').send(helper.newBlog).expect(201).expect('Content-Type', /application\/json/)
    const blogsAfterSave = await helper.blogsInDb()
    expect(blogsAfterSave).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsAfterSave.map(blog => pick(blog, ['title', 'author', 'likes', 'url']))).toContainEqual(helper.newBlog)
})

afterAll(() => {
    mongoose.connection.close()
})