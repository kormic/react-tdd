import React, { useState } from 'react';

const dailyTimeSlots = (salonOpensAt, salonClosesAt) => {
    const totalSlots = (salonClosesAt - salonOpensAt) * 2;
    const startTime = new Date().setHours(salonOpensAt, 0, 0, 0);
    const increment = 30 * 60 * 1000;
    return Array(totalSlots)
        .fill([startTime])
        .reduce((acc, _, i) => 
            acc.concat([startTime + (i * increment)])
        );
};

const toTimeValue = timestamp => new Date(timestamp).toTimeString().substring(0, 5);

const TimeSlotTable = ({
    salonOpensAt,
    salonClosesAt
}) => {
    const timeSlots = dailyTimeSlots(
        salonOpensAt,
        salonClosesAt
    );

    return (
        <table id="time-slots">
            <tbody>
                {timeSlots.map(timeSlot => {
                   return <tr key={timeSlot} >
                       <th>{toTimeValue(timeSlot)}</th>
                   </tr> 
                })}
            </tbody>
        </table>
    );
};

export const AppointmentForm = ({ selectableServices, service, onSubmit, salonOpensAt, salonClosesAt }) => {
    const [selectedService, setSelectedService] = useState({ service });

    return <form id="appointment" onSubmit={() => onSubmit(selectedService)}>
                <label htmlFor="service" id="service">Salon service</label>
                <select id="service" name="service" value={service} onChange={(e) => setSelectedService(e.value)}>
                    <option />
                    {selectableServices.map(ss => <option key={ss}>{ss}</option>)}
                </select>
                <TimeSlotTable salonOpensAt={salonOpensAt} salonClosesAt={salonClosesAt} />
            </form>
};

AppointmentForm.defaultProps ={
    salonOpensAt: 9,
    salonClosesAt: 19,
    selectableServices: [
        'Cut',
        'Blow-dry',
        'Cut & Color',
        'Beard trim',
        'Cut & Beard trim',
        'Extensions'
    ]
};