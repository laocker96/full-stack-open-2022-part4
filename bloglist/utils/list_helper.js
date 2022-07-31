const dummy = (posts) => {
    return 1
}

const totalLikes = (posts) => {
    if (posts.length === 0)
        return 'Post list is empty'
    return posts.reduce((sum, current) => sum += current.likes, 0);
}

module.exports = {
    dummy,
    totalLikes
}