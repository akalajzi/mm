import React, { Component } from 'react'

export default class Zone extends Component {
  render() {
    return (
      <div className={'zone ' + this.props.className}>
        { this.props.children }
      </div>
    )
  }
}
