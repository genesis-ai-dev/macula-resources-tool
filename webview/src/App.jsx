import { gql, useQuery } from '@apollo/client'
import {
  VSCodePanelTab,
  VSCodePanelView,
  VSCodePanels,
} from '@vscode/webview-ui-toolkit/react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import VerseRefNavigation from './VerseRefNavigation'

import './App.css'

// FIXME: Images don't load; may need to rethink this for webview land
// vscode-webview://0dc0cgt0003ehsbssoome7pav0khvr7ouquancbks98h5m91ihd4/assets/react.svg

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

function DisplayMaculaTokens({ verseRef }) {
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

DisplayMaculaTokens.propTypes = {
  verseRef: PropTypes.object.isRequired,
}

const MACULA_SYNTAX_TREES = gql`
query GetTrees($verseRef: String!) {
  syntaxTrees(filters: {scriptureReference: {usfmRef: $verseRef}}) {
    xmlId
  }
}
`
function DisplaySyntaxTrees({ verseRef }) {
  const { loading, error, data } = useQuery(MACULA_SYNTAX_TREES, {
    variables: { verseRef },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>

  return data.syntaxTrees.map(({ xmlId }) => <p key={xmlId}>{xmlId}</p>)
}

DisplaySyntaxTrees.propTypes = {
  verseRef: PropTypes.object.isRequired,
}

function App() {
  const [verseRef, setVerseRef] = useState('JHN 14:1')
  return (
    <>
      <VSCodePanels activeId="syntaxTrees">
        <VSCodePanelTab title="Words" id="words">
          Words
        </VSCodePanelTab>
        <VSCodePanelTab title="Syntax Trees" id="syntaxTrees">
          Syntax Trees
        </VSCodePanelTab>
        <VSCodePanelView id="words" className="macula-panel-view">
          <VerseRefNavigation verseRef={verseRef} callback={setVerseRef} />
          <DisplayMaculaTokens verseRef={verseRef} />
        </VSCodePanelView>
        <VSCodePanelView id="syntaxTrees" className="macula-panel-view">
          <VerseRefNavigation verseRef={verseRef} callback={setVerseRef} />
          <DisplaySyntaxTrees verseRef={verseRef} />
        </VSCodePanelView>
      </VSCodePanels>
    </>
  )
}

export default App
