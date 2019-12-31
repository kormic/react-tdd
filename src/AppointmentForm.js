import React, { useState } from 'react';

export const AppointmentForm = ({ selectableServices, service, onSubmit }) => {
    const [selectedService, setSelectedService] = useState({ service });

    return <form id="appointment" onSubmit={() => onSubmit(selectedService)}>
                <label htmlFor="service" id="service">Salon service</label>
                <select id="service" name="service" value={service} onChange={(e) => setSelectedService(e.value)}>
                    <option />
                    {selectableServices.map(ss => <option key={ss}>{ss}</option>)}
                </select>
            </form>
};

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