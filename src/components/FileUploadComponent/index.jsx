import React, {useState} from 'react';
import {usePostTestFileUploadMutation} from '../../services/usersApi.jsx';

function FileUploadComponent() {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const [postTestFileUpload, {isLoading, isError, isSuccess}] = usePostTestFileUploadMutation();

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };

    const handleUpload = async () => {
        if (!selectedFiles.length) {
            alert('Zəhmət olmasa yükləmək üçün fayl seçin.');
            return;
        }

        const formData = new FormData();
        Array.from(selectedFiles).forEach((file) => {
            formData.append('files', file); // Backend üçün düzgün açarı istifadə edin.
        });

        try {
            const response = await postTestFileUpload(formData).unwrap();
            alert('Fayllar uğurla yükləndi.');
        } catch (error) {
            console.error('Faylların yüklənməsi zamanı xəta baş verdi:', error);
            alert('Yükləmə zamanı xəta baş verdi.');
        }
    };

    return (
        <div>
            <input type="file" multiple onChange={handleFileChange}/>
            <button onClick={handleUpload} disabled={isLoading}>
                {isLoading ? 'Yüklənir...' : 'Yüklə'}
            </button>
            {isError &&
                <p style={{color: 'red'}}>Fayllar yüklənərkən xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.</p>}
            {isSuccess && <p style={{color: 'green'}}>Fayllar uğurla yükləndi!</p>}
        </div>
    );
}

export default FileUploadComponent;
