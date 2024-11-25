document.getElementById('connectButton').addEventListener('click', function() {
    console.log('Connect button clicked!');

    const url = 'http://127.0.0.1:8080/connect';
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.text();  
        })
        .then(data => {
            console.log('Data fetched:', data);
            const resultsTable = document.getElementById('resultsTable');
            resultsTable.innerHTML = '';  
            const resultItem = document.createElement('p');
            resultItem.textContent = data;
            resultsTable.appendChild(resultItem);
        })
        .catch(error => {
            console.error('Fetch error:', error);
            document.getElementById('resultsTable').innerHTML = 'Failed to load results.';
        });
});

document.getElementById('uploadButton').addEventListener('click', function() {
    console.log('Upload QR Code button clicked!');

    const fileInput = document.getElementById('qrCodeInput');
    const file = fileInput.files[0];
    const meter = document.getElementById('progressMeter');

    if (!file) {
        alert('Please select a file.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const url = 'http://127.0.0.1:8080/upload-barcode';
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', function(event) {
        if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            meter.value = percentComplete;
        }
    });

    xhr.open('POST', url, true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log('File uploaded successfully:', xhr.responseText);
            const resultsTable = document.getElementById('resultsTable');
            resultsTable.innerHTML = '';  
            const resultItem = document.createElement('p');
            resultItem.textContent = xhr.responseText;
            resultsTable.appendChild(resultItem);
            meter.value = 100;
            console.error('Error uploading file:', xhr.statusText);
            document.getElementById('resultsTable').innerHTML = 'Failed to upload and process QR code.';
        }
    };

    xhr.onerror = function() {
        console.error('Request error:', xhr.statusText);
        document.getElementById('resultsTable').innerHTML = 'An error occurred during the upload.';
    };

    xhr.send(formData);
});