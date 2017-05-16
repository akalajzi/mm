import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import _ from 'lodash'
import moment from 'moment'

import { NOTES_BY_USER_QUERY } from './notes.graphql'
import './Notes.css'


const USER_ID = "cj1jl8xl8ikt50164272zrr7s"

const defaultProps = {
  notes: [],
  loading: false,
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
}

class Notes extends Component {
  constructor(props) {
    super(props)

    this.state = defaultState
  }

  componentWillReceiveProps(nextProps) {
    const oldData = this.props
    const newData = nextProps

    if (!!newData.notes && (newData.notes !== oldData.notes)) {
      this.setState({
        dataSource: _.clone(newData.notes.slice().reverse())
      })
    }
  }

  render() {
    // const { loading, notes } = this.props
		console.log(this.state.dataSource);
    return (
      <div className="widget Notes">
        Notes
        { this.state.dataSource.map((note) => {
          return (
            <div key={note.id} className="NoteItem">
              <div className="NoteTitle">
								<span className="NoteReminder textDimmed">
									{ moment(note.reminder).format('DD.MM.YYYY. HH:mm') }
								</span>
								{note.title}
							</div>
              <div className="NoteText textDimmed">{note.text}</div>
            </div>
          )
        })}
      </div>
    )
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
