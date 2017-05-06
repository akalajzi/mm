import React, { Component } from 'react'

import {
  BottomCenter,
  BottomLeft,
  BottomRight,
  Center,
  TopCenter,
  TopLeft,
  TopRight,
} from 'components/zones'
// import {BottomCenter} from 'components/zones/BottomCenter'

import './App.css'

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="zoneGroup-side">
          <TopLeft />
          <BottomLeft />
        </div>
        <div className="zoneGroup-center">
          <TopCenter />
          <Center />
          <BottomCenter />
        </div>
        <div className="zoneGroup-side">
          <TopRight />
          <BottomRight />
        </div>
      </div>
    );

    // return(
    //   <div className="App">
    //     <BottomCenter />
    //   </div>
    // )
  }
}

export default App;
