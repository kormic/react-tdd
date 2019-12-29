import React from 'react';

export const AppointmentForm = ({ selectableServices, service }) => (
    <form id="appointment">
        <select name="service" value={service} readOnly>
            <option />
            {selectableServices.map(ss => <option key={ss}>{ss}</option>)}
        </select>
    </form>);

AppointmentForm.defaultProps ={
    selectableServices: [
        'Cut',
        'Blow-dry',
        'Cut & Color',
        'Beard trim',
        'Cut & Beard trim',
        'Extensions'
    ]
};