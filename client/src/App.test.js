import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow} from 'enzyme';
import Search from '../Search';
import Client from './Client';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

test('If state is set to all the input box is blank', () => {
  const search = shallow(
    <Search city="all" />
  );

  expect(search.text()).toEqual('');

});

test('If state is set to "Los Angeles", the cityName should be set to Los Angeles', () => {
  const search = shallow(
    <Search city="Los Angeles" />
  );

  expect(Search.cityName.toEqual('Los Angeles');

});

test('If state query of fecth is Los Angeles return a specfic JSON', () => {

  expect(Client.search.toEqual({
  "wwtp": [
    {
      "name": "LAGWRP",
      "address": "4600 Colorado Blvd",
      "city": "Los Angeles",
      "state": "CA",
      "zip": "90039",
      "lon": "-118.273913",
      "lat": "34.13912",
      "supplier": "Glendale  City Of",
      "descript": "LA River",
      "outfall": "Los Angeles River",
      "disposal": "River or creek outfall",
      "treats_ww_gen_area": "Y",
      "sic": "4952",
      "level": "Tertiary",
      "total": 5854,
      "discharge": 4391,
      "recycled_in_area": 565,
      "recycled_out_area": 0
    },
    {
      "name": "Los Angeles-Glendale WRP",
      "address": "4600 Colorado Blvd",
      "city": " Los Angeles",
      "state": "CA",
      "zip": "90039",
      "lon": "-118.273913",
      "lat": "34.13912",
      "supplier": "Los Angeles City Department Of Water And Power",
      "descript": "Los Angeles River",
      "outfall": "Outfall to LA River",
      "disposal": "River or creek outfall",
      "treats_ww_gen_area": "Y",
      "sic": "4952",
      "level": "Tertiary",
      "total": 5214,
      "discharge": 3617,
      "recycled_in_area": 1043,
      "recycled_out_area": 554
    }
  ]
});

});
