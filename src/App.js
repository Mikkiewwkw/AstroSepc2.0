import React from "react";
import "./App.css";
import Nav from "./Nav";
import Dashboard from "./Dashboard";

function App() {
  return (
    <div className="App">
      <div className="container-fluid">
        <Nav />
        <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
          <main>
            <div>
              <h1>AST 1001: AstroSpec</h1>
              <p className="text-center">
                Compute one-dimensional cut across images and display spectrum.
              </p>
            </div>
            <Dashboard />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
