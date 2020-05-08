import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> calls callback function with right contents', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(author, {
    target: { value: 'Anni' }
  })

  fireEvent.change(title, {
    target: { value: 'Annis Blog' }
  })

  fireEvent.change(url, {
    target: { value: 'www.ab.fi' }
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toStrictEqual({ author: 'Anni', title: 'Annis Blog', url: 'www.ab.fi' })
})