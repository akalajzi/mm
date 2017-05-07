import React from 'react'

export default function WeatherIcon({type}) {
  let icon = <div/>
  switch (type) {
    case 'sunShower':
      icon = (
        <div className="icon sun-shower">
          <div className="cloud"></div>
          <div className="sun">
            <div className="rays"></div>
          </div>
          <div className="rain"></div>
        </div>
      )
      break
    case 'thunderStorm':
      icon = (
        <div className="icon thunder-storm">
          <div className="cloud"></div>
          <div className="lightning">
            <div className="bolt"></div>
            <div className="bolt"></div>
          </div>
        </div>
      )
      break
    case 'cloudy':
      icon = (
        <div className="icon cloudy">
          <div className="cloud"></div>
          <div className="cloud"></div>
        </div>
      )
      break
    case 'flurries':
      icon = (
        <div className="icon flurries">
          <div className="cloud"></div>
          <div className="snow">
            <div className="flake"></div>
            <div className="flake"></div>
          </div>
        </div>
      )
      break
    case 'sunny':
      icon = (
        <div className="icon sunny">
          <div className="sun">
            <div className="rays"></div>
          </div>
        </div>
      )
      break
    case 'rainy':
      icon = (
        <div className="icon rainy">
          <div className="cloud"></div>
          <div className="rain"></div>
        </div>
      )
      break
    default:
      icon = <div />
  }
  return icon
}
