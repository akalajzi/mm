import React, { Component } from 'react'
import request from 'superagent'
import classNames from 'classnames'

// crypto icons pulled from https://labs.allienworks.net/icons/cryptocoins/
import './assets/cryptocoins.css'
import './CryptoCoin.css'


const coinsOwned = {
  bitcoin: 2.000000000,
  ripple: 3917.4,
  ethereum: 4.6721528,
}

// TODO: CORS
export default class CryptoCoin extends Component {
  constructor(props) {
    super(props)

    this.state= {
      loading: false,
      error: null,
      data: [],
      coinsOwned: coinsOwned,
    }
  }

  componentDidMount() {
    this.fetchCoinMarketCap()
  }

  fetchCoinMarketCap() {
    this.setState({ loading: true, loaded: false })
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
    const amountOwned = this.state.coinsOwned[item.id] ? this.state.coinsOwned[item.id] : 0

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
      if (this.state.coinsOwned[item.id]) {
        total += this.state.coinsOwned[item.id] * item.price_usd
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
    setInterval(() => {
      this.fetchCoinMarketCap()
    }, 60000*5) // update every 5 minutes

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
