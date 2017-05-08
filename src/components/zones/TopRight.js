import React, { Component } from 'react'

import YahooWeather from 'components/widgets/YahooWeather'
import CommuteTime from 'components/widgets/CommuteTime'

export default class TopRight extends Component {
  render() {
    return (
      <div className="zone topRight">
        <YahooWeather />
        <CommuteTime />
      </div>
    )
  }
}
