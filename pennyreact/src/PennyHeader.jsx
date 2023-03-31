//----------------------------------------------------------------------
// PennyHeader.jsx
// Author: Lucas Manning
//----------------------------------------------------------------------

import React from 'react';

class PennyHeader extends React.Component
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
      this.setState({datetime: new Date()})
   }

   greeting()
   {
      let hours = this.state.datetime.getHours();
      let ampm = 'morning';
      if (hours >= 12)
         ampm = 'afternoon';
      return ampm;
   }

   render()
   {
      return (
         <div>
            <hr />
            {'Good ' + this.greeting() + ' and welcome to Emotions Net'}
            <hr />
         </div>
      );
   }
}

export default PennyHeader;
