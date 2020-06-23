import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('should match the snapshot with no files to upload', () => {
    const wrapper = shallow(<App />);

    expect(wrapper).toMatchSnapshot();
});

it('buttons should be disabled without a file uploaded', () => {
    const wrapper = shallow(<App />);

    let button1 = wrapper.find('button').at(0);
    let button2 = wrapper.find('button').at(1);

    expect(button1.prop('disabled')).toEqual('You need to attach a file to upload');
    expect(button2.prop('disabled')).toEqual('You need to attach a file to upload');
});

it('button should stay disabled if bad data is present in file', () => {
    const wrapper = shallow(<App />);

    wrapper.setState({
        peopleToImport: [{
            data: {
                "first_name": "Zachary",
                "last_name": "Zboncak",
                // missing required fields
            }
        }]
    });

    let button1 = wrapper.find('button').at(0); // select the button to import people

    expect(button1.prop('disabled')).toEqual('You are missing the header email_address in your CSV file. Please adjust your data and try again.');
})
