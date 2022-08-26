
import './App.css'

function App() {

  const api_key = 'YjZhOGJkYzYtMmY3Zi00ZjgxLTg4NmUtYWZmNDljY2UzZjcy'
  const type = '&type=track' //diff categories of search gives diff. if not specified(dropdown) just get track?/all?
  const input = 'tomboy'

  fetch(`https://api.napster.com/v2.2/search?apikey=${api_key}&query=${input}${type}`)
  .then((response) => response.json())
  .then((data) => console.log(data));

  return (
    <div className="App">
      <h1>music.</h1>
      <audio
      src='https://listen.hs.llnwd.net/g3/prvw/3/0/7/8/2/2351128703.mp3'
      autoPlay
      controls
      />
    </div>
  )
}

export default App
