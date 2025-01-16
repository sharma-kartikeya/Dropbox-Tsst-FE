import React, { useEffect, useState } from "react";
import './FolderComponent.css';
import LoadingComponent from "../loader/LoadingComponent";

export type FolderComponentProps = {
    id?: string,
    name?: string,
    isFile?: boolean,
    onClick?: () => void;
    onNameInputComplete?: (value?: string) => void;
    loading?: boolean;
}

const FolderComponent: React.FunctionComponent<FolderComponentProps> = ({ id, name, isFile, onClick, onNameInputComplete, loading }) => {
    const inputRef = React.createRef<HTMLInputElement>();
    const [textState, setTextState] = useState<string | undefined>(onNameInputComplete ? undefined : name);

    const onBlurEventHandler = () => {
        if (onNameInputComplete) {
            onNameInputComplete(inputRef.current?.value);
        }
        setTextState(inputRef.current?.value)
    }

    useEffect(() => {
        if (inputRef.current && onNameInputComplete) {
            inputRef.current.focus();
            inputRef.current.addEventListener('blur', onBlurEventHandler)
        }

        return () => {
            inputRef.current?.removeEventListener('blur', onBlurEventHandler)
        }
    }, []);

    const imgSource = isFile ? "https://img.icons8.com/?size=100&id=0eqL8X2cFEqY&format=png&color=000000" : "https://img.icons8.com/?size=100&id=CKtPhNMyI8bF&format=png&color=000000"
    return (
        <div key={id}
            className="folder-container"
            onClick={onClick}>
            {loading && <div className="lottie-wrapper">
                <LoadingComponent width={100} height={100} />
            </div>}
            <img src={imgSource} width={100} />
            {onNameInputComplete && !textState && <input ref={inputRef} className="new-folder-input" defaultValue={name} type="text" />}
            {textState && <p className="text-container">{textState}</p>}
        </div>
    )
}

export default FolderComponent