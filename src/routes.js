import React from 'react'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import App from "./components/App.jsx";
import ReactGA from 'react-ga';

ReactGA.initialize('UA-104419979-1');

function onUpdate() {
  window.scrollTo(0, 0)
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

const routes = (
  <Router onUpdate={onUpdate} history={browserHistory}>
    <Route path="/" component={App}>
    </Route>
  </Router>
)


export default routes
