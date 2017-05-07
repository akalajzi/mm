import React, { Component } from 'react'
import moment from 'moment'
import './YahooWeather.css'

const yw = require('./service.js')

const defaultLocation = {
  city: 'Omiš',
  countryCode: 'hr',
  latitute: null,
  longitude: null,
}
const defaultUnit = 'c'

const defaultData = {

}

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
    yw.getFullWeather(encodeURIComponent(searchString), this.state.settings.unit)
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
              { data.item.condition.text + ' ' + data.item.condition.temp } { unit }
            </div>
            <div className="yw-time">
              { this.getTimeToSunToggle() }
            </div>
            <div className="yw-humidity">
              Humidity: { data.atmosphere.humidity }%
            </div>
            <div className="yw-today">
              <div>Today: { data.item.forecast[1].text }</div>
              Low: { data.item.forecast[1].low } { unit } | High: { data.item.forecast[1].high } { unit }
            </div>
          </div>
        }
      </div>
    )
  }
}
