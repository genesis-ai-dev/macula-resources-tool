import { gql, useQuery } from '@apollo/client'
import PropTypes from 'prop-types'

// TODO: Restore textualEdition to filter
const MACULA_SYNTAX_TREES = gql`
query GetTrees($verseRef: String!) {
  syntaxTrees(filters: {scriptureReference: {usfmRef: $verseRef}}) {
    xmlId
  }
}
`
function SyntaxTrees({ verseRef }) {
  const { loading, error, data } = useQuery(MACULA_SYNTAX_TREES, {
    variables: { verseRef },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>

  return data.syntaxTrees.map(({ xmlId }) => <p key={xmlId}>{xmlId}</p>)
}

SyntaxTrees.propTypes = {
  verseRef: PropTypes.string.isRequired,
}
export default SyntaxTrees
