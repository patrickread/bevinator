import React from 'react'
import BevinImage from './BevinImage.jsx'

import '../assets/css/app.less'
import '../assets/css/bootstrap.min.css'

export default class App extends React.Component {
  render() {
    return <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <BevinImage />
        </div>
      </div>
    </div>;
  }
}
