import React, { useState } from 'react';

export const CustomerForm = ({ firstName, onSubmit }) => {
    const [customer, setCustomer] = useState({ firstName });

    const handleChangeFirstName = (e) => {
        setCustomer(customer => ({
            ...customer,
            firstName: e.target.value
        }));
    }

    return <form id="customer" onSubmit={() => onSubmit(customer)}>
        <label htmlFor="firstName">First name</label>
        <input id="firstName" name="firstName" type="text" value={firstName} onChange={handleChangeFirstName}/>
    </form>
};
