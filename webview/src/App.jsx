import { gql, useQuery } from '@apollo/client'
import {
  VSCodePanelTab,
  VSCodePanelView,
  VSCodePanels,
} from '@vscode/webview-ui-toolkit/react'
import PropTypes from 'prop-types'
import { useState } from 'react'

import './App.css'
import WordTokens from './components/WordTokens'
import SyntaxTrees from './components/SyntaxTrees'
import VerseRefNavigation from './components/VerseRefNavigation'

// FIXME: Images don't load; may need to rethink this for webview land
// vscode-webview://0dc0cgt0003ehsbssoome7pav0khvr7ouquancbks98h5m91ihd4/assets/react.svg

function App() {
  const [verseRef, setVerseRef] = useState('JHN 14:1')
  const [activeTab, setActiveTab] = useState('words')

  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
  }

  return (
    <>
      <VSCodePanels activeId={activeTab}>
        <VSCodePanelTab id="words" onClick={() => handleTabClick('words')}>
          Words
        </VSCodePanelTab>
        <VSCodePanelTab
          id="syntaxTrees"
          onClick={() => handleTabClick('syntaxTrees')}
        >
          Syntax Trees
        </VSCodePanelTab>
        <VSCodePanelView id="words" className="macula-panel-view">
          <VerseRefNavigation verseRef={verseRef} callback={setVerseRef} />
          {activeTab === 'words' && <WordTokens verseRef={verseRef} />}
        </VSCodePanelView>
        <VSCodePanelView id="syntaxTrees" className="macula-panel-view">
          <VerseRefNavigation verseRef={verseRef} callback={setVerseRef} />
          {activeTab === 'syntaxTrees' && <SyntaxTrees verseRef={verseRef} />}
        </VSCodePanelView>
      </VSCodePanels>
    </>
  )
}

export default App
