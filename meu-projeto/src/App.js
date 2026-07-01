import './App.css';
import SayMyName from './components/SayMyName';
import Pessoa from './components/Pessoa';

function App() {

  const nome = "Maria"
  return (
    <div className="App">
      <SayMyName nome="Daniel" />
      <SayMyName nome="João" />
      <SayMyName nome={nome} />
      <Pessoa nome="Rodrigo" idade="28" profissao="Programador" foto="https://placehold.co/150x150"  />
    </div>
  );
}

export default App;
