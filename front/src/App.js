import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
// import mongoose = require('mongoose');
import {mongo_conn} from "./providers/db/mongo-conn";

function App() {
  const {connectToServer} = mongo_conn;

  useEffect(() => {
//     const db_connect = config.mongoDBurl;
// mongoose.connect(db_connect, { useNewUrlParser: true, useUnifiedTopology: true })
// .then( response =>{
//     console.log('Mongodb Connected...');

connectToServer();
    
    
// }).catch(err => {
//     console.log('DB Connection Failed.');
// });
    
  }, [])

  return (
    <Router>
      <Switch>
        <Route path="/" isLoading component={Home} exact />
      </Switch>
    </Router>
  );
}

export default App;
