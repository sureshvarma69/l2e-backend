// Import required modules and initialize AWS
const express = require('express');
const AWS = require('aws-sdk');
const multer = require('multer'); // For handling file uploads
const path = require('path');
const fs = require("fs");
const router = express.Router();

AWS.config.update({
    accessKeyId: 'AKIAS5EITDRD6JTKL5NT',
    secretAccessKey: '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',
});

const s3BucketName = 'learn2earn1221';

const s3 = new AWS.S3();

// Configure multer for file upload

const upload = multer({ dest: 'temp/' });

router.post('/upload/s3', upload.single('file'), (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: 'No file provided' });
    }

    const fileStream = fs.createReadStream(file.path);

    const params = {
        Bucket: s3BucketName,
        Key: `uploads/${file.originalname}`,
        Body: fileStream,
    };

    s3.upload(params, (err, data) => {
        if (err) {
            console.error('Error uploading file to S3:', err);
            return res.status(500).json({ error: 'Error uploading file to S3' });
        }

        fs.unlinkSync(file.path);
        res.status(200).json({ message: 'File uploaded to S3 successfully', url: data?.Location });
    });
});

module.exports = router;
