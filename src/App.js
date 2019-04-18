import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import Stock from './containers/Stock/Stock'


class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
            <Stock/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
