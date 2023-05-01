//----------------------------------------------------------------------
// Admin.jsx
// Author: Aetizaz Sameer, Andrew Hwang, Tyler Vu
//----------------------------------------------------------------------

import React from 'react';
import NavbarAdmin from './NavbarAdmin';
import AdminTable from './AdminTable.jsx';
import Form from './Form.jsx';

function Admin() {
    return (
        <div>
            <NavbarAdmin />
            <AdminTable />
            <Form />
        </div>
    );
}

export default Admin;
