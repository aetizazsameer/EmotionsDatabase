//----------------------------------------------------------------------
// PennySearch.jsx
// Author: Aetizaz Sameer
//----------------------------------------------------------------------

import React from 'react';

class PennySearch extends React.Component
{
   constructor(props)
   {
      super(props);
      this.state = {query: ''};
      this._controller = null;
   }

   getResults(query)
   {
      let encodedQuery = encodeURIComponent(query);
      let url = '/searchresults?query=' + encodedQuery;

      if (this._controller !== null)
         this._controller.abort();
      this._controller = new AbortController();

      fetch(url, {signal: this._controller.signal})
         .then((resp) => {return resp.text();})
         .then((list) => {this.setState({videos: list});})
         .catch((error) => {return console.log(error);});
   }

   render()
   {
      return (
         <div>
             <h1>Search</h1>
             {'Enter search query: '}
             <input
                 type='text'
                 onInput={ ((event) => {
                    let query = event.target.value;
                    this.getResults(query);
                 })}
                 autoFocus />
             <hr />

             <div dangerouslySetInnerHTML=
                { {__html: this.state.videos} }/>

         </div>
      );
   }
}

export default PennySearch;
