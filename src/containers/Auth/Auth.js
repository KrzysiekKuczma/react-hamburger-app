import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import styles from './Auth.css';

class Auth extends Component {
    state = {
        isSignup: true,
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 7,
                },
                valid: false,
                touched: false,
            },
        }
    }
    
    componentDidMount(){
        if (!this.props.isBurgerBuilded && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangeHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName] : updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });

        this.setState({ controls: updatedControls });
    }
    submitHandler = (event) => {
        event.preventDefault()
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    }
    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    }
    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let form = formElementsArray.map(formElement => {
            return (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={(event) => this.inputChangeHandler(event, formElement.id)}
                    invalid={!formElement.config.valid}
                    touched={formElement.config.touched}
                    shouldValidate={formElement.config.validation}
                /> 
            );
        });
        if (this.props.loading) {
            form = <Spinner />
        } 
        let errorMessage = null;
        if (this.props.error) {
            const message = this.props.error.message.split('_').join(' ')
            errorMessage = <p className={styles.ErrorMessage}>{message}</p>
        }
        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }
        return (
            <div className={styles.Auth}>
                {authRedirect}
                <form onSubmit={this.submitHandler}>
                    {form}
                    {errorMessage}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                    <Button 
                        clicked={this.switchAuthModeHandler} 
                        btnType="Danger">SWITCH TO {this.state.isSignup ? "SIGNIN" : "SIGNUP"}</Button>
            </div>
        );
    }
};
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        isBurgerBuilded: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);