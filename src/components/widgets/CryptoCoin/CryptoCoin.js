import React, { Component } from 'react'
import PropTypes from 'prop-types'
import request from 'superagent'
import classNames from 'classnames'

// crypto icons pulled from https://labs.allienworks.net/icons/cryptocoins/
import './assets/cryptocoins.css'
import './CryptoCoin.css'

const defaultProps = {
  mock: false,
  config: {
    refreshInterval: 5,
    coinsOwned: {
      bitcoin: 0,
      ripple: 0,
      ethereum: 0,
    }
  }
}

// TODO: CORS
class CryptoCoin extends Component {
  static propTypes = {
    mock: PropTypes.bool,
    config: PropTypes.shape({
      refreshInterval: PropTypes.integer, // minutes
      coinsOwned: PropTypes.object,
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
    this.fetchCoinMarketCap()
    this.timer = setInterval(
      () => this.fetchCoinMarketCap(),
      60000 * this.props.config.refreshInterval
    )
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  fetchCoinMarketCap() {
    this.setState({ loading: true, loaded: false })
    if (this.props.mock) {
      const mockData = require('./mockResponse.js').default
      this.setState({ error: null, loading: false, loaded: true, data: mockData })
    } else {
      request
        .get('https://api.coinmarketcap.com/v1/ticker/?limit=3')
        .end((err, res) => {
          if (err) {
            this.setState({ error: err, loading: false, loaded: true, data: [] })
          } else {
            this.setState({ error: null, loading: false, loaded: true, data: res.body })
          }
        })
    }
  }

  renderCoinData(item, index) {
    const coinIconCss = item.symbol === 'ETH'
      ? 'cc ' + item.symbol
      : 'cc ' + item.symbol + '-alt'

    return (
      <tr key={index} className="coin-item">
        <td className="cc-symbol"><i className={coinIconCss} /></td>
        <td>{item.name}</td>
        <td className="text-right">{ item.price_usd } USD</td>
        <td className={classNames({
          'text-center': true,
          'textAlert': parseFloat(item.percent_change_1h) < -0.1,
          'textSuccess': parseFloat(item.percent_change_1h) > 0.1,
        })}>{ item.percent_change_1h }%</td>
        <td className={classNames({
          'text-center': true,
          'textAlert': parseFloat(item.percent_change_24h) < -0.1,
          'textSuccess': parseFloat(item.percent_change_24h) > 0.1,
        })}>{ item.percent_change_24h }%</td>
      </tr>
    )
  }

  renderCoinAssets(item, index) {
    const coinsOwned = this.props.config.coinsOwned
    const amountOwned = coinsOwned[item.id] ? coinsOwned[item.id] : 0

    if (amountOwned > 0) {
      const amountValue = amountOwned * item.price_usd
      const decimals = item.price_usd < 10 ? 4 : 9 // short decimals for ripple and such
      return (
        <tr key={'asset'+index} className="coin-asset">
          <td />
          <td>{amountOwned.toFixed(decimals)}</td>
          <td className="text-right">{amountValue.toFixed(2)} USD</td>
          <td />
          <td />
        </tr>
      )
    } else {
      return <tr key={'asset'+index} className="coin-asset" />
    }
  }

  renderCoins(data) {
    let table = []
    let total = 0

    data.forEach((item, index) => {
      table.push(this.renderCoinData(item, index))
      table.push(this.renderCoinAssets(item, index))
      if (this.props.config.coinsOwned[item.id]) {
        total += this.props.config.coinsOwned[item.id] * item.price_usd
      }
    })

    return (
      <table cellSpacing="0" >
        <thead>
          <tr className="coin-data-header">
            <th />
            <th colSpan="2">CRYPTOCURRENCIES</th>
            <th className="text-center">1h</th>
            <th className="text-center">24h</th>
          </tr>
        </thead>
        <tbody>
          {table}
        </tbody>
        <tfoot>
          <tr>
            <td className="text-right" style={{ paddingRight: "20px" }} colSpan="3">Total value</td>
            <td colSpan="2">{total.toFixed(2)} USD</td>
          </tr>
        </tfoot>
      </table>
    )
  }

  render() {
    return(
      <div className="widget CryptoCoin">
        { this.state.loaded && this.state.error
          ? <div className="error">{ this.state.error }</div>
          : (<div className="coin-data">
              { this.renderCoins(this.state.data) }
            </div>)
        }
      </div>
    )
  }
}

CryptoCoin.defaultProps = defaultProps

export default CryptoCoin
