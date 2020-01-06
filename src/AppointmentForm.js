import React, { useState } from 'react';

const timeIncrements = (numTimes, startTime, increment) =>
                    Array(numTimes)
                    .fill([startTime])
                    .reduce((acc, _, i) => 
                        acc.concat([startTime + (i * increment)])
                    );
const dailyTimeSlots = (salonOpensAt, salonClosesAt) => {
    const totalSlots = (salonClosesAt - salonOpensAt) * 2;
    const startTime = new Date().setHours(salonOpensAt, 0, 0, 0);
    const increment = 30 * 60 * 1000;
    return timeIncrements(totalSlots, startTime, increment);
};
const weeklyDateValues = startDate => {
    const midnight = new Date(startDate).setHours(0, 0, 0, 0);
    const increment = 24 * 60 * 60 * 1000;
    return timeIncrements(7, midnight, increment);
};
const toTimeValue = timestamp => new Date(timestamp).toTimeString().substring(0, 5);
const toShortDate = timestamp => {
    const [day, , dayOfMonth] = new Date(timestamp).toDateString().split(' ');
    return `${day} ${dayOfMonth}`;
};

const TimeSlotTable = ({
    salonOpensAt,
    salonClosesAt,
    today
}) => {
    const timeSlots = dailyTimeSlots(
        salonOpensAt,
        salonClosesAt
    );
    const dates = weeklyDateValues(today);

    return (
        <table id="time-slots">
            <thead>
                <tr>
                    <th />
                    {dates.map(date => (<th key={date}>{toShortDate(date)}</th>))}
                </tr>
            </thead>
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

export const AppointmentForm = ({ selectableServices, service, onSubmit, salonOpensAt, salonClosesAt, today }) => {
    const [selectedService, setSelectedService] = useState({ service });

    return <form id="appointment" onSubmit={() => onSubmit(selectedService)}>
                <label htmlFor="service" id="service">Salon service</label>
                <select id="service" name="service" value={service} onChange={(e) => setSelectedService(e.value)}>
                    <option />
                    {selectableServices.map(ss => <option key={ss}>{ss}</option>)}
                </select>
                <TimeSlotTable salonOpensAt={salonOpensAt} salonClosesAt={salonClosesAt} today={today}/>
            </form>
};

AppointmentForm.defaultProps ={
    today: new Date(),
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