import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import ErrorPage from './ErrorPage';
import { useSelector } from 'react-redux';
import { UserSliceState, UserStateSelector } from '../redux/slices/UserSlice';
import { RootState } from '../redux/store';
import { AppLoadingSelector } from '../redux/slices/AppSlice';

const pathToPageRecord: Record<string, React.FunctionComponent> = {
    '/': HomePage,
    '/home': HomePage,
    '/login': LoginPage,
    '/signup': SignupPage,
}

const BasePage: React.FunctionComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userState = useSelector<RootState, UserSliceState>(UserStateSelector);
    const loading = useSelector<RootState, boolean>(AppLoadingSelector);

    useEffect(() => {
        if ((location.pathname === '/login' || location.pathname === '/signup') && userState) {
            navigate('/');
        } else if (userState === null) {
            navigate('/login');
        }
    }, [location.pathname, userState]);

    const Page = pathToPageRecord[location.pathname];

    return loading ? <div>Loading...</div> : Page ? <Page /> : <ErrorPage />;
}

export default BasePage;