import React from 'react';
import useSudoNavigator, { NavigationType } from '../hooks/useSudoNavigator';

const ErrorPage: React.FunctionComponent = () => {
    const [navigator] = useSudoNavigator();
    return (
        <div>
            <h1>404</h1>
            <p>Page not found</p>
            <button onClick={(e) => {
                e.preventDefault();
                console.log("Clicked! ");
                navigator(NavigationType.RESET, { screenName: 'asd' })
            }}>click me</button>
        </div>
    );
}

export default ErrorPage;