import React, { useEffect } from "react"
import ButtonComponent, { ButtonComponentProps } from "../button/ButtonComponent"
import './TopBar.css';
import useSudoNavigator, { NavigationType } from "../../hooks/useSudoNavigator";
import { useLogoutMutation } from "../../redux/network";

export type TopBarProps = {
    heading?: string;
}

const TopBar: React.FunctionComponent<TopBarProps> = ({ heading }) => {

    const [logout, { isSuccess: isLogoutSuccess, isLoading }] = useLogoutMutation();
    const [navigator] = useSudoNavigator();

    useEffect(() => {
        if (isLogoutSuccess) {
            navigator(NavigationType.RESET, { screenName: '/login' });
        }
    }, [isLogoutSuccess]);

    return (
        <div className="top-bar-container">
            <h1 className="top-bar-heading">{heading}</h1>
            <ButtonComponent classname="logout-button" text="logout" onClick={() => logout(null)} isLoading={isLoading} isDisabled={isLoading} />
        </div>
    )
}

export default TopBar