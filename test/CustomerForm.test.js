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

    const itSavesNewNameWhenSubmitted = (fieldName, newName) => 
        it('saves new first name when submitted', async() => {
            expect.hasAssertions();
            render(
                <CustomerForm 
                    {
                        ...{ [fieldName]: 'existing value'}
                    }
                    onSubmit={(props) => 
                        expect(props[fieldName]).toEqual(newName)
                    }  
                />
            );
            await ReactTestUtils.Simulate.change(field(fieldName), {
                target: { value: newName }
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
        itSavesNewNameWhenSubmitted('firstName', 'Jamie');
    })

    describe('last name field', () => {
        itRendersAsATextBox('lastName');
        itIncludesTheExistingValue('lastName');
        itRendersALabel('lastName', 'Last name');
        itAssignsAnIdThatMatchedThelabelIdToTheFieldId('lastName');
        itSavesExistingValueWhenSubmitted('lastName', 'Wilkinson');
        itSavesNewNameWhenSubmitted('lastName', 'Ironman');
    });
    
    describe('last name field', () => {
        itRendersAsATextBox('phoneNumber');
        itIncludesTheExistingValue('phoneNumber');
        itRendersALabel('phoneNumber', 'Phone number');
        itAssignsAnIdThatMatchedThelabelIdToTheFieldId('phoneNumber');
        itSavesExistingValueWhenSubmitted('phoneNumber', '01234');
        itSavesNewNameWhenSubmitted('phoneNumber', '9999');
    });
 
});