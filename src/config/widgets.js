export default {
  left: {
    top: [
      { name: 'Time' },
      {
        name: 'CryptoCoin',
        mock: true,
        config: {
          refreshInterval: 5,
          coinsOwned: {
            bitcoin: 2.000000000,
            ripple: 0,
            ethereum: 4.6721528,
          }
        },
      },
      {
        name: 'Notes',
        mock: false,
        config: {
          itemLimit: 10,
        },
      },
    ],
    bottom: [],
  },
  right: {
    top: [
      {
        name: 'YahooWeather',
        mock: true,
        config: {
          temperatureUnit: 'c',
        },
      },
      {
        name: 'CommuteTime',
        mock: true,
        config: {
          alwaysShow: false,
        },
      },
      {
        name: 'Today',
        mock: false,
      }
    ],
    bottom: [],
  },
  center: {
    top: [],
    center: [],
    bottom: [],
  }
}
