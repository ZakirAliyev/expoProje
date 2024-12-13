import React, { useState } from 'react';
import { usePostTestFileUploadMutation } from '../../services/usersApi.jsx';

function TestFileUpload() {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const [postTestFileUpload, { isLoading, isError, isSuccess }] = usePostTestFileUploadMutation();

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };

    const handleUpload = async () => {
        if (!selectedFiles.length) {
            alert('Please select one or more files to upload.');
            return;
        }

        const formData = new FormData();
        Array.from(selectedFiles).forEach((file) => {
            formData.append('files', file); // Adjust the key name as per your backend requirement
        });

        try {
            const response = await postTestFileUpload(formData).unwrap();
            alert('Files uploaded successfully.');
        } catch (error) {
            console.error('Error uploading files:', error);
            alert('An error occurred while uploading the files.');
        }
    };

    return (
        <section style={{ padding: '16px' }}>
            <input type="file" multiple onChange={handleFileChange} />
            <button onClick={handleUpload} style={{ marginLeft: '8px' }} disabled={isLoading}>
                {isLoading ? 'Uploading...' : 'Upload'}
            </button>
            {isError && <p style={{ color: 'red' }}>Error uploading files. Please try again.</p>}
            {isSuccess && <p style={{ color: 'green' }}>Files uploaded successfully!</p>}
        </section>
    );
}

export default TestFileUpload;
