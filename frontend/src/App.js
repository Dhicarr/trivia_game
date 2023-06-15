import './App.css';
import AddMovie from './AddMovies'
import TriviaGame from './TriviaGame'
import 'bootstrap/dist/css/bootstrap.min.css';
import Background from './Background';
function App() {
  return (
    <div className="App">
      <TriviaGame/>
      <Background/>
    </div>
  );
}

export default App;

