import React from 'react'
import moment from 'moment'

export default function Note({note}) {

	const iconClassName = note.reminder ? 'clock-o' : 'pencil'
	const date = note.reminder ? moment().calendar(note.reminder) : null

	return(
		<div key={note.id} className="NoteItem">
			<div className='NoteIcon'>
				<i className={'fa fa-' + iconClassName} />
			</div>
			<div className='NoteDetails'>
				{ date && <div className="NoteReminder textDimmed">{ date }</div> }
				<div className="NoteTitle">{note.title}</div>
				<div className="NoteText textDimmed">{note.text}</div>
			</div>
		</div>
	)
}
