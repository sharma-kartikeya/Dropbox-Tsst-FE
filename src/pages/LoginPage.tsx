import React, { useReducer } from 'react';
import { useLoginUserMutation } from '../redux/network';

export type LoginFormState = {
    email: string;
    password: string;
}

const enum FormActions {
    UPDATE_EMAIL = 'UPDATE_EMAIL',
    UPDATE_PASSWORD = 'UPDATE_PASSWORD',
}

type FormAction = {
    type: FormActions,
    payload: string
}

const FormReducer = (state: LoginFormState, action: FormAction) => {
    switch (action.type) {
        case FormActions.UPDATE_EMAIL:
            return { ...state, email: action.payload };
        case FormActions.UPDATE_PASSWORD:
            return { ...state, password: action.payload };
        default:
            return state;
    }
}

const LoginPage: React.FunctionComponent = () => {
    const [formState, dispatch] = useReducer<LoginFormState, any>(FormReducer, { email: '', password: '' });

    const [dispatcher] = useLoginUserMutation();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h1>Login</h1>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" onChange={(e) => {
                    dispatch({ type: FormActions.UPDATE_EMAIL, payload: e.target.value });
                }} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={(e) => {
                    dispatch({ type: FormActions.UPDATE_PASSWORD, payload: e.target.value });
                }} />
                <button type="submit" onClick={(e) => {
                    e.preventDefault();
                    if (formState.email !== '' && formState.password !== '') {
                        console.log(formState);
                        dispatcher(formState).then((response) => {
                            console.log(response);
                        });
                    }
                }}>Login</button>
            </form>
        </div>
    );
}

export default LoginPage;