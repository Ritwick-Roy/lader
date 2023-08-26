const upload = require('../helpers/s3.helper');
const util = require('util');
const s3 = require('../utils/s3.util');
const {  GetObjectCommand, DeleteObjectCommand, DeleteObjectsCommand } = require('@aws-sdk/client-s3');

// construct a link yourself
exports.getObject = async (req, res) => {
    try {
        const command = new GetObjectCommand({ 
            Bucket: process.env.AWS_BUCKET, 
            Key: req.body.key
        });
        const response = await s3.send(command);
        console.log(response);
        const str = await response.Body.transformToString();
        console.log(str);
        res.json(str);
    } catch (error) { 
        res.status(500).json({ message: error.message });
    } 
}

exports.uploadSingle = async (req, res) => {
    const uploadFile = util.promisify(upload.single('file'));
    try {
        await uploadFile(req, res); 
        res.json(req.file);
    } catch (error) { 
        res.status(500).json({ message: error.message });
    } 
}

exports.uploadMultiple = async (req, res) => {
    const uploadFile = util.promisify(upload.array('files',5));
    try {
        await uploadFile(req, res); 
        res.json(req.file);
    } catch (error) { 
        res.status(500).json({ message: error.message });
    } 
}

exports.deleteSingle = async (req, res) => {
    try {
        const command = new DeleteObjectCommand({ 
            Bucket: process.env.AWS_BUCKET, 
            Key: req.body.key
        });
        const response = await s3.send(command);
        res.json(response);
    } catch (error) { 
        res.status(500).json({ message: error.message });
    } 
}

exports.deleteMultiple = async (req, res) => {
    try {
        const command = new DeleteObjectsCommand({
        Bucket: process.env.AWS_BUCKET,
        Delete: {
            Objects: req.body.keys 
            // [
            //     {
            //         Key: '1676812951611_531259981.png',
            //     },
            //     {
            //         Key: '1676812908615_830011740.png',
            //     },
            // ]
        }
    });
    const response = await s3.send(command);
        res.json(response);
    } catch (error) { 
        res.status(500).json({ message: error.message });
    } 
}