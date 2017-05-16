import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import _ from 'lodash'
import moment from 'moment'

import Note from './components/Note'
import { NOTES_BY_USER_QUERY } from './notes.graphql'
import './Notes.css'

const USER_ID = "cj1jl8xl8ikt50164272zrr7s"

const defaultProps = {
  today: false,
  notes: [],
  loading: false,
  mock: true,
  config: {
    itemLimit: 10,
  }
}

const defaultState = {
  note: {
    textField: '',
    errors: {},
  },
  dataSource: [],
}

const propTypes = {
  loading: PropTypes.bool.isRequired,
  notes: PropTypes.array.isRequired,
  mock: PropTypes.bool,
  config: PropTypes.shape({
    itemLimit: PropTypes.number,
  }),
  today: PropTypes.bool,
}

class Notes extends Component {
  constructor(props) {
    super(props)

    this.state = defaultState
  }

  componentWillReceiveProps(nextProps) {
    const oldData = this.props
    const newData = nextProps
    const itemLimit = this.props.config.itemLimit

    if (!!newData.notes && (newData.notes !== oldData.notes)) {
      const newDataSource = _.clone(newData.notes.slice().reverse())
      const filteredDataSource = this.props.today
        // today widget
        ? this.cutToLimit(itemLimit, this.getNotesForToday(newDataSource))
        // all notes widget
        : this.cutToLimit(this.props.config.itemLimit, newDataSource)

      this.setState({
        dataSource: filteredDataSource
      })
    }
  }

  cutToLimit(limit, data) {
    let result = []
    for (let i = 0; i < limit; i++) {
      if (data[i]) {
        result.push(data[i])
      }
    }
    return result
  }

  getNotesForToday(data) {
    return _.filter(data, (item) => { moment().isSame(item.reminder, 'day') })
  }

  render() {
    if (this.props.today) {
      // today widget
      return (
        <div className="widget Notes">
          <div className="NotesTitle textDimmed">SCHEDULED FOR TODAY</div>
          { this.state.dataSource.length === 0
            ? (<div className="NotesTodayEmpty">
                All clear. Enjoy! <i className="fa fa-thumbs-o-up" />
              </div>)
            : this.state.dataSource.map((note) => { return <Note key={note.id} note={note} /> })
          }
        </div>
      )
    } else {
      // notes widget
      return (
        <div className="widget Notes">
          <div className="NotesTitle textDimmed">NOTES & REMINDERS</div>
          { this.state.dataSource.map((note) => { return <Note key={note.id} note={note} /> }) }
        </div>
      )
    }
  }
}

Notes.defaultProps = defaultProps
Notes.propTypes = propTypes

const userNotesQuery = graphql(NOTES_BY_USER_QUERY, {
  options: ({ id }) => ({ variables: { userId: USER_ID } }),
  props: ({ data: { loading, allNotes } }) => ({
    loading, notes: allNotes
  }),
})

export default compose(
  userNotesQuery,
)(Notes)
