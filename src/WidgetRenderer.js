import React, { Component } from 'react'

import Zone from 'components/ui/Zone'
import widgets from 'config/widgets'

import CommuteTime from 'components/widgets/CommuteTime'
import CryptoCoin from 'components/widgets/CryptoCoin'
import Time from 'components/widgets/Time'
import YahooWeather from 'components/widgets/YahooWeather'
import { Notes, Today } from 'components/widgets/Notes'

import './App.css'

class WidgetRenderer extends Component {

  resolveComponent(widget, key) {
    switch (widget.name) {
      case 'CommuteTime':
        return <CommuteTime key={'w'+key} mock={widget.mock} config={widget.config} />
      case 'CryptoCoin':
        return <CryptoCoin key={'w'+key} mock={widget.mock} config={widget.config} />
      case 'Notes':
        return <Notes key={'w'+key} mock={widget.mock} config={widget.config} />
      case 'Time':
        return <Time key={'w'+key} />
      case 'Today':
        return <Today key={'w'+key} mock={widget.mock} config={widget.config} />
      case 'YahooWeather':
        return <YahooWeather key={'w'+key} mock={widget.mock} config={widget.config} />
      default:
        return <div />
    }
  }

  renderWidgets(widgets) {
    return widgets.map((widget, key) => {
      return this.resolveComponent(widget, key)
    })
  }

  render() {
    return (
      <div className='App'>
        <div className='zoneGroup-side'>
          <Zone className='topLeft'>
            { this.renderWidgets(widgets.left.top) }
          </Zone>
          <Zone className='bottomLeft'>
            { this.renderWidgets(widgets.left.bottom) }
          </Zone>
        </div>
        <div className='zoneGroup-center'>
          <Zone className='topCenter'>
            { this.renderWidgets(widgets.center.top) }
          </Zone>
          <Zone className='center'>
            { this.renderWidgets(widgets.center.center) }
          </Zone>
          <Zone className='bottomCenter'>
            { this.renderWidgets(widgets.center.bottom) }
          </Zone>
        </div>
        <div className='zoneGroup-side'>
          <Zone className='topRight'>
            { this.renderWidgets(widgets.right.top) }
          </Zone>
          <Zone className='bottomRight'>
            { this.renderWidgets(widgets.right.bottom) }
          </Zone>
        </div>
      </div>
    );
  }
}

export default WidgetRenderer
