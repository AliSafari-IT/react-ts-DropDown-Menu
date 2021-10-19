import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import { DropdownSelector } from './dropdown-selector'
import './style.css';

interface AppProps { }
interface AppState {
  name: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: 'you'
    };
  }

  render() {
    return (
      <div style={{width: "50%", textAlign:"center", marginLeft:"25%", marginTop:"20px"}}>
        <Hello name={this.state.name} />
        <p>
          How can I make the DropdownSelector component compile without type errors?
        </p>
        <div>
          <DropdownSelector />
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
