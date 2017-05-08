import React, { Component } from 'react'
import PropTypes from 'prop-types'
import request from 'superagent'
import moment from 'moment'

const DIRECTIONS_API_URL = 'https://maps.googleapis.com/maps/api/directions/json?'
const DISTANCE_API_URL = 'https://maps.googleapis.com/maps/api/distancematrix/json?'
const API_KEY = 'AIzaSyCnS0fQyRDw509wn3c_tqBM3TZRibFitTI'
const origin = 'Apartmani+Dide+Stipe,+Velika+luka+1,+Stanići,+21310,+Omiš,+Croatia'
const destination = 'Stinice+ul.+12,+21000,+Split,+Croatia'

export default class CommuteTime extends Component {
  static propTypes = {
    mock: PropTypes.bool,
    config: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.state= {
      loading: false,
      error: null,
      data: [],
    }
  }

  componentDidMount() {
    this.getDrivingResult()
    this.todayDate = moment().format('YYYY-MM-DD')
    this.workStart = moment(this.todayDate).add(10, 'h')
  }

  getDrivingResult() {
    this.setState({ loading: true, loaded: false })
    if (this.props.mock) {
      const mockData = require('./mockResponse.js').default
      this.setState({ error: null, loading: false, loaded: true, data: mockData })
    } else {
      request
      .get(DIRECTIONS_API_URL + 'origin=' + origin + '&destination=' + destination + '&alternatives=true&key=' + API_KEY)
      .end((err, res) => {
        if (err) {
          this.setState({ error: err, loading: false, loaded: true, data: [] })
        } else {
          console.log(res.body);
          this.setState({ error: null, loading: false, loaded: true, data: res.body })
        }
      })
    }
  }

  getTransitResult() {
    //
  }

  renderTimeToWork() {
    const routes = this.state.data.routes
    const now = moment()

    return(
      <div>
        { routes.map((route, index) => {
          const name = route.summary === 'D8' ? 'Magistrala' : 'Priko Tugara'
          const distance = route.legs[0].distance.text
          const duration = route.legs[0].duration
          const leaveTime = moment(this.workStart).subtract(duration.value*1000)
          const message = moment(leaveTime).isAfter(now)
            ? 'Leave home ' + moment().to(leaveTime)
            : "YOU'RE LATE!!"
          return (
            <div key={index}>
              { message }
              <div>
                {name} ({distance}) - {duration.text}
              </div>
              <div className="textAlert">
                {route.warnings.map((warning, i) => {return <span key={i}>warning</span>})}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    return(
      <div className="widget CommuteTime">
        { this.state.loaded && this.state.error
          ? <div className="error">{ this.state.error }</div>
          : (<div className="ct-data">
              Work starts {moment().to(this.workStart)} <br />
              <div>
                { this.state.loaded && this.renderTimeToWork() }
              </div>
            </div>)
        }
      </div>
    )
  }
}
