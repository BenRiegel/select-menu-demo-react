// module: SelectMenu.js
// author: Ben Riegel
// overview: declares and exports the SelectMenu component class. This
// component creates the global store and the view store. It also registers
// listeners with the stores and updates the component state when the stores
// update. It also handles the animation when the open state changes.


//----- imports ----------------------------------------------------------------

import React, { Component } from 'react';
import Option from './Option.js';
import GlobalStore from '../../model/global_store.js';
import ViewStore from '../../model/view_store.js';
import '../stylesheets/select_menu.css';


//----- export code block ------------------------------------------------------

export default class SelectMenu extends Component{

  //----- private code block -----

  //resolve function from returned promise in this.#animate
  #resolveF;

  //when animation ends, resolve the promise
  #animationEndHandler = () => {
    this.#resolveF();
  }

  //when animating, call animation start action, then create new promise, which
  //executes the animation function. When animation has ended, call animation
  //end action
  async #animate(f){
    await this.viewStore.animationStartAction();
    await new Promise( resolve => {
      this.#resolveF = resolve;
      f();
    });
    await this.viewStore.animationEndAction();
  }

  //creates new child options
  #createOptions(){
    return this.state.children.map( (option, index) => {
      return <Option key={index.toString()}
                     dataKey={option.key}
                     value={option.value}
                     globalStore={this.globalStore}
                     viewStore={this.viewStore}
                     controlsEnabled={this.props.controlsEnabled}>
              {option.label}
            </Option>
      });
  }

  //gets children value from store
  #getChildrenValue(){
    return this.globalStore.options;
  }

  //calculatutes animating class value from store property
  #getAnimatingClassValue(){
    if (this.viewStore.animationInProgress){
      return 'animating';
    }
    return null;
  }

  //creates list of class names
  #getClasses(){
    if (this.state.animatingClass === 'animating'){
      return 'select animating';
    } else {
      return 'select';
    }
  }

  //gets open state value from store property
  #getOpenStateValue(){
    return this.globalStore.openState;
  }

  //----- public code block -----

  constructor(props){
    super(props);
    this.props = props;

    //creates global store
    this.globalStore = new GlobalStore(this.props.initGlobalStateValue);
    //set notification order for the clickAction
    this.globalStore.setNotificationOrder('clickAction', [
      'option.selectedClassAttr',
      'select.openStateDataAttr',
      'app.messages'
    ]);
    //creates view store
    this.viewStore = new ViewStore();

    this.state = {
      children: this.#getChildrenValue(),
      animatingClass: this.#getAnimatingClassValue(),
      openState: this.#getOpenStateValue(),
    }
  }

  //when component mounts, register listeners that update messages and
  //state values
  componentDidMount(){
    this.globalStore.registerUpdateListener({
      type: 'app.messages',
      callback: this.props.onGlobalStoreUpdate
    });
    this.globalStore.registerUpdateListener({
      type: 'select.openStateDataAttr',
      callback: () => {
        const newValue = this.#getOpenStateValue();
        if (newValue !== this.state.openState){
          if (this.props.animationsEnabled){
            return this.#animate( () => {
              this.setState( {openState:newValue} );
            });
          } else {
            this.setState( {openState:newValue} );
          }
        }
      }
    });
    this.viewStore.registerUpdateListener({
      type: 'app.messages',
      callback: this.props.onViewStoreUpdate
    });
    this.viewStore.registerUpdateListener({
      type: 'select.animatingClassAttr',
      callback: () => {
        const newValue = this.#getAnimatingClassValue();
        this.setState( {animatingClass:newValue} );
      }
    });
  }

  render(){
    return (
      <div className={ this.#getClasses() }
           data-state={this.state.openState}
           onAnimationEnd={this.#animationEndHandler}>
        { this.#createOptions() }
      </div>
    );
  }

}
