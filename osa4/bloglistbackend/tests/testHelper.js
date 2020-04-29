const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [ 
    { 
      title: "React patterns", 
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      user: "5ea8230ef25f9b2c38c0be78",
      likes: 7
    }, 
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      user: "5ea8230ef25f9b2c38c0be78",
      likes: 5
    }, 

    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      user: "5ea8230ef25f9b2c38c0be78",
      likes: 1
    } 
]

const nonExistingId = async () => {
    const blog = new Blog({ content: 'willremovethissoon' })
    await blog.save()
    await blog.remove()
  
    return blog._id.toString()
  }
  
  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

  const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }
  
  module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb
  }