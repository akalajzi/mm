import React, { Component } from 'react'

import YahooWeather from 'components/widgets/YahooWeather'

export default class TopRight extends Component {
  render() {
    return (
      <div className="zone topRight">
        <YahooWeather />
      </div>
    )
  }
}
