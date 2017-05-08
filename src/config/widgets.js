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
            ripple: 3917.4,
            ethereum: 4.6721528,
          }
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
        config: {},
      },
      {
        name: 'CommuteTime',
        mock: false,
        config: {
          alwaysShow: true,
        },
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
