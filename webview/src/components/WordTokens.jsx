import { gql, useQuery } from '@apollo/client'
import PropTypes from 'prop-types'

// TODO: Restore textualEdition to filter
const MACULA_TOKENS = gql`
query GetTokens($verseRef: String!) {
  wordTokens(
  filters: {
    scriptureReference: {usfmRef: $verseRef}
  },
  ) {
    id
    value
    data
  }
}
`

function WordTokens({ verseRef }) {
  const { loading, error, data } = useQuery(MACULA_TOKENS, {
    variables: { verseRef },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>

  return data.wordTokens.map(({ id, value, data }) => (
    <div key={id}>
      <h3>{value}</h3>
      <ul style={{ textAlign: 'initial' }}>
        {Object.entries(data).map(
          ([key, value]) =>
            value && (
              <li key={key}>
                {key}:{' '}
                <code style={{ color: 'black', backgroundColor: '#b6b6b6' }}>
                  {value || ' '}
                </code>
              </li>
            ),
        )}
      </ul>
    </div>
  ))
}

WordTokens.propTypes = {
  verseRef: PropTypes.string.isRequired,
}

export default WordTokens
