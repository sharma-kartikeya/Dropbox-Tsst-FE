import React, { useEffect } from "react";
import { useCreateFolderMutation, useLazyFolderQuery } from "../redux/network";
import { useDispatch, useSelector } from "react-redux";
import { CurrentDirectorySelector, setCurrentDirectory } from "../redux/slices/DirectorySlice";

const DropboxPage: React.FunctionComponent = () => {
    const currentDirectory = useSelector(CurrentDirectorySelector)
    const [dispatchFolderQuery, { data, error, isLoading }] = useLazyFolderQuery();
    const [dispatch, { isSuccess }] = useCreateFolderMutation();
    const AppDispatcher = useDispatch();

    useEffect(() => {
        console.log(currentDirectory);
        if (currentDirectory) {
            dispatchFolderQuery(currentDirectory.currentFolderId);
        }
    }, [currentDirectory, isSuccess]);


    const [createFolderState, setCreateFolderState] = React.useState<string>();
    return currentDirectory ? (
        <>
            <h1>Dropbox</h1>
            <h2>{currentDirectory?.currentFolderName}</h2>
            <div>
                <label htmlFor="folderName">Folder Name</label>
                <input type="text" id="folderName" value={createFolderState} onChange={(e) => setCreateFolderState(e.target.value)} />
                <button
                    disabled={createFolderState === undefined}
                    onClick={(e) => {
                        e.preventDefault();
                        if (createFolderState && currentDirectory) {
                            dispatch({ parentFolderId: currentDirectory?.currentFolderId, name: createFolderState });
                        }
                    }}>Create Folder</button>
            </div>
            {isLoading ? <p>Loading...</p> : null}
            {/* {error ? <p>Error: {error.status}</p> : null} */}
            {data?.data ? data.data.map((folder) => {
                return (
                    <div key={folder.id}
                        onClick={() => {
                            AppDispatcher(setCurrentDirectory({ currentFolderId: folder.id, currentFolderName: folder.name }));
                        }}>
                        <p>{folder.name}</p>
                    </div>
                )
            }) : null}
        </>
    ) : null;
}

export default DropboxPage;