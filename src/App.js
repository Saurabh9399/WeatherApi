import "./App.css";
import Weather from "./Weather";

function App() {
  const api_key = "2ec00ddac14e5de979bdf7e319652271";
  return (
    <div className="App">
      <Weather api_key={api_key} />
    </div>
  );
}

export default App;
