import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { UserSliceState, UserStateSelector } from '../redux/slices/UserSlice';
import { RootState } from '../redux/store';
import { useLogoutMutation } from '../redux/network';
import DropboxPage from './DropboxPage';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FunctionComponent = () => {
    const userState = useSelector<RootState, UserSliceState>(UserStateSelector);
    const [dispatch, { isSuccess }] = useLogoutMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            navigate('/login');
        }
    }, [isSuccess]);

    return (
        <div>
            <h1>Home Page</h1>
            <p>Welcome to the home page!</p>
            <p>{userState?.name}</p>
            <p>{userState?.email}</p>
            <p>{userState?.phone}</p>
            <button onClick={(e) => {
                e.preventDefault();
                dispatch(null);
            }}>Logout</button>

            <DropboxPage />
        </div>
    );
}

export default HomePage;