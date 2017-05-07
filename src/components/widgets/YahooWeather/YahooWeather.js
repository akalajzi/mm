import React, { Component } from 'react'
import moment from 'moment'

import WeatherIcon from './WeatherIcon'
import './animated-icons.css'
import './YahooWeather.css'

// icon css c/p from https://codepen.io/joshbader/pen/EjXgqr
// TODO: check licence

const yw = require('./service.js')

const defaultLocation = {
  city: 'Omiš',
  countryCode: 'hr',
  latitute: null,
  longitude: null,
}
const defaultUnit = 'c'

export default class YahooWeather extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      initialLoadDone: false,
      data: null,
      error: null,
      settings: {
        location: defaultLocation,
        unit: defaultUnit,
      }
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  componentWillReceiveProps(nextProps, nextState) {
    // try once more
    if (!this.state.error && nextState.error) {
      this.fetchData()
    }
  }

  fetchData() {
    const location = this.state.settings.location
    const searchString = `${location.city}, ${location.countryCode}`

    this.setState({ loading: true })
    // yw.getFullWeather(encodeURIComponent(searchString), this.state.settings.unit)
    yw.getMockWeather()
      .then((res) => {
        const ch = res.query.results.channel;
        console.log('got channel: ', ch);
        this.setState({
          loading: false,
          initialLoadDone: true,
          error: null,
          data: ch,
        })
      })
      .catch((res) => {
        this.setState({
          loading: false,
          initialLoadDone: false,
          error: 'Cannot fetch weather info.',
        })
      })
  }

  getTimeToSunToggle() {
    // todo
    //return moment().format('HH:mm')
  }

  render() {
    const hasError = !this.state.data
    const data = this.state.data
    const settings = this.state.settings
    const unit = '°' + settings.unit.toUpperCase()

    return(
      <div className="YahooWeather">
        { hasError &&
          <div className="error">{ this.state.error }</div>
        }
        { !hasError &&
          <div className="yw-data">
            <div className="yw-condition">
              <div className="yw-icon">
                <WeatherIcon type={'sunShower'} />
              </div>
              <div className="yw-details">
                <div className="humidity"><i className="fa fa-umbrella" /> { data.atmosphere.humidity }%</div>
                <div className="yw-temp">{ data.item.condition.temp + '°'}</div>
                <div className="yw-text">
                  { data.item.condition.text }
                </div>
              </div>
            </div>
            <div className="yw-forecast">
              Today forecast - { data.item.forecast[1].text },
              low { data.item.forecast[1].low + '°'}, high { data.item.forecast[1].high + '°'}
            </div>
            {/* <div className="yw-time">
              { this.getTimeToSunToggle() }
            </div> */}
          </div>
        }
      </div>
    )
  }
}
