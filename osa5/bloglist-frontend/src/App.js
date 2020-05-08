import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  blogs.sort((a, b) => a.likes - b.likes).reverse()

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

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(
          `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const giveLikes = (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const likedBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(likedBlog)
      .then(returnedBlog => {
        returnedBlog.user = likedBlog.user
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      .catch(error)
  }

  const removeBlog = (id) => {
    const blog = blogs.find(blog => blog.id === id)
    if (window.confirm(`Removing blog ${blog.title} by ${blog.author}`)) {
      blogService
        .remove(blog)
        .catch(error => {
          setError(true)
          setMessage(`blog ${blog.title} was already deleted from server`)
        })
      setError(false)
      setMessage(
        `Deleted blog ${blog.title}`
      )
      setTimeout(() => {
        setMessage(null)
      }, 4000)

      setBlogs(blogs.filter(blog =>
        blog.id !== id))
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  return (
    <div>
      <Notification message={message} error={error} />

      {user === null ?
        <div>
          <h2>Log in to application</h2>

          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </div> :
        <div>
          <h2>blogs</h2>

          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          {blogForm()}

          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              giveLikes={giveLikes}
              removeBlog={removeBlog}
              user={user}
            />
          )}
        </div>
      }
    </div>
  )
}

export default App