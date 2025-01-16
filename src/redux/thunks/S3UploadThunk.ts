import { createAsyncThunk } from "@reduxjs/toolkit";
import { NetworkApi } from "../network";

const S3UploadThunk = createAsyncThunk<any, File>('s3/upload',
    async (file, thunkApi) => {
        try {
            const fileName = file.name;
            const metadata = {
                type: file.type,
                size: file.size.toString()
            }

            const { data, error } = await thunkApi.dispatch(NetworkApi.endpoints.putLink.initiate({ fileName: fileName, metadata: metadata }));

            if (error) {
                return error;
            }
            const url = data?.data;
            if (!url) {
                return "Something went wrong";
            }

            const uplaodResponse = await fetch(url, {
                method: 'PUT',
                body: file,
                headers: {
                    'Content-Type': file.type, // Set the content type
                },
            })

            if (uplaodResponse.ok) {
                console.log("File Upload Success");
            } else {
                console.log("File upload failed!");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    }
)

export default S3UploadThunk