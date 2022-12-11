const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

    const user = request.user

    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes,
        user: user._id
    })


    const savedBlog = await blog.save()

    if (user) {
        user.blogs = user.blogs.concat(savedBlog._id);
        await user.save()
    }

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {

    const blog = await Blog.findById(request.params.id).populate('user', { id: 1 });

    if (blog.user.id.toString() === request.user._id.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } else {
        return response.status(401).json({ error: 'permission denied' })
    }

})

blogsRouter.put('/:id', async (request, response) => {

    const blog = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes,
        user: request.body.user ? request.body.user.id : null
    }

    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
    response.status(204).end()
})

module.exports = blogsRouter;