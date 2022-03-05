// module: Output.js
// author: Ben Riegel
// overview: declares and exports the Output component class. This component
// displays the messages about select menu events


//----- imports ----------------------------------------------------------------

import React, { Component } from 'react';
import '../stylesheets/output.css';


//----- export code block ------------------------------------------------------

export default class Output extends Component{

  //----- private code block -----

  #displayMessages(){
    return this.props.messages.map( (message, index) => {
      return <p key={index.toString()}> { message} </p>;
    });
  }

  //----- public code block -----

  constructor(props){
    super(props);
    this.props = props;
    this.content = React.createRef();
  }

  componentDidUpdate() {
      this.content.current.scrollTop = this.content.current.scrollHeight;
   }

  render(){
    return (
      <div className='output' ref={this.content}>
        { this.#displayMessages() }
      </div>
    );
  }

}
