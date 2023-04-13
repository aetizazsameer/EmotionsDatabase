//----------------------------------------------------------------------
// admin.js
// Author: Aetizaz Sameer, Andrew Hwang, Tyler Vu
//----------------------------------------------------------------------

import React from 'react';
import PennyHeader from './PennyHeader.jsx';
import PennyFooter from './PennyFooter.jsx';
import Table from './Table.jsx';
import Form from './Form.jsx';

function Admin() {
    return (
        <div>
            <PennyHeader />
            <Table />
            <hr />
            <Form />
            <PennyFooter />
        </div>
    );
}

export default Admin;