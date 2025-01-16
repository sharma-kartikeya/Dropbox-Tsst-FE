import React, { useEffect } from 'react';
import HomePage from './HomePage';
import LoginPage from './login/LoginPage';
import SignupPage from './signup/SignupPage';
import ErrorPage from './ErrorPage';
import { useSelector } from 'react-redux';
import { UserSliceState, UserStateSelector } from '../redux/slices/UserSlice';
import { RootState } from '../redux/store';
import useSudoNavigator, { NavigationType } from '../hooks/useSudoNavigator';
import DropboxPage from './dropbox/DropboxPage';
import { useGetUserStateQuery } from '../redux/network';
import LoadingComponent from '../common-ui/loader/LoadingComponent';

const pathToPageRecord: Record<string, React.FunctionComponent> = {
    '/': HomePage,
    '/home': HomePage,
    '/login': LoginPage,
    '/signup': SignupPage,
    '/dropbox': DropboxPage
}

const BasePage: React.FunctionComponent = () => {
    const [navigator, { path }] = useSudoNavigator();
    const userState = useSelector<RootState, UserSliceState>(UserStateSelector);
    const { isLoading } = useGetUserStateQuery(null);

    useEffect(() => {
        if ((path === '/login' || path === '/signup')) {
            if (userState) {
                navigator(NavigationType.RESET, { screenName: '/' });
            }
        } else if (userState === null) {
            navigator(NavigationType.RESET, { screenName: '/login' });
        }
    }, [path, userState]);

    const Page = pathToPageRecord[location.pathname];

    return isLoading ? <div style={{
        height: "100vh",
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}><LoadingComponent height={200} width={200} /></div> : Page ? <Page /> : <ErrorPage />;
}

export default BasePage;