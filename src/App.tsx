import {BrowserRouter} from "react-router-dom"
import {Router} from "router/Router"
import React from "react"
import {RecoilRoot} from "recoil"
function App() {
  return (
    <RecoilRoot>
    <BrowserRouter>
      <Router></Router>
    </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
