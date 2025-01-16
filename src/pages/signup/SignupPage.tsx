import React, { useReducer } from 'react';
import { useSignupMutation } from '../../redux/network';
import ButtonComponent from '../../common-ui/button/ButtonComponent';
import { Link } from 'react-router-dom';
import './SignUpPage.css'

export type SignupFormState = {
    name: string;
    email: string;
    password: string;
    phone: string;
}

const enum FormActions {
    UPDATE_NAME = 'UPDATE_NAME',
    UPDATE_EMAIL = 'UPDATE_EMAIL',
    UPDATE_PASSWORD = 'UPDATE_PASSWORD',
    UPDATE_PHONE = 'UPDATE_PHONE',
}

type FormAction = {
    type: FormActions,
    payload: string
}

const FormReducer = (state: SignupFormState, action: FormAction) => {
    switch (action.type) {
        case FormActions.UPDATE_NAME:
            return { ...state, name: action.payload };
        case FormActions.UPDATE_EMAIL:
            return { ...state, email: action.payload };
        case FormActions.UPDATE_PASSWORD:
            return { ...state, password: action.payload };
        case FormActions.UPDATE_PHONE:
            return { ...state, phone: action.payload };
        default:
            return state;
    }
}

const SignupPage: React.FunctionComponent = () => {
    const [formState, dispatch] = useReducer<SignupFormState, any>(FormReducer, { name: '', email: '', password: '', phone: '' });

    const [dispatcher, { isLoading }] = useSignupMutation();
    const buttonDisabled = formState.email === '' || formState.name === '' || formState.password === '' || formState.phone === ''
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h1>Signup</h1>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" onChange={(e) => {
                    dispatch({ type: FormActions.UPDATE_NAME, payload: e.target.value });
                }} />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" onChange={(e) => {
                    dispatch({ type: FormActions.UPDATE_EMAIL, payload: e.target.value });
                }} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={(e) => {
                    dispatch({ type: FormActions.UPDATE_PASSWORD, payload: e.target.value });
                }} />
                <label htmlFor="Phone">Phone</label>
                <input type="tel" id="phone" onChange={(e) => {
                    dispatch({ type: FormActions.UPDATE_PHONE, payload: e.target.value });
                }} />
                <ButtonComponent classname='signup-button' text='Signup' onClick={() => {
                    if (!buttonDisabled) {
                        dispatcher(formState)
                    }
                }} isLoading={isLoading} isDisabled={isLoading || buttonDisabled} />
            </form>
            <Link style={{
                marginTop: '15px',
                fontFamily: 'Verdana',
                fontSize: 'large',
                color: 'white'
            }} to={'/login'}>{"Already user? Go to Login"}</Link>
        </div>
    );
}

export default SignupPage;