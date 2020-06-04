import blogService from '../services/blogs'

const reducer = (state = [], action) => {

  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'LIKE':
    return state.map(blog =>
      blog.id !== action.data.id ? blog : action.data
    )
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.data)
  default:
    return state
  }
}


export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const createBlog = (blogObj) => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObj)
    dispatch ({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    const likedBlog = await blogService.update(newBlog)
    dispatch ({
      type: 'LIKE',
      data: likedBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    const removedBlogId = await blogService.remove(id)
    dispatch ({
      type: 'REMOVE_BLOG',
      data: removedBlogId
    })
  }
}

export default reducer