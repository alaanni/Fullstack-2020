import React from 'react'

const AddBlogForm = (props) => (
  <form onSubmit={props.addBlog}>
    title:<input value={props.newBlog} onChange={props.handleBlogChange}/><br></br>
    author:<input value={props.newAuthor} onChange={props.handleAuthorChange}/><br></br>
    url:<input value={props.newUrl} onChange={props.handleUrlChange}/><br></br>
    <button type="submit">create</button>
  </form>
)

export default AddBlogForm