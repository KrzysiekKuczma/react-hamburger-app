import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({
    adapter: new Adapter()
});

describe('<NavigationItems />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />)
    });

    it('should render two NavigationItem elements while unauthicated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three NavigationItem elements while authicated', () => {
        wrapper.setProps({isAuth: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    it('Should an exact logout button', () => {
        wrapper.setProps({isAuth: true});
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
}); 