import React from "react"
import './ButtonComponent.css'

export type ButtonComponentProps = {
    classname?: string,
    text?: string,
    onClick?: () => void,
    isLoading?: boolean,
    isDisabled?: boolean
}

const ButtonComponent: React.FunctionComponent<ButtonComponentProps> = ({ classname, text, onClick, isLoading, isDisabled }) => {
    return (
        <button
            className={`button-component ${classname}`}
            onClick={(e) => {
                e.preventDefault();
                onClick && onClick();
            }}
            disabled={isDisabled}
        >
            {isLoading ? "Loading..." : text}
        </button>
    )
}

export default ButtonComponent