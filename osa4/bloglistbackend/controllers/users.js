const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body
  const password = body.password
  if (password === undefined || password.length < 3) {
    return response.status(400).json({ error: 'password required 3 characters minimum' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await user.save()

  response.json(savedUser)
})


usersRouter.get('/', async (request, response) => {
    const users = await User
    .find({}).populate('blogs', { title: 1, url: 1,  likes: 1, author: 1 })
    response.json(users.map(u => u.toJSON()))
  })

module.exports = usersRouter