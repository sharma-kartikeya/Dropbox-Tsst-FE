import React from 'react';
import { useSelector } from 'react-redux';
import { UserSliceState, UserStateSelector } from '../redux/slices/UserSlice';
import { RootState } from '../redux/store';
import TopBar from '../common-ui/topbar/TopBar';
import DropboxPage from './dropbox/DropboxPage';

const HomePage: React.FunctionComponent = () => {
    const userState = useSelector<RootState, UserSliceState>(UserStateSelector);

    return (
        <>
            <TopBar heading={`Welcome ${userState?.name}!`} />
            <div style={{
                padding: "0px 12px"
            }}>
                <DropboxPage />
            </div>
        </>
    );
}

export default HomePage;