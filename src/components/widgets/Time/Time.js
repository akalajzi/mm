import React, { Component } from 'react'
import moment from 'moment'
import './Time.css'

export default class Time extends Component {
  render() {
    return(
      <div className="Time">
        <div className="time-clock">
          { moment().format('HH:mm') }
        </div>
        <div className="time-date">
          { moment().format('dddd, D MMMM') }
        </div>
      </div>
    )
  }
}
