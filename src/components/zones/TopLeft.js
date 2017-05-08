import React, { Component } from 'react'

import Time from 'components/widgets/Time'
import CryptoCoin from 'components/widgets/CryptoCoin'

export default class TopLeft extends Component {
  render() {
    return (
      <div className="zone topLeft">
        <Time />
        {/* <CryptoCoin /> */}
      </div>
    )
  }
}
