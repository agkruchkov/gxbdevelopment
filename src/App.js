import React from "react";
import configureAppStore from "./store/store";
import { Provider } from "react-redux";

import FunctionForm from "./components/functionForm";
import Graph from "./components/graph";

const store = configureAppStore();

const App = (props) => {
  return (
    <Provider store={store}>
      <div className="app container">
        <header className="header"></header>
        <main className="main">
          <FunctionForm />
          <Graph />
        </main>
      </div>
    </Provider>
  );
};

export default App;
