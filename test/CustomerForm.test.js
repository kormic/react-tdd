import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { createContainer } from './domManipulators';
import { CustomerForm } from '../src/CustomerForm';

describe('CustomerForm', () => {
    let render;
    let container;

    const form = id => container.querySelector(`form[id=${id}]`);
    const field = name => form('customer').elements[name];
    const labelFor = formElement => container.querySelector(`label[for="${formElement}"]`);

    const expectToBeInputFieldOfTypeText = formElement => {
        expect(formElement).not.toBeNull();
        expect(formElement.tagName).toEqual('INPUT');
        expect(formElement.type).toEqual('text');
    };

    const itRendersAsATextBox = (fieldName) => 
            it('renders as a text box', () => {
                render(<CustomerForm />);
            expectToBeInputFieldOfTypeText(field(fieldName));
        });

   const itIncludesTheExistingValue = (fieldName) => 
        it('includes the existing value', () => {
            render(<CustomerForm { ...{ [fieldName]: 'value' } } />);
            expect(field(fieldName).value).toEqual('value');
        });
 
    const itRendersALabel = (fieldName, labelName) => 
        it('renders a label', () => {
            render(<CustomerForm />);
            expect(labelFor(fieldName)).not.toBeNull();
            expect(labelFor(fieldName).textContent).toEqual(labelName);
        });

    const itAssignsAnIdThatMatchedThelabelIdToTheFieldId = (fieldName) => 
        it('assigns an id that matches the label id to the first name field', () => {
            render(<CustomerForm />);
            expect(field(fieldName).id).toEqual(fieldName);
        });

    const itSavesExistingValueWhenSubmitted = (fieldName, value) => 
        it('saves existing first name when submitted', async () => {
            expect.hasAssertions();
            render(<CustomerForm 
                {
                    ...{ [fieldName]: value }
                }
                onSubmit={(props) => {
                    expect(props[fieldName]).toEqual(value);
                }} />);
            await ReactTestUtils.Simulate.submit(form('customer'));
        });

    const itSavesNewValueWhenSubmitted = (fieldName, value) => 
        it('saves new value when submitted', async() => {
            expect.hasAssertions();
            render(
                <CustomerForm 
                    {
                        ...{ [fieldName]: 'existing value'}
                    }
                    onSubmit={(props) => 
                        expect(props[fieldName]).toEqual(value)
                    }  
                />
            );
            await ReactTestUtils.Simulate.change(field(fieldName), {
                target: { value: value, name: fieldName }
            });
            await ReactTestUtils.Simulate.submit(form('customer'));
        });

    beforeEach(() => {
        ({ render, container } = createContainer());
    });

    it('renders a form', () => {
        render(<CustomerForm />);
        expect(form('customer')).not.toBeNull();
    });

    describe('first name field', () => {
        itRendersAsATextBox('firstName');
        itIncludesTheExistingValue('firstName');
        itRendersALabel('firstName', 'First name');
        itAssignsAnIdThatMatchedThelabelIdToTheFieldId('firstName');
        itSavesExistingValueWhenSubmitted('firstName', 'Ashley');
        itSavesNewValueWhenSubmitted('firstName', 'Jamie');
    })

    describe('last name field', () => {
        itRendersAsATextBox('lastName');
        itIncludesTheExistingValue('lastName');
        itRendersALabel('lastName', 'Last name');
        itAssignsAnIdThatMatchedThelabelIdToTheFieldId('lastName');
        itSavesExistingValueWhenSubmitted('lastName', 'Wilkinson');
        itSavesNewValueWhenSubmitted('lastName', 'Ironman');
    });
    
    describe('last name field', () => {
        itRendersAsATextBox('phoneNumber');
        itIncludesTheExistingValue('phoneNumber');
        itRendersALabel('phoneNumber', 'Phone number');
        itAssignsAnIdThatMatchedThelabelIdToTheFieldId('phoneNumber');
        itSavesExistingValueWhenSubmitted('phoneNumber', '01234');
        itSavesNewValueWhenSubmitted('phoneNumber', '9999');
    });
 
    it('has a submit button', () => {
        render(<CustomerForm />);
        const submitButton = container.querySelector(
            'input[type="submit"]'
        );
        expect(submitButton).not.toBeNull();
    });
});