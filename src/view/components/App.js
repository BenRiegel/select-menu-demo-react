// module: App.js
// author: Ben Riegel
// overview: declares and exports the App component class. This component
// creates and initializes the select menu compnent, the radio buttons and
// the output area for messages. It also creates the functions for handling
// the interactions among the components.


//----- imports ----------------------------------------------------------------

import React, { Component } from 'react';
import SelectMenu from './SelectMenu.js';
import Output from './Output.js';
import '../stylesheets/app.css';


//----- export code block ------------------------------------------------------

export default class App extends Component {

  //----- private code block -----

  //object that represents the initial state of the global store
  #initGlobalStateValue = {
    options: [ {key:'0', value:'option1', label:'Option 1'},
               {key:'1', value:'option2', label:'Option 2'},
               {key:'2', value:'option3', label:'Option 3'},
               {key:'3', value:'option4', label:'Option 4'},
               {key:'4', value:'option5', label:'Option 5'},
               {key:'5', value:'option6', label:'Option 6'},
             ],
    selectedOptionIndex: 0,
    openState: 'closed',
  }

  //function that updates the messages when the global store is updated and
  //the selectedOptionValue property has changed
  #onGlobalStoreUpdate = ( {selectedOptionValue} ) => {
    if (selectedOptionValue.hasChanged){
      const { newValue } = selectedOptionValue;
      const newMessage = 'New selected value - ' + newValue;
      let newArray = [...this.state.messages, newMessage];
      this.setState( {messages:newArray} );
    }
  }

  //function that updates the messages when the view store is updated and
  //the animationInProgress property has changed
  #onViewStoreUpdate = ( {animationInProgress} ) => {
    if (animationInProgress.hasChanged){
      const { newValue } = animationInProgress;
      let newMessage;
      if (newValue === true){
        newMessage = 'Animation starting . . . ';
      } else {
        newMessage = 'Animation ended';
      }
      let newArray = [...this.state.messages, newMessage];
      this.setState( {messages:newArray} );
    }
  }

  //functions that handle radio button clicks
  #enableControlsHandler = (evt) => {
     const newValue = (evt.target.value === 'Enabled');
     this.setState( {controlsEnabled:newValue} );
  }

  #animatingHandler = (evt) => {
    const newValue = (evt.target.value === 'Enabled');
    this.setState( {animationsEnabled:newValue} );
  }

  //----- public code block -----

  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      controlsEnabled: true,
      animationsEnabled: true,
    };
  }

  render(){
    return (
      <div className="app">
        <main>
          <section>
            <form name='controls'>
              <p>Controls</p>
              <div>
                <input type='radio'
                       id='controls-enabled'
                       name='is-enabled'
                       value='Enabled'
                       defaultChecked
                       onClick={this.#enableControlsHandler}/>
                <label htmlFor='controls-enabled'>Enabled</label>
              </div>
              <div>
                <input type='radio'
                       id='controls-disabled'
                       name='is-enabled'
                       value='Disabled'
                       onClick={this.#enableControlsHandler}/>
                <label htmlFor='controls-disabled'>Disabled</label>
              </div>
            </form>
            <form name='animations'>
              <p>Animations</p>
              <div>
                <input type='radio'
                       id='animations-enabled'
                       name='is-animating'
                       value='Enabled'
                       defaultChecked
                       onClick={this.#animatingHandler}/>
                <label htmlFor='animations-enabled'>Enabled</label>
              </div>
              <div>
                <input type='radio'
                       id='animations-disabled'
                       name='is-animating'
                       value='Disabled'
                       onClick={this.#animatingHandler}/>
                <label htmlFor='animations-disabled'>Disabled</label>
              </div>
            </form>
          </section>

          <section>
            <SelectMenu initGlobalStateValue={this.#initGlobalStateValue}
                        onGlobalStoreUpdate={this.#onGlobalStoreUpdate}
                        onViewStoreUpdate={this.#onViewStoreUpdate}
                        controlsEnabled={this.state.controlsEnabled}
                        animationsEnabled={this.state.animationsEnabled}>
            </SelectMenu>
          </section>

          <section>
            <p>Event Messages</p>
            <Output messages={this.state.messages}/>
          </section>

        </main>
      </div>
    );
  }

}
