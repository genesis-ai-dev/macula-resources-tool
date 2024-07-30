import { gql, useQuery } from '@apollo/client'
import { VSCodePanelView, VSCodePanels } from '@vscode/webview-ui-toolkit/react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import VerseRefNavigation from './VerseRefNavigation'

import './App.css'

// FIXME: Images don't load; may need to rethink this for webview land
// vscode-webview://0dc0cgt0003ehsbssoome7pav0khvr7ouquancbks98h5m91ihd4/assets/react.svg

// TODO: Restore textualEdition to filter
const MACULA_TOKEN = gql`
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

function DisplayMaculaToken({ verseRef }) {
  const { loading, error, data } = useQuery(MACULA_TOKEN, {
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

DisplayMaculaToken.propTypes = {
  verseRef: PropTypes.object.isRequired,
}

function App() {
  const [verseRef, setVerseRef] = useState('JHN 14:1')
  return (
    <>
      <VSCodePanels>
        <VSCodePanelView
          id="Words"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          <VerseRefNavigation verseRef={verseRef} callback={setVerseRef} />
          <DisplayMaculaToken verseRef={verseRef} />
        </VSCodePanelView>
      </VSCodePanels>
    </>
  )
}

export default App
