import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { createContainer } from './domManipulators';
import { AppointmentForm } from '../src/AppointmentForm';

describe('AppointmentForm', () => {
    let render;
    let container;

    const findOption = (dropdownNode, textContent) => {
        const options = Array.from(dropdownNode.childNodes);
        return options.find(
            option => option.textContent === textContent
        );
    };

    const timeSlotTable = () => container.querySelector('table#time-slots');

    beforeEach(() => {
        ({ render, container } = createContainer());
    });

    const form = id => container.querySelector(`form[id="${id}"]`);
    const field = name => form('appointment').elements[name];

    it('renders a form', () => {
        render(<AppointmentForm />);
        expect(form('appointment')).not.toBeNull();
    });

    describe('service field', () => {
        it('renders as a select box', () => {
            render(<AppointmentForm />);
            expect(field('service')).not.toBeNull();
            expect(field('service').tagName).toEqual('SELECT');
        });

        it('initially has a blank value chosen', () => {
            render(<AppointmentForm />);
            const firstNode = field('service').childNodes[0]; 
            expect(firstNode.value).toEqual('');
            expect(firstNode.selected).toBeTruthy();
        });

        it('lists all salon services', () => {
            const selectableServices = ['Cut', 'Blow-dry'];

            render(
                <AppointmentForm
                        selectableServices={selectableServices}
                />
            );

            const optionNodes = Array.from(
                field('service').childNodes
            );
            const renderedServices = optionNodes.map(
                node => node.textConteselected
            );
        });

        it('preselects the existing value', () => {
            const services = ['Cut', 'Blow-dry'];
            render(
                <AppointmentForm
                    selectableServices={services}
                    service="Blow-dry"
                />
            );
            const option = findOption(
                field('service'),
                "Blow-dry"
            );
            expect(option.selected).toBeTruthy();
        });

        it('renders a label', () => {
            render(<AppointmentForm />);
            const label = container.querySelector('label[for="service"]');
            expect(label).not.toBeNull();
            expect(label.textContent).toEqual('Salon service');
        });

        it('assigns an ID that matches the label ID', () => {
            render(<AppointmentForm />);
            const label = container.querySelector('label[for="service"]');
            const select = container.querySelector('select[id="service"]');
            expect(label.id).toEqual(select.id);
        });

        it('saves the existing value when submitted', async () => {
            expect.hasAssertions();
            render(<AppointmentForm 
                        service="Blow-dry" 
                        onSubmit={(props) => 
                            expect(props.service).toEqual('Blow-dry')
                        }
                    />);

            await ReactTestUtils.Simulate.submit(form('appointment'));
        });

        it('saves new value when submitted', async () => {
            expect.hasAssertions();
            render(<AppointmentForm
                        service="Blow-dry"
                        onSubmit={
                        (service) =>
                            expect(service).toEqual('Cut') 
                        }
                />);
            const select = container.querySelector('select[id="service"]');
            await ReactTestUtils.Simulate.change(select, { value: 'Cut', name: 'service' });
            await ReactTestUtils.Simulate.submit(form('appointment'));
        });
    });
    
    describe('time slot table', () => {

        it('renders a table for time slots', () => {
            render(<AppointmentForm />);
            expect(timeSlotTable()).not.toBeNull();
        });

        it('renders a time slot for every half an hour between open and close times', () => {
            render(<AppointmentForm salonOpensAt={9} salonClosesAt={11} />);
            const timesOfDay = timeSlotTable().querySelectorAll(
                'tbody >* th'
            );
            
            expect(timesOfDay).toHaveLength(4);
            expect(timesOfDay[0].textContent).toEqual('09:00');
            expect(timesOfDay[1].textContent).toEqual('09:30');
            expect(timesOfDay[3].textContent).toEqual('10:30');
        });

        it('renders an empty cell at the start of the header row', () => {
            render(<AppointmentForm />);
            const headerRow = timeSlotTable().querySelector(
                'thead > tr'
            );
            expect(headerRow.firstChild.textContent).toEqual('');
        });

        it('renders a week of available dates', () => {
            const today = new Date(2020, 0, 6);
            render(<AppointmentForm today={today} />);
            const dates = timeSlotTable().querySelectorAll(
                'thead >* th:not(:first-child)'
            );
            expect(dates).toHaveLength(7);
            expect(dates[0].textContent).toEqual('Mon 06');
            expect(dates[1].textContent).toEqual('Tue 07');
            expect(dates[6].textContent).toEqual('Sun 12');
        });
    });
});