//----------------------------------------------------------------------
// admin.js
// Author: Aetizaz Sameer, Andrew Hwang, Tyler Vu
//----------------------------------------------------------------------

import React from 'react';
import PennyHeader from './PennyHeader.jsx';
import PennyFooter from './PennyFooter.jsx';
import AdminTable from './AdminTable.jsx';
import Form from './Form.jsx';

function Admin() {
    return (
        <div>
            <PennyHeader />
            <AdminTable />
            <hr />
            <Form />
            <PennyFooter />
        </div>
    );
}

export default Admin;
