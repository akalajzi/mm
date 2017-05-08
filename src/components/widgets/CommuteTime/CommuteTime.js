import React, { Component } from 'react'
import PropTypes from 'prop-types'
import request from 'superagent'
import moment from 'moment'
import classNames from 'classnames'

import './CommuteTime.css'
import CommuteMap from './CommuteMap'

const google = window.google

const DIRECTIONS_API_URL = 'https://maps.googleapis.com/maps/api/directions/json?'
const DISTANCE_API_URL = 'https://maps.googleapis.com/maps/api/distancematrix/json?'
const API_KEY = 'AIzaSyCnS0fQyRDw509wn3c_tqBM3TZRibFitTI'
const origin = 'Apartmani+Dide+Stipe,+Velika+luka+1,+Stanići,+21310,+Omiš,+Croatia'
const destination = 'Stinice+ul.+12,+21000,+Split,+Croatia'

export default class CommuteTime extends Component {
  static propTypes = {
    mock: PropTypes.bool,
    config: PropTypes.shape({
      alwaysShow: PropTypes.bool,
    }),
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

  getFastestRoute(routes) {
    let fastestRoute = routes[0]
    routes.forEach((route, i) => {
      if (route.legs[0].duration.value < fastestRoute) {
        fastestRoute = route
      }
    })
    return fastestRoute
  }

  renderTimeToWork() {
    const routes = this.state.data.routes
    console.log('routes -> ', routes);
    const now = moment()
    const fastestRoute = this.getFastestRoute(routes)
    const latestLeave = moment(this.workStart).subtract(fastestRoute.legs[0].duration.value*1000)
    const alreadyLate = moment(latestLeave).isAfter(now)

    const fastest = {
      message: alreadyLate ? 'Leave home at latest ' + moment().to(latestLeave) : 'Leave NOW, you\'re late for work!',
      name: fastestRoute.summary === 'D8' ? 'Magistrala' : 'Priko Tugara',
      duration: fastestRoute.legs[0].duration.text,
      distance: fastestRoute.legs[0].distance.text,
    }

    return(
      <div className="ct-ttwork">
        <div className='textDimmed'>Work starts at {this.workStart.format('HH:mm')}</div>
        <div className={classNames({
          'ct-message': true,
          'textAlert': alreadyLate,
        })}>{ fastest.message }</div>

        <div className="ct-fastestRoute">
          <div className="ct-title textDimmed">Fastest Route</div>
          <div>
            { fastest.name } ({ fastest.distance}) - { fastest.duration }
          </div>
          <div className="ct-map">
            <CommuteMap
              origin={origin}
              destination={destination}
            />
          </div>
        </div>

        <div className="ct-alternativeRoutes">
          { routes.map((route, index) => {
            if (route.overview_polyline.points !== fastestRoute.overview_polyline.points) {
              // console.log('route sum', route.summary);
              // console.log('fastest sum', fastest.summary);
              const name = route.summary === 'D8' ? 'Magistrala' : 'Priko Tugara'
              const distance = route.legs[0].distance.text
              const duration = route.legs[0].duration

              return (
                <div key={index}>
                  <div className='ct-title textDimmed'>Alternative Routes</div>
                  <div>
                    {name} ({distance}) - {duration.text}
                  </div>
                  <div className="textAlert">
                    {route.warnings.map((warning, i) => {return <span key={i}>warning</span>})}
                  </div>
                </div>
              )
            }
          })}
        </div>
      </div>
    )
  }

  render() {

    // skip render if we dont need it
    if (!this.props.config.alwaysShow) {
      return <div />

    } else {
      return(
        <div className="widget CommuteTime">
          { this.state.loaded && this.state.error
            ? <div className="error">{ this.state.error }</div>
            : (<div className="ct-data">
              <div>
                { this.state.loaded && this.renderTimeToWork() }
              </div>
            </div>)
          }
        </div>
      )
    }

  }
}
