import React, { Component } from 'react';
import ApiCall from './api-call-data'
import './styles/app.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <ApiCall />
      </div>
    );
  }
}

export default App;
