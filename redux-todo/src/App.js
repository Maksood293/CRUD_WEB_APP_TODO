import React from "react";
import "./App.css";
import Registration from "./screen/Registration";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./screen/Home";
import Navbar from "./components/navbar";
import Signin from "./screen/Signin.js";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Route path="/" exact component={Home} />
        <Route path="/register" component={Registration} />
        <Route exact path="/signin" component={Signin} />
      </BrowserRouter>
    </div>
  );
}

export default App;
