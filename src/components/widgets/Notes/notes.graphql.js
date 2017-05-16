import gql from 'graphql-tag';

const NOTE_FRAGMENT = gql`
  fragment NoteFragment on Note {
    id
    createdAt
    updatedAt
    title
    text
    reminder
    colorLabel
  }
`

const NOTES_BY_USER_QUERY = gql`
  query Notes($userId: ID) {
    allNotes(filter: {
      user: {id: $userId}
    }) {
      ...NoteFragment
    }
  }
  ${NOTE_FRAGMENT}
`

export {
  NOTES_BY_USER_QUERY,
}
