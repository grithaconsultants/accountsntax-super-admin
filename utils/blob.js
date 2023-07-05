// import 'regenerator-runtime/runtime';
// const { BlobServiceClient } = require('@azure/storage-blob');

// const selectButton = document.getElementById('select-button');
// const fileInput = document.getElementById('file-input');

// const blobSasUrl = 'GET A SAS URL FROM THE AZURE PORTAL OR AZURE CLI';
// const blobServiceClient = new BlobServiceClient(blobSasUrl);

// const containerName = 'demo';
// const containerClient = blobServiceClient.getContainerClient(containerName);

// const uploadFiles = async () => {

//     try {
//         const promises = [];
//         for (const file of fileInput.files) {
//             const blockBlobClient = containerClient.getBlockBlobClient(file.name);
//             promises.push(blockBlobClient.uploadBrowserData(file));
//         }
//         await Promise.all(promises);
//         alert('Done.');
//     }
//     catch (error) {
//         alert(error.message);
//     }
// }