import './App.css';

function App() {

  const name = 'Daniel'
  const newName = name.toUpperCase()

  function sum(a, b) {
    return a + b
  }

  const url = 'https://placehold.co/150x150'

  return (
    <div className="App">
      <h2>Alterando o JSX</h2>
      <p>Olá, {newName}</p>
      <p>Soma: {sum(1, 2)}</p>
      <img src={url} alt="Minha Imagem"></img>
    </div>
  );
}

export default App;
