import React, { useState } from 'react'

const BlogForm = ({ createBlog, user }) => {
  const [newBlog, setNewBlog] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog,
      author: newAuthor,
      url: newUrl,
      user: user
    })
    setNewBlog('')
    setNewAuthor('')
    setNewUrl('')
  }

  return(
    <div className='formDiv'>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id='title'
            value={newBlog}
            onChange={({ target }) => setNewBlog(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id='author'
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id='url'
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <button className='create-button' type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm