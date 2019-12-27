import React from 'react';

export const CustomerForm = ({ firstName }) => (
    <form id="customer">
        <label htmlFor="firstName">First name</label>
        <input readOnly id="firstName" name="firstName" type="text" value={firstName} />
    </form>
);
