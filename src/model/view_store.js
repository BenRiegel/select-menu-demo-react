// module: view_store.js
// author: Ben Riegel
// overview: declares and exports the ViewStore class. The constructor
// initializes the state variable with one properties. Action methods are
// created which update the state in specific ways based on the type of action.


//----- imports ----------------------------------------------------------------

import Store from '../utils/store.js';


//----- export code block ------------------------------------------------------

export default class ViewStore extends Store{

  //the view stores contains a state variable with one property that specifies
  //whether an animation is currently in progress.
  constructor(){
    super({
      animationInProgress: false,
    });
  }

  //various actions that update the state object
  animationStartAction(){
    return this.setState('animationStartAction', {animationInProgress:true} );
  }

  animationEndAction(){
    return this.setState('animationEndAction', {animationInProgress:false} );
  }

}
