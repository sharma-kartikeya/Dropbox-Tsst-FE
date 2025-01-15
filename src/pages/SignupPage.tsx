import React, { useReducer } from 'react';
import { useSignupMutation } from '../redux/network';

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

    const [dispatcher, { error, isLoading, isSuccess, isError }] = useSignupMutation();

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
                <button type="submit" onClick={(e) => {
                    e.preventDefault();
                    if (formState.email !== '' && formState.password !== '' && formState.name !== '') {
                        dispatcher(formState).then((response) => {
                            console.log(response);
                        });
                    }
                }}>Signup</button>
            </form>
        </div>
    );
}

export default SignupPage;