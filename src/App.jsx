
import { useState } from 'react'
import './App.css'

function App() {
  const [track, setTrack] = useState('')

  const api_key = 'YjZhOGJkYzYtMmY3Zi00ZjgxLTg4NmUtYWZmNDljY2UzZjcy'
  const type = '&type=track' //diff categories of search gives diff. if not specified(dropdown) just get track?/all?
  const input = 'tomboy'

  fetch(`https://api.napster.com/v2.2/search?apikey=${api_key}&query=${input}${type}`)
  .then((response) => response.json())
  .then((data) => setTrack(data.search.data.tracks[0].previewurl));

  return (
    <div className="App">
      <h1>music.</h1>
      <audio
      src={track}
      autoPlay
      controls
      />
    </div>
  )
}

export default App
