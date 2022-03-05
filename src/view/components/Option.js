// module: Option.js
// author: Ben Riegel
// overview: declares and exports the Option component class. This component
// handles click events and adding/removing the click handler from the dom
// when necessary. It also updates the selected class when the option is
// selected by the user.


//----- imports ----------------------------------------------------------------

import React, { Component } from 'react';
import '../stylesheets/option.css';


//----- export code block ------------------------------------------------------

export default class Option extends Component{

  //----- private code block -----

  //when an option is clicked, the global store's click action is executed
  #clickHandler = () => {
    this.props.globalStore.clickAction({
      optionValue: this.props.value,
      optionKey: this.props.dataKey,
    });
  };

  //if the controls are enabled and an animation is not in progress, this funcion
  //returns the click handler and null otherwise
  #getNewClickHandlerValue(){
    if (this.props.controlsEnabled && !this.props.viewStore.animationInProgress){
      return this.#clickHandler;
    } else {
      return null;
    }
  }

  //if the option's key is equal to the selected option key in the global store,
  //then the function returns 'selected' and an empty string otherwise
  #getNewSelectedClass(){
    if (this.props.dataKey === this.props.globalStore.selectedOptionKey){
      return 'selected';
    } else {
      return '';
    }
  }

  //this function returns a string with all the class names
  #getClasses(){
    if (this.state.selectedClass === 'selected'){
      return 'select-option selected';
    } else {
      return 'select-option';
    }
  }

  //----- public code block -----

  constructor(props){
    super(props);
    this.props = props;

    this.state = {
      selectedClass: this.#getNewSelectedClass(),
    }
  }

  //when the component has mounted, a listener is registered with the global
  //store. When the global store is updated, the callback calculates whether
  //the option is currently selected and updates the state
  componentDidMount(){
    this.props.globalStore.registerUpdateListener({
      type: 'option.selectedClassAttr',
      callback: () => {
        const newSelectedClass = this.#getNewSelectedClass();
        this.setState( {selectedClass:newSelectedClass} );
      }
    });
  }

  render(){
    return (
      <div className={ this.#getClasses() }
           data-key={this.props.dataKey}
           value={this.props.value}
           onClick={ this.#getNewClickHandlerValue() }>
        {this.props.children}
      </div>
    );
  }

}
