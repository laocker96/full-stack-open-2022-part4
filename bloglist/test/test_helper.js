const Blog = require("../models/blog")
const User = require("../models/user")

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,

    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,

    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,

    },
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,

    },
    {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,

    },
    {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,

    },
    {
        title: "Test",
        author: "Simone Bergamin",
        url: "",
        likes: 12,

    }
]

const newBlog = {
    title: "This is a new blog",
    author: "This is the new author blog",
    url: "",
    likes: 0

}

const blogWithoutLikesProperty = {
    title: "This is a new blog without likes property",
    author: "Simone Bergamin",
    url: "",
}

const blogWithoutTitleAndUrl = {
    authot: "Simone Bergamin",
    likes: 50
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const initialUsers = [
    {
        username: 'simone',
        password: 'password',
        name: 'Simone Bergamin'
    }
]


const user = {
    username: 'simone',
    password: 'passwordDifferent',
    name: 'Simone Bergamin'
}

const userWithNoUsername = {
    name: 'Simone Bergamin',
    password: 'password'
}

const userWithNoPassword = {
    username: 'simone',
    name: 'Simone Bergamin'
}

const userWithInvalidUsername = {
    username: 'si',
    password: 'password',
    name: 'Simone Bergamin'
}

const userWithInvalidPassword = {
    username: 'simone',
    password: 'pa',
    name: 'Simone Bergamin'
}

const userToAuthenticate = {
    username: 'simone',
    password: 'password'
}

const usernameRequireError = {
    error: 'Username is required. '
}

const passwordRequireError = {
    error: 'Password is required. '
}

const usernameMinLengthError = {
    error: 'Username must be at least 3 characters. '
}

const passwordMinLengthError = {
    error: 'Password must be at least 3 characters. '
}

const uniqueUsernameError = {
    error: 'Username must be unique.'
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs,
    newBlog,
    blogWithoutLikesProperty,
    blogWithoutTitleAndUrl,
    blogsInDb,
    initialUsers,
    user,
    userWithNoUsername,
    userWithNoPassword,
    userWithInvalidUsername,
    userWithInvalidPassword,
    userToAuthenticate,
    usernameRequireError,
    passwordRequireError,
    usernameMinLengthError,
    passwordMinLengthError,
    uniqueUsernameError,
    usersInDb
}