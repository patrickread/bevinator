import React from 'react'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import App from "./components/App.jsx";

function onUpdate() {
  window.scrollTo(0, 0)
}

const routes = (
  <Router onUpdate={onUpdate} history={browserHistory}>
    <Route path="/" component={App}>
    </Route>
  </Router>
)


export default routes
