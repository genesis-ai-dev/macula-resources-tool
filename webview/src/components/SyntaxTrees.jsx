import { gql, useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import '../styles/macula-greek/boxwood.css'
import '../styles/macula-greek/treedown.css'
import '../styles/macula-hebrew/hebrew-boxwood.css'
import '../styles/macula-hebrew/hebrew-treedown.css'

// TODO: Restore textualEdition to filter
const MACULA_SYNTAX_TREES = gql`
query GetTrees($verseRef: String!) {
  syntaxTrees(filters: {scriptureReference: {usfmRef: $verseRef}}) {
    xmlId
    data
  }
}
`

function prepareXml(content) {
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(content, 'text/xml')
  const serializer = new XMLSerializer()
  return serializer.serializeToString(xmlDoc.documentElement)
}

function getSyntaxTreesClassName(xmlId) {
  return xmlId.startsWith('o')
    ? 'hebrew-treedown hebrew-treedown-container'
    : 'treedown treedown-container'
}

function SyntaxTrees({ verseRef }) {
  const { loading, error, data } = useQuery(MACULA_SYNTAX_TREES, {
    variables: { verseRef },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>
  const syntaxTrees = data.syntaxTrees.map(({ xmlId, data }) => {
    return {
      xmlId,
      xml: prepareXml(data),
    }
  })
  return syntaxTrees.map(({ xmlId, xml }) => (
    <div
      className={`${getSyntaxTreesClassName(xmlId)}`}
      key={xmlId}
      dangerouslySetInnerHTML={{ __html: xml }}
    ></div>
  ))
}

SyntaxTrees.propTypes = {
  verseRef: PropTypes.string.isRequired,
}
export default SyntaxTrees
