const notesRouter = require('express').Router()
const Blog = require('../models/blog')

notesRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

notesRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    const result = await blog.save()
    response.status(201).json(result)
})

notesRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

notesRouter.put('/:id', async (request, response) => {
    await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true });
    response.status(204).end()
})

module.exports = notesRouter