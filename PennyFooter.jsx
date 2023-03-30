//----------------------------------------------------------------------
// PennyFooter.jsx
// Author: Lucas Manning
//----------------------------------------------------------------------

import React from 'react';

class PennyFooter extends React.Component
{
   constructor(props)
   {
      super(props);
      this.state = {datetime: new Date()};
   }

   componentDidMount()
   {
      window.setInterval((() => {this.tick()}), 1000);
   }

   tick()
   {
      this.setState({datetime: new Date()});
   }

   render()
   {
      return (
         <div>
            <hr />
            {'Date and time: ' + this.state.datetime.toLocaleString()}
            <br />
            {'Created by '}
            <a href="https://www.cs.princeton.edu/~rdondero">
            Bob Dondero</a>
         </div>
      );
   }
}

export default PennyFooter;
