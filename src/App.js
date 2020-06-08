import React from "react";
import "./App.css";
import Nav from "./components/Nav";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Images from "./components/Images";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container-fluid">
          <Nav />
          <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
            <main>
              <Switch>
                <Route path="/" exact>
                  <Dashboard />
                </Route>
                <Route path="/images">
                  <Images />
                </Route>
              </Switch>
              {/*<Dashboard />*/}
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
