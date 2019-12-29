import React, { useState } from 'react';

export const CustomerForm = ({ firstName, lastName, phoneNumber, onSubmit }) => {
    const [customer, setCustomer] = useState({ firstName, lastName, phoneNumber });

    const handleChangeFirstName = (e) => {
        setCustomer(customer => ({
            ...customer,
            firstName: e.target.value
        }));
    }

    const handleChangeLastName = (e) => {
        setCustomer(customer => ({
            ...customer,
            lastName: e.target.value
        }));
    };

    const handleChangePhoneNumber = (e) => {
        setCustomer(customer => ({
            ...customer,
            phoneNumber: e.target.value
        }));
    };

    return <form id="customer" onSubmit={() => onSubmit(customer)}>
        <label htmlFor="firstName">First name</label>
        <input id="firstName" name="firstName" type="text" value={firstName} onChange={handleChangeFirstName}/>
        <label htmlFor="lastName">Last name</label>
        <input id="lastName" name="lastName" type="text" value={lastName} onChange={handleChangeLastName}/>
        <label htmlFor="phoneNumber">Phone number</label>
        <input id="phoneNumber" name="phoneNumber" type="text" value={phoneNumber} onChange={handleChangePhoneNumber}/>
    </form>
};
