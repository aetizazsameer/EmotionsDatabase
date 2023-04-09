//----------------------------------------------------------------------
// main.js
// Author: Aetizaz Sameer, Andrew Hwang, Tyler Vu
//----------------------------------------------------------------------

import React from 'react';
import ReactDOM from 'react-dom';
import PennyHeader from './PennyHeader.jsx';
import PennySearch from './PennySearch.jsx';
import PennyFooter from './PennyFooter.jsx';
import Table from './Table.jsx';
import Form from './Form.jsx';
import Grid from './Grid.jsx';

ReactDOM.render(
    <div>
        <PennyHeader />
        <Grid />,
        <PennySearch />
        <Form />
        <Table />
        <PennyFooter />
    </div>,
    document.getElementById('root')
);
