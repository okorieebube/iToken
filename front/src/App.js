// import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Provider } from "react-redux";
import store from "./providers/redux/store";

import Home from "./pages/Home";

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" isLoading component={Home} exact />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
