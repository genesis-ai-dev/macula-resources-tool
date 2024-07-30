import { useQuery, gql } from '@apollo/client';

import './App.css'

// FIXME: Images don't load; may need to rethink this for webview land
// vscode-webview://0dc0cgt0003ehsbssoome7pav0khvr7ouquancbks98h5m91ihd4/assets/react.svg

const MACULA_TOKEN = gql`
{
  wordTokens(
  filters: {
    scriptureReference: {usfmRef: "JHN 14:1", textualEdition:"SBLGNT"}
  },
  pagination: {limit: 1, offset: 0}
  ) {
    id
    value
    data
  }
}
`;

function DisplayMaculaToken() {
  const { loading, error, data } = useQuery(MACULA_TOKEN);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.wordTokens.map(({ id, value, data }) => (
    <div key={id}>
      <h3>{value}</h3>
      <ul style={{ textAlign: 'initial'}}>
        {Object.entries(data).map(([key, value]) => (
          value && (
            <li key={key}>
              {key}: <code style={{ color: 'black', backgroundColor: '#b6b6b6'}}>{value || ' '}</code>
            </li>
          )
        ))}
      </ul>
    </div>
  ));
}

function App() {

  return (
    <>
      <h1>Macula Resources Tool</h1>
      <div className="card">
        <DisplayMaculaToken />
      </div>
    </>
  )
}

export default App
