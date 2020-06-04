
import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.content)
  const error = useSelector(state => state.error)

  if (notification === '') {
    return null
  }

  return (
    <div className={error ? 'error' : 'notification'}>
      {notification}
    </div>
  )
}

export default Notification