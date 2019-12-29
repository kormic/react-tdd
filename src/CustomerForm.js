import React, { useState } from 'react';

export const CustomerForm = ({ firstName, lastName, phoneNumber, onSubmit }) => {
    const [customer, setCustomer] = useState({ firstName, lastName, phoneNumber });

    const handleChangeCustomer = (e) => {
        setCustomer(customer => ({
            ...customer,
            [e.target.name]: e.target.value
        }));
    }

    return <form id="customer" onSubmit={() => onSubmit(customer)}>
        <label htmlFor="firstName">First name</label>
        <input id="firstName" name="firstName" type="text" value={firstName} onChange={handleChangeCustomer}/>
        <label htmlFor="lastName">Last name</label>
        <input id="lastName" name="lastName" type="text" value={lastName} onChange={handleChangeCustomer}/>
        <label htmlFor="phoneNumber">Phone number</label>
        <input id="phoneNumber" name="phoneNumber" type="text" value={phoneNumber} onChange={handleChangeCustomer} />
        <input type="submit" value="Add" />
    </form>
};
