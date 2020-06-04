const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./testHelper')
const api = supertest(app)
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
mongoose.set('useFindAndModify', false)

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

test('adding a blog without token returns statuscode 401', async() => {
  const newBlog = 
    { 
      title: "Java", 
      author: "Anni",
      url: "https://java.com/",
      likes: 8
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
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

    const newUser = 
      {
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

    const newUser = 
      {
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

  test('a new blog can be added and likes is defined as zero if not given', async() => {
    const users = await helper.usersInDb()
    const firstUser = users[0]
    const token = jwt.sign(
      {
        username: firstUser.username,
        id: firstUser.id
      },
      config.SECRET
    )

    const newBlog = 
      {
        title: 'Test blog',
        author: 'Test author',
        url: 'testurl',
        user: firstUser.id
      }
  
      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      const blogWithoutLikes = blogsAtEnd.find(blog => blog.likes === 0)
      expect(blogWithoutLikes.title).toBe("Test blog")
  })

  test('blog without title and url is bad request', async() => {
    const users = await helper.usersInDb()
    const firstUser = users[0]
    const token = jwt.sign(
      {
        username: firstUser.username,
        id: firstUser.id
      },
      config.SECRET
    )

    const newBlog = 
      {
        author: 'Test author',
        user: firstUser.id
      }
  
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})