import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (props.notification === '') {
    return null
  }

  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  if (state.notification.content === null) {
    return null
  }
  return {
    notification: state.notification.content
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification