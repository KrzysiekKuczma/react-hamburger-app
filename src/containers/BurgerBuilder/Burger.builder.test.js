
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import { BurgerBuilder } from './BurgerBuilder';
import { BuildControls } from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
    });

    it('should render <BuildControls /> when receving ingredients', () => {
        wrapper.setProps({ings: {salad: 0, bacon: 0, meat: 0, cheese: 0}, price: 28 });
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});