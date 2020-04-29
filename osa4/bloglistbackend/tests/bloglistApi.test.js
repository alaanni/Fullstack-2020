const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./testHelper')
const api = supertest(app)
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('amount of blogs is correct', async() => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test ('blog has id', async() => {
    const response = await api.get('/api/blogs')
    expect('id').toBeDefined()
})

test('a new blog can be added', async() => {
    const newBlog = { 
        title: "Java", 
        author: "Anni",
        url: "https://js.com/",
        user: "5ea8230ef25f9b2c38c0be78",
        likes: 8
    }
      await api
        .post('/api/blogs')
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFubmkiLCJpZCI6IjVlYTgyMzBlZjI1ZjliMmMzOGMwYmU3OCIsImlhdCI6MTU4ODEzNzkwNn0.DUuuhhHsAIbY8q2sNB9giaHNGSLfggyty30xcmuLrmE')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
      
        const titles = blogsAtEnd.map(n => n.title)
        expect(titles).toContain(
          "Java"
        )
})
test('blogs likes is zero if likes not given', async() => {
    const newBlog = { 
        title: "JavaScript", 
        author: "Anni",
        url: "https://js.com/",
        user: "5ea8230ef25f9b2c38c0be78"
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        const blogWithoutLikes = blogsAtEnd.find(blog => blog.likes === 0)
        expect(blogWithoutLikes.likes).toBe(0)
        
})
test('blog without title and url is bad request', async() => {
    const newBlog = { 
        author: "Anni",
        likes: 5,
        user: "5ea8230ef25f9b2c38c0be78"
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

describe('when there is one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a unique username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'anni',
      name: 'Anni A',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Username',
      password: 'salasana',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})