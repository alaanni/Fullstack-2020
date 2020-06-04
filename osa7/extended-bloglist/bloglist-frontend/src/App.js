import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { newNotification } from './reducers/notificationReducer'
import { initBlogs, createBlog, likeBlog, deleteBlog } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)
  console.log('blogs:', blogs)
  blogs.sort((a, b) => a.likes - b.likes).reverse()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        dispatch(createBlog(returnedBlog))
      })
  }

  const giveLikes = (id) => {
    const blog = blogs.find(blog => blog.id === id)
    dispatch(likeBlog(blog))
  }

  const removeBlog = (id) => {
    const blog = blogs.find(blog => blog.id === id)
    if (window.confirm(`Removing blog ${blog.title} by ${blog.author}`)) {
      blogService
        .remove(blog)
        .catch(error => {
          dispatch(newNotification(`blog ${blog.title} was already deleted from server`, true, 5))
        })

      dispatch(newNotification(`Deleted blog ${blog.title}`, false, 5))
      dispatch(deleteBlog(id))
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} user={user}/>
    </Togglable>
  )

  return (
    <div>
      <Notification />

      {user === null ?
        <div>
          <h2>Log in to application</h2>

          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            user={user}
            setUser={setUser}
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