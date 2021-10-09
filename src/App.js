import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <main>
          <Route exact path="/" component={HomePage} />
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
