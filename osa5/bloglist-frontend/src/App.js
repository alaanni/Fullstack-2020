import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login' 
import Login from './components/Login'
import AddBlogForm from './components/AddBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

useEffect(() => {
  blogService.getAll().then(blogs =>
    setBlogs( blogs )
  )  
}, [])

useEffect(() => {
  const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    setUser(user)
    blogService.setToken(user.token)
  }
}, [])

const handleLogin = async (event) => {
  event.preventDefault()
  try {
    const user = await loginService.login({
      username, password,
    })
    window.localStorage.setItem(
      'loggedBloglistUser', JSON.stringify(user)
    ) 
    setUser(user)
    setUsername('')
    setPassword('')
  } catch (exception) {
    setError(true)
    setMessage('wrong credentials')
    setTimeout(() => {
      setError(false)
      setMessage(null)
    }, 5000)
  }
}
const handleLogout = () => {
  window.localStorage.clear()
  setUser(null)
}

const addBlog = (event) => {
  event.preventDefault()
  const blogObject = {
    title: newBlog,
    author: newAuthor,
    url: newUrl
  }
  blogService
    .create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setNewBlog('')
      setNewAuthor('')
      setNewUrl('')
      setMessage(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
        )
        setTimeout(() => {
          setMessage(null)
      }, 5000)
    }) 
}

const handleBlogChange = (event) => {
  console.log(event.target.value)
  setNewBlog(event.target.value)
}
const handleAuthorChange = (event) => {
  console.log(event.target.value)
  setNewAuthor(event.target.value)
}
const handleUrlChange = (event) => {
  console.log(event.target.value)
  setNewUrl(event.target.value)
}

  if (user === null) {
    return (
      <div>
        <Notification message={message} error={error} />

        <h2>Log in to application</h2>

        <Login username={username} password={password} 
        setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin}/>
      </div>
    )
  }

  return (
    <div>
      <Notification message={message} error={error} />

      <h2>blogs</h2>

      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

      <h2>create new</h2>

      <AddBlogForm addBlog={addBlog} newBlog={newBlog} newAuthor={newAuthor} newUrl={newUrl}
       handleBlogChange={handleBlogChange} handleAuthorChange={handleAuthorChange} handleUrlChange={handleUrlChange}/>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App