import { useLocation, useNavigate } from "react-router-dom"
import { Directory } from "../redux/ResopnseTypes"
import { useEffect } from "react"

type NavigationState = {
    currentDirectory?: Directory
}

export enum NavigationType {
    PUSH = 'push',
    BACK = 'back',
    REPLACE = 'replace',
    RESET = 'reset',
    SET_STATE = 'set_state',
    CARRY_STATE = 'change_state'
}

type NavigatorOptions = {
    screenName?: string,
    state?: NavigationState
} | undefined

const useSudoNavigator = <T = NavigationState>(): [
    (type: NavigationType, options?: NavigatorOptions) => void,
    location: { key: string, path: string, state?: T, search: string }
] => {
    const navigate = useNavigate();
    const location = useLocation();

    const navigator = (type: NavigationType, options: NavigatorOptions = undefined) => {
        console.log("Navigator Called!")
        if (type === NavigationType.BACK) {
            navigate(-1);
            return;
        }

        if (options) {
            const { screenName, state } = options;

            if (screenName) {
                console.log("Navigator Screename: ", screenName)
                const path = location.pathname + screenName
                console.log("FInal path: ", path);
                switch (type) {
                    case NavigationType.PUSH:
                        navigate(path, { state });
                        break;
                    case NavigationType.REPLACE:
                        navigate(path, { state, replace: true });
                        break;
                    case NavigationType.RESET:
                        navigate(screenName.startsWith('/') ? screenName : `/${screenName}`, { state });
                        break;
                }
            } else if (state) {
                if (type === NavigationType.CARRY_STATE) {
                    navigate(location.pathname, { state });
                } else if (type === NavigationType.SET_STATE) {
                    navigate(location.pathname, { state, replace: true });
                }
            }
        }
    }

    return [navigator, { key: location.key, path: location.pathname, state: location.state as T, search: location.search }]
}

export default useSudoNavigator;