import reducer from './auth';
import * as actionType from '../actions/actionTypes';

describe('auth reducer', () => {
    it ('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token:  null,
            userId: null,
            error: null, 
            loading: false,
        });
    });

    it('should store the token upon login', () => {
        expect({
            token: null,
            userId: null,
            error: null, 
            loading: false,
 
        }, {
            type: actionType.AUTH_SUCCESS, 
            idToken: 'some-token',
            userId: 'some-id'
        }).toEqual({
            token: 'some-token',
            userId: 'some-id',
            error: null, 
            loading: false,
        })
    })
});
