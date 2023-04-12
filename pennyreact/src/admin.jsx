//----------------------------------------------------------------------
// admin.js
// Author: Aetizaz Sameer, Andrew Hwang, Tyler Vu
//----------------------------------------------------------------------

import React from 'react';
import PennyHeader from './PennyHeader.jsx';
import PennySearch from './PennySearch.jsx';
import PennyFooter from './PennyFooter.jsx';
import Table from './Table.jsx';
import Form from './Form.jsx';
import Grid from './Grid.jsx';

function Admin() {
    return (
        <div>
            <PennyHeader />
            <Grid />,
            <PennySearch />
            <Form />
            <Table />
            <PennyFooter />
        </div>
    );
}

export default Admin;