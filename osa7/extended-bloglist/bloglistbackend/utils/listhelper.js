const _ = require('lodash')

const dummy = (blogs) => 1
 
const totalLikes = (blogs) => {
    return blogs.lenght === 0 ? 0
    : blogs.reduce((sum, blog) => 
        sum + blog.likes, 0)

}
const favoriteBlog = (blogs) => {
    const allLikes = blogs.map(blog => blog.likes)
    const favBlog = blogs.find(blog => blog.likes === Math.max.apply(null, allLikes))
    delete favBlog.__v
    delete favBlog._id
    delete favBlog.url
    return (
        favBlog
    )
}
const mostBlogs = (blogs) => {
    const blogAuthors = _.orderBy(_.groupBy(blogs, 'author'), 'length', 'desc')[0]
        
    return (
       {author: blogAuthors[0].author,
        blogs: blogAuthors.length}
    )
}


const mostLikes = (blogs) => {
    const wrapped = _(blogs).groupBy('author')
    const authorsLikes = wrapped.map((blogs, author) => ({
        author,
        likes: blogs.reduce((sum, blog) => {
          return sum + blog.likes;
        }, 0)
      }))
    const ordered = authorsLikes.orderBy("likes")
    const authorsLikestoArray = ordered.value();
    return _.last(authorsLikestoArray);
  }


  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }
