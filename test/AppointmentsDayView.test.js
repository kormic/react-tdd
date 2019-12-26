import React from 'react';
import ReactDOM, { render } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { Appointment, AppointmentsDayView } from '../src/AppointmentsDayView';

describe('Appointment', () => {

    let customer;
    let stylist;
    let service;
    let container;

    beforeEach(() => {
        container = document.createElement('div');
    });

    const render = component => ReactDOM.render(component, container);

    it('renders a table', () => {
        customer = { firstName: 'Ashley' };
        render(<Appointment customer={customer}/>);
        expect(container.querySelector('table')).not.toBeNull();
    });

    it('renders the customer first name', () => {
        customer = { firstName: 'Ashley' };
        render(<Appointment customer={customer} />);
        expect(container.textContent).toMatch('Ashley');
    });

    it('renders another customer first name', () => {
        customer = { firstName: 'Jordan' };
        render(<Appointment customer={customer} />);
        expect(container.textContent).toMatch('Jordan');
    });

    it('renders the customer last name', () => {
        customer = { lastName: 'Wagner' };
        render(<Appointment customer={customer} />);
        expect(container.textContent).toMatch(customer.lastName);
    });

    it('renders the customer phone number', () => {
        customer = { phoneNumber: '1234567890' };
        render(<Appointment customer={customer} />);
        expect(container.textContent).toMatch(customer.phoneNumber);
    });

    it('renders the customer phone number', () => {
        customer = { phoneNumber: '0987654321' };
        render(<Appointment customer={customer} />);
        expect(container.textContent).toMatch(customer.phoneNumber);
    });

    it('renders the stylist name', () => {
        render(<Appointment customer={customer} stylist={'george'} />);
        expect(container.textContent).toMatch('george');
    });

    it('renders another stylist name', () => {
        render(<Appointment customer={customer} stylist={'sam'} />);
        expect(container.textContent).toMatch('sam');
    });

    it('renders the service name', () => {
        render(<Appointment customer={customer} stylist={stylist} service='Trim' />)
        expect(container.textContent).toMatch('Trim');
    });

    it('renders another service namne', () => {
        render(<Appointment customer={customer} stylist={stylist} service={'Cut'} />);
        expect(container.textContent).toMatch('Cut');
    });

    it('renders the appointment\'s notes', () => {
        render(<Appointment customer={customer} stylist={stylist} service={service} notes='abc' />)
        expect(container.textContent).toMatch('abc');
    });
    
    it('renders other appointment notes', () => {
        render(<Appointment customer={customer} stylist={stylist} service={service} notes='cde' />)
        expect(container.textContent).toMatch('cde');
    });

    it('renders a heading with the appointment time', () => {
        const time = new Date();
        time.setHours(9,0,0);
        render(<Appointment customer={customer} startsAt={time} />);
        expect(container.querySelector('h3')).not.toBeNull();
        expect(container.querySelector('h3').textContent).toEqual('Appointment\'s time is at 09:00');
    });
}); 

describe('AppointmentsDayView', () => {
    let container;
    const today = new Date();
    const appointments = [
        { 
            startsAt: today.setHours(12,0),
            customer: { firstName: 'Ashley' }
        },
        { 
            startsAt: today.setHours(13,0),
            customer: { firstName: 'Jordan' }
        }
    ];

    beforeEach(() => {
        container = document.createElement('div');
    });

    const render = component => ReactDOM.render(component, container);

    it('renders a div with the right id', () => {
        render(<AppointmentsDayView appointments={[]} />);
        expect(container.querySelector('div#appointmentsDayView')).not.toBeNull();
    });

    it('renders multiple appointments in an ol element', () => {
        render(<AppointmentsDayView appointments={appointments} />);
        expect(container.querySelector('ol')).not.toBeNull();
        expect(
            container.querySelector('ol').children
        ).toHaveLength(2);
    });

    it('renders each appointment in an li', () => {
        render(<AppointmentsDayView appointments={appointments} />);
        expect(container.querySelectorAll('li')).toHaveLength(2);
        expect(container.querySelectorAll('li')[0].textContent).toEqual('12:00');
        expect(container.querySelectorAll('li')[1].textContent).toEqual('13:00');
    });

    it('initially show a message saying there are no appointments today', () => {
        render(<AppointmentsDayView appointments={[]} />);
        expect(container.textContent).toMatch('There are no appointments scheduled for today.');
    });

    it('selects the first appointment by default', () => {
        render(<AppointmentsDayView appointments={appointments} />);
        expect(container.textContent).toMatch('Ashley');
    });

    it('has a button element in each li', () => {
        render(<AppointmentsDayView appointments={appointments} />);
        expect(container.querySelectorAll('li')).toHaveLength(2);
        expect(container.querySelectorAll('li > button')[0].type).toEqual('button');
    });

    it('renders another appointment when seleceted', () => {
        render(<AppointmentsDayView appointments={appointments} />);
        const button = container.querySelectorAll('button')[1];
        ReactTestUtils.Simulate.click(button);
        expect(container.textContent).toMatch('Jordan');
    });
});