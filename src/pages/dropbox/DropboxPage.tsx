import React, { useEffect, useState } from "react";
import { useCreateFolderMutation, useLazyFolderQuery, useUploadFileMutation } from "../../redux/network";
import { useSelector } from "react-redux";
import useSudoNavigator, { NavigationType } from "../../hooks/useSudoNavigator";
import { RootDirectoryIdSelector } from "../../redux/slices/UserSlice";
import FileViewer from "../../common-ui/FileViewer";
import ButtonComponent from "../../common-ui/button/ButtonComponent";
import FolderComponent from "../../common-ui/folder/FolderComponent";
import './DropboxPage.css'

const DropboxPage: React.FunctionComponent = () => {
    const rootDirectoryId = useSelector(RootDirectoryIdSelector);
    const [navigator, { state }] = useSudoNavigator();

    useEffect(() => {
        if (rootDirectoryId) {
            navigator(NavigationType.SET_STATE, { state: { currentDirectory: { id: rootDirectoryId, name: '', isFile: false } } })
        }
    }, [rootDirectoryId]);

    const currentDirectory = state?.currentDirectory;

    const [dispatchFolderQuery, { data, isLoading }] = useLazyFolderQuery();

    const [createFolder, { isSuccess, isLoading: waitingForFolderCreation }] = useCreateFolderMutation();
    const [uploadFile, { isSuccess: isFileUploadSucess }] = useUploadFileMutation();

    useEffect(() => {
        if (currentDirectory) {
            dispatchFolderQuery(currentDirectory.id);
        }
        if (isSuccess) {
            setCreateFolderState(false)
        }
    }, [currentDirectory, isSuccess, isFileUploadSucess]);

    const fileUploadInputRef = React.createRef<HTMLInputElement>();

    const [createFolderState, setCreateFolderState] = useState<boolean>(false);
    const [fileId, setFileId] = useState<string>();

    return currentDirectory ? (
        <div className="dropbox-container">
            <h1>{currentDirectory.name && currentDirectory.name !== '' ? currentDirectory.name : 'Dropbox'}</h1>
            <div className="button-container">
                <ButtonComponent classname="dropbox-button create-folder" text="Create Folder" onClick={() => {
                    setCreateFolderState(true);
                }} />
                <ButtonComponent classname="dropbox-button upload-file" text="Upload File" onClick={() => {
                    fileUploadInputRef.current?.click();
                }} />
                <input ref={fileUploadInputRef} type="file" style={{ display: 'none' }} onChange={(e) => {
                    const file = e.target.files && e.target.files.item(0);
                    if (file) {
                        if (file.size > 10 * 1024 * 1024) {
                            console.log("Max FIle size: 10MB!")
                        }
                        // dispatch(S3UploadThunk(file));
                        const formData = new FormData()
                        formData.set('file', file);
                        formData.set('folderId', currentDirectory.id);
                        uploadFile(formData)
                    }
                }} />
            </div>
            {isLoading ? <p>Loading...</p> : null}
            {/* {error ? <p>Error: {error.status}</p> : null} */}
            {data?.data && (
                <div style={{
                    display: "flex",
                    flexDirection: 'row',
                    gap: "24px",
                    flexWrap: 'wrap'
                }}>
                    {data.data.map((folder) => {
                        return (
                            <FolderComponent id={folder.id} name={folder.name} isFile={folder.isFile} onClick={() => {
                                if (folder.isFile) {
                                    setFileId(folder.id);
                                }
                                if (!folder.isFile) {
                                    navigator(
                                        NavigationType.CARRY_STATE,
                                        {
                                            state: {
                                                currentDirectory: {
                                                    id: folder.id,
                                                    name: folder.name,
                                                    isFile: false
                                                }
                                            }
                                        })
                                }
                            }} />
                        )
                    })}
                    {createFolderState && (
                        <FolderComponent name="New Folder" onNameInputComplete={(value?: string) => {
                            if (value && currentDirectory) {
                                createFolder({ parentFolderId: currentDirectory.id, name: value });
                            }
                        }} loading={waitingForFolderCreation} />
                    )}
                </div>
            )}
            {fileId && <FileViewer fileId={fileId} />}
        </div>
    ) : <div>Loading.....</div>;
}

export default DropboxPage;