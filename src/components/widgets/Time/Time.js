import React, { Component } from 'react'
import moment from 'moment'
import './Time.css'

export default class Time extends Component {
  constructor(props) {
    super(props)

    this.state = {
      now: moment(),
    }
  }

  componentDidMount() {
    this.timer = setInterval(
      () => this.updateTime(),
      10000
    )
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  updateTime() {
    this.setState( {
      now: moment(),
    })
  }

  render() {

    return(
      <div className="widget Time">
        <div className="time-clock">
          { this.state.now.format('HH:mm') }
        </div>
        <div className="time-date">
          { this.state.now.format('dddd, MMMM D') }
        </div>
      </div>
    )
  }
}
