import "./style.scss";
import Text from "./components/Text";
import Context from "./components/Context";

function App() {
  return (
    <div className="app">
      <Context>
        <Text />
      </Context>
    </div>
  );
}

export default App;
