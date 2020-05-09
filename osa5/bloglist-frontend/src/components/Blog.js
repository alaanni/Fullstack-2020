import React, { useState } from 'react'


const Blog = ({
  blog,
  giveLikes,
  removeBlog,
  user
}) => {
  const [viewAll, setViewAll] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = (event) => {
    event.preventDefault()
    giveLikes(blog.id)
  }
  const handleRemove = (event) => {
    event.preventDefault()
    removeBlog(blog.id)
  }

  return (
    <div style={blogStyle} className='blog'>
      {viewAll ?
        <div>
          {blog.title} {blog.author} <button onClick={() => setViewAll(false)}>hide</button><br></br>
          {blog.url}<br></br>
          {blog.likes} <button id='like' onClick={handleLike}>like</button><br></br>
          {blog.user.name}<br></br>

          {blog.user.username === user.username ?
            <button id='remove' onClick={handleRemove}>remove</button> :
            null}
        </div>:
        <div>
          {blog.title} {blog.author} <button id='view' onClick={() => setViewAll(true)}>view</button>
        </div>
      }
    </div>
  )}

export default Blog
