//----------------------------------------------------------------------
// PennySearch.jsx
// Author: Lucas Manning and Bob Dondero
//----------------------------------------------------------------------

import React from 'react';

class PennySearch extends React.Component
{
   constructor(props)
   {
      super(props);
      this.state = {books: ''};
      this._controller = null;
   }

   getResults(author)
   {
      let encodedAuthor = encodeURIComponent(author);
      let url = '/searchresults?author=' + encodedAuthor;

      if (this._controller !== null)
         this._controller.abort();
      this._controller = new AbortController();

      fetch(url, {signal: this._controller.signal})
         .then((resp) => {return resp.text();})
         .then((text) => {this.setState({books: text});})
         .catch((error) => {return console.log(error);});
   }

   render()
   {
      return (
         <div>
             <h1>Author Search</h1>
             {'Please enter an author name: '}
             <input
                 type='text'
                 onInput={ ((event) => {
                    let author = event.target.value;
                    this.getResults(author);
                 })}
                 autoFocus />
             <hr />

             <div dangerouslySetInnerHTML=
                { {__html: this.state.books} }/>

         </div>
      );
   }
}

export default PennySearch;
