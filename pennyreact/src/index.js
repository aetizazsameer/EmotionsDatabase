//----------------------------------------------------------------------
// main.js
// Author: Lucas Manning
//----------------------------------------------------------------------

import React from 'react';
import ReactDOM from 'react-dom';
import PennyHeader from './PennyHeader.jsx';
import PennySearch from './PennySearch.jsx';
import PennyFooter from './PennyFooter.jsx';
import Table from './Table.jsx';
import Form from './Form.jsx';

ReactDOM.render(
    <div>
        <PennyHeader />
        <PennySearch />
        <Form />
        <Table />
        <PennyFooter />
    </div>,
    document.getElementById('root')
);
