import './App.css';
import SayMyName from './components/SayMyName';
import Pessoa from './components/Pessoa';
import Frase from './components/Frase';
import List from './components/List';

function App() {

  const nome = "Maria"
  return (
    <div className="App">
      <Frase />
      <Frase />
      <h1>Testando CSS</h1>
      <SayMyName nome="Daniel" />
      <SayMyName nome="João" />
      <SayMyName nome={nome} />
      <Pessoa nome="Rodrigo" idade="28" profissao="Programador" foto="https://placehold.co/150x150"  />
      <List />
    </div>
  );
}

export default App;
